import React from 'react';
// import axios from 'axios';

import { Button} from 'reactstrap';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import MTable, {MTableToolbar} from 'material-table';
import NativeSelect from '@material-ui/core/NativeSelect';

import Paper from '@material-ui/core/Paper';
import './InputPasienMonik.css';
import { OutlinedInput } from '@material-ui/core';

export default class InputPasienMonik extends React.Component{
    today = Math.round((new Date()).getTime() / 1000);


    constructor(props){
        super(props);
        this.state={
            id:'',
            today : Math.round((new Date()).getTime() / 100),
            kode_pasien_monik:'U.00'+this.today,
            nik:'',
            nama:'',
            tgl:'',
            pekerjaan:'',
            pendidikan:'',
            jk:'',
            golongan_darah:'',
            loading:true,
            isUpdate:false,
           


            columns: [
                {title:'No KTP/KK', field:'no_ktpkk'},
                {title:'Nama', field:'name'},
                {title:'Jenis Kelamin', field:'gender'},
                {title:'Tanggal Lahir', field:'tgl_lahir'},
                {title:'Gol.Darah', field:'golongan_darah'},
                {title:'Pendidikan', field:'pendidikan'},
                {title:'Pekerjaan', field:'pekerjaan'}
              ],
              data:[],
           
           
            tinggi:'',
            berat:'',
            asamurat:'',
            guladarah:'',
            koles:'',
            tekanandarah:''

        }
    }
    resetstate(){
        this.setState({
            kode_pasien_monik:'U.00'+this.today,
            id:'',
            nik:'',
            nama:'',
            tgl:'',
            pekerjaan:'',
            pendidikan:'',
            jk:'',
            golongan_darah:''
        })
        }

    
    fetchdata = () =>{
        const url ='https://zav-wawi.herokuapp.com/api/pasien_monik/all';
        axios.get(url)
        .then(response => {
          this.setState({
            data: response.data.data,
            loading: false
          });
          console.log(response.data.data);
          
        })
        .catch(error => {
         alert(error);
        });
      }

    componentDidMount(){
        this.fetchdata();
        this._interval = window.setInterval(this.fetchdata(), 10000);
     
     
     }
     componentWillUnmount() {
       this._interval && window.clearInterval(this._interval);
     }
    
    handleSubmit(e){
        e.preventDefault();



        this.resetstate();  
    }

    handleChangeAdd = event =>{
        this.setState({[event.target.name]: event.target.value})
    }
    rowClik = (e,rowData) => {
        e.preventDefault();
        this.setState({
            id:rowData.id_mst_pasien_monik,
            nik:rowData.no_ktpkk,
            nama: rowData.name,
            tgl:rowData.tgl_lahir,
            pekerjaan:rowData.pekerjaan,
            pendidikan:rowData.pendidikan,
            jk:rowData.gender,
            golongan_darah:rowData.golongan_darah,
            isUpdate:true
        });
    }
    
    
    
    render(){
        let content;
        let isupdate;

        if(this.state.isUpdate){
            isupdate = <div>
                <Button type="button" color="grey" >Trans Monik</Button>
                <Button type="button" color="red" >Delete</Button>
                <Button type="button" color="green" >Update</Button>
            </div>
        }else{
            isupdate = <div>
                 <Button type="submit" color="green" >Submit</Button>
            </div>
        }



        if(this.state.loading){
            content= <div>Loading ..</div>
        }else{
        content =    
                <MTable 
                title="Table Pasien"
                columns={this.state.columns}
                data={this.state.data}
                onRowClick={this.rowClik}
                />
        }
        
       
        return(
            <div>
            <Paper className="paper">
                <div className="formpad">
                    <h3 className="MuiTypography-root MuiTypography-h6"><b>Pasien Monik</b></h3><br/>
                    <form method="post" onSubmit ={(e) => this.handleSubmit(e)}  >
                       
                        <div className="col-md-4">
                        <TextField
                        name="nik"
                        id="outlined-name"
                        label="NIK"
                        fullWidth
                        value={this.state.nik}
                        margin="normal"
                        variant="outlined"
                        onChange={this.handleChangeAdd}
                        /> 
                        </div> 
                        <div className="row" id="input2">
                            <div className="col-md-6">
                            <TextField
                            name="nama"
                            id="outlined-name"
                            label="Nama Pasien"
                            fullWidth
                            value={this.state.nama}
                            margin="normal"
                            variant="outlined"
                            onChange={this.handleChangeAdd}
                            />
                            </div>
                            <div className="col-md-4">
                            <TextField
                            name="pekerjaan"
                            id="outlined-name"
                            label="Pekerjaan"
                            fullWidth
                            margin="normal"
                            variant="outlined"
                            value={this.state.pekerjaan}
                            onChange={this.handleChangeAdd}
                            />
                            </div>
                           
                      </div>
                      <div className="row" id="input2">
                      <div className="col-md-3">
                            
                            <NativeSelect id="select"
                                value={this.state.jk}
                                onChange={this.handleChangeAdd}
                                input={<OutlinedInput name="jk" value={this.state.jk} fullWidth id="outlined-age-simple"  />}
                            >
                                <option>- Pilih Jenis Kelamin -</option>
                                <option value='L'>Laki-laki</option>
                                <option value='P'>Perempuan</option>

                            </NativeSelect>
                            </div>
                        <div className="col-md-2">
                            
                            <NativeSelect id="select"
                                value={this.state.golongan_darah}
                                onChange={this.handleChangeAdd}
                                input={<OutlinedInput name="golongan_darah" value={this.state.golongan_darah} fullWidth id="outlined-age-simple"  />}
                            >
                                <option>- Gol.Darah -</option>
                                <option value='O'>O</option>
                                <option value='A'>A</option>
                                <option value='B'>B</option>
                                <option value='AB'>AB</option>

                            </NativeSelect>
                        </div>
                      <div className="col-md-3">
                        <TextField
                            id="date"
                            name="tgl"
                            label="Tanggal Lahir"
                            type="date"
                            fullWidth
                            value={this.state.tgl}
                            variant="outlined"
                            value={this.state.tgl}
                            defaultValue="2019-05-24"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange={this.handleChangeAdd}
                            />
                            </div>
                            <div className="col-md-3">
                            <NativeSelect id="select"
                                value={this.state.pendidikan}
                                onChange={this.handleChangeAdd}
                                input={<OutlinedInput name="pendidikan" value={this.state.pendidikan} fullWidth id="outlined-age-simple"  />}
                            >
                                <option>- Pendidikan -</option>
                                <option value='SD'>SD</option>
                                <option value='SMP'>SMP</option>
                                <option value='SMA'>SMA</option>
                                <option value='STRATA 1'>STRATA 1</option>
                                <option value='STRATA 2'>STRATA 2</option>
                            </NativeSelect>
                            </div>
                        </div>
                        <br/>
                        <div className="col-md-12">
                            <div className="tombol">
                                {isupdate}
                            </div>
                            <br/>
                            <br/>
                        </div>
                    </form>
                </div>
            </Paper>

            <br/>
            {content}
            </div>
        )
    }
}

