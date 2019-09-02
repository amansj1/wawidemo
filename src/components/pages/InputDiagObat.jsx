import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import MTable from 'material-table';
import NativeSelect from '@material-ui/core/NativeSelect';
import Paper from '@material-ui/core/Paper';
import { OutlinedInput } from '@material-ui/core';
import Swal from 'sweetalert2';

import './InputDiagObat.css';

export default class InputDiagObat extends React.Component{
    constructor(props){
        super(props);
        this.state={
            datapasien:[],

            columnpasien:[ 
            {title:'No KTP/KK', field:'no_ktpkk'},
            {title:'Nama', field:'name'},
            {title:'Jenis Kelamin', field:'gender'},
            {title:'Tanggal Lahir', field:'tgl_lahir'},
            {title:'Gol.Darah', field:'golongan_darah'},
            {title:'Pendidikan', field:'pendidikan'},
            {title:'Pekerjaan', field:'pekerjaan'}],

            datatrans:[],
            columntrans:[
                {title:'Tanggal Periksa', field:'created_at'},
                {title:'Id Trans Monik', field:'id_mst_trans_monik'},
                {title:'Berat Badan', field:'bb'},
                {title:'Tinggi Badan', field:'tb'},
                {title:'Tekanan Darah', field:'td'},
            ],
 

            id_trans:'',


            id_pasien:'',
            nik:'',
            nama:'',
            tgl:'',
            jk:'',
            pekerjaan:'',

            obat:[],
            diagnosa:[],

            colobat:[
            {title:'Nama Obat', field:'nama_obat'},
            ],
            coldiagnosa:[
            {title:'Diagnosa', field:'diagnosa'},
            ],

            modalup:false,
            isOpenTrans:false,
            isOpenPasien:false,
            loadingpasien:true,
            blank:true,
            loading:true,

            obat1:'',
            obat2:'',
            obat3:'',
            diagnosa1:'',
            diagnosa2:'',
            diagnosa3:''
        }
        this.toggleU = this.toggleU.bind(this);
    }    
    handleChangeAdd = event =>{
        this.setState({
          [event.target.name]: event.target.value
      })
      };
    resetstate =() =>{
        this.setState({
            obat1:'',
            obat2:'',
            obat3:'',
            diagnosa1:'',
            diagnosa2:'',
            diagnosa3:''
        })
    }
    fetchdatapasien = () =>{
        const url ='https://adept-voltage-240714.appspot.com/api/pasien_monik/all';
        axios.get(url)
        .then(response => {
          this.setState({
            datapasien: response.data.data,
            loading: false
          });
          Swal.fire(
            'Connected!',
            'Loading Selesai',
            'success'
          )
        //   console.log(response.data.data);
        // alert(response.data.note);
        })
        .catch(error => {
        //  alert(error);
        });
        
      }

      fetchdatatrans = ()=>{
        Swal.showLoading();
        const id = this.state.id_pasien;
        const url ='https://adept-voltage-240714.appspot.com/api/trans_monik/bypasienmonikid=';
       
        axios.get(url+id)
        .then(response => {
          this.setState({
            datatrans: response.data.data,
            blank:false,
            loding:false
          });
          Swal.fire(
            'Connected!',
            'Loading Selesai',
            'success'
          )

        //   console.log(response.data.data);
          
        })
        .catch(error => {
        //  alert(error.message);
        });

        
      }

      componentDidMount(){
        this.fetchdatapasien();
       
   
     
     }
     
     rowClikPasien = (e,rowData) => {
        e.preventDefault();
        this.setState({
            id_pasien:rowData.id_mst_pasien_monik,
            nik:rowData.no_ktpkk,
            nama: rowData.name,
            tgl:rowData.tgl_lahir,
            pekerjaan:rowData.pekerjaan,
            pendidikan:rowData.pendidikan,
            jk:rowData.gender,
            golongan_darah:rowData.golongan_darah,
            isOpenPasien:true,
            blank:true
        });

    }
    rowClikTrans =(e,rowData)=>{
        e.preventDefault();
       
        this.setState({
            id_trans:rowData.id_mst_trans_monik,
            obat:rowData.obat_pm,
            diagnosa:rowData.diagnosa_pm
        })
    this.toggleU();
   
    }
    handleSubmitDiagObat(e){
        e.preventDefault();
        Swal.showLoading();
        const apiurl = 'https://adept-voltage-240714.appspot.com/api/diagnosa_pms/create'
        const addpasien ={
            id_trans_monik: this.state.id_trans,
            diagnosa:[
                {diagnosa: this.state.diagnosa1},
              
                ]
        };
        axios.post(apiurl, addpasien)
        .then(res => {
            this.fetchdatatrans();
            // alert(res.data.note);
        //   console.log(res.data);
        }).catch(error => {
            // alert(error.message);
           });
        const apiurl1 = 'https://adept-voltage-240714.appspot.com/api/obat_pms/create'
        const addobat ={
            id_trans_monik: this.state.id_trans,
            obat:[
                {nama_obat: this.state.obat1},
             
                ]
        };
        axios.post(apiurl1, addobat)
        .then(res => {
        this.fetchdatatrans();
        //   console.log(res.data);
      
        this.resetstate();
        });

        
       
     

    }
    toggleU() {
        this.setState(prevState => ({
          modalup: !prevState.modalup    
        }));
      }
    
    
    
    
    
    render(){
     
        let content;
        let tabeltrans;
        let loding;
        if(this.state.loading){
            loding=Swal.showLoading();
        }else{
            loding= <MTable 
            title="Tabel Pasien"
            columns={this.state.columnpasien}
            data={this.state.datapasien}
            onRowClick={this.rowClikPasien}
            />
        }

        if(this.state.blank){
            tabeltrans=<br/>
        }else{
            tabeltrans =   <MTable 
            title={"Riwayat Periksa "+this.state.nama}
            columns={this.state.columntrans}
            data={this.state.datatrans}
            onRowClick={this.rowClikTrans}
            />
        }
        if(this.state.isOpenPasien){

            content =
            <div>
            <Paper className="paper">
                <div className="formpad">
                <h5><strong>Informasi Pasien</strong></h5>
                <div className="col-md-4">
                        <TextField
                        name="nik"
                        id="outlined-name"
                        label="NIK"
                        fullWidth
                        value={this.state.nik}
                        margin="normal"
                        variant="outlined"
                        disabled
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
                            disabled
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
                            disabled
                            />
                            </div>
                           
                      </div>
                      <div className="row" id="input2">
                      <div className="col-md-3">
                            
                            <NativeSelect id="select"
                                value={this.state.jk}
                                disabled
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
                                disabled
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
                            variant="outlined"
                            value={this.state.tgl}
                            defaultValue="2019-05-24"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            disabled
                            />
                            </div>
                            <div className="col-md-3">
                            <NativeSelect id="select"
                                value={this.state.pendidikan}
                                disabled
                                input={<OutlinedInput name="pendidikan" value={this.state.pendidikan} fullWidth id="outlined-age-simple"  />}
                            >
                                 <option>- Pendidikan -</option>
                                <option value='Tidak Ada'>Tidak Ada</option>
                                <option value='SD'>SD</option>
                                <option value='SMP'>SMP</option>
                                <option value='SMA'>SMA</option>
                                <option value='DIPLOMA'>DIPLOMA</option>
                                <option value='SARJANA'>SARJANA</option>
                                <option value='MASTER'>MASTER</option>
                                <option value='DOKTORAL'>DOKTORAL</option>
                            </NativeSelect>
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className="tombol">
                            <Button type="button" color="grey" onClick={this.fetchdatatrans} >Lihat Riwayat Periksa </Button>
                            </div>
                            <br/>
                           
                        </div>
                        <br/>
                        <br/>
        
                  {tabeltrans}
                </div>
                <br/>
            </Paper>
            <br/>
            <MTable 
                title="Tabel Pasien"
                columns={this.state.columnpasien}
                data={this.state.datapasien}
                onRowClick={this.rowClikPasien}
                />

            </div>
        }else{
            content =
            <div>{loding}</div>
            
        }

       
        return(
            <div>{content}
            <Modal isOpen={this.state.modalup} toggle={this.toggleU} className="modal-lg">
          <ModalHeader toggle={this.toggleU}><b>Input Diagnosa dan Obat</b></ModalHeader>
          <form method="post" onSubmit ={(e) => this.handleSubmitDiagObat(e)}  >
          <ModalBody>
          <div className="row" id="input2">
                <div className="col-md-7">
                   <TextField
                    name="diagnosa1"
                    id="outlined-name"
                    label="Diagnosa"
                    fullWidth
                    value={this.state.diagnosa1}
                    margin="normal"
                    variant="outlined"
                    onChange={this.handleChangeAdd}
                   />
                </div>
                <div className="col-md-4">
                   <TextField
                    name="obat1"
                    id="outlined-name"
                    label="Obat"
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    value={this.state.obat1}
                    onChange={this.handleChangeAdd}
                    />
                </div>             
         </div>
       

        <br/>
        <div className="row" id="input2">
        <div className="col-md-6">
        <MTable 
                title="Tabel Diagnosa"
                columns={this.state.coldiagnosa}
                data={this.state.diagnosa}
              
         />
         </div>
         <div className="col-md-5">
          <MTable 
                title="Tabel Obat"
                columns={this.state.colobat}
                data={this.state.obat}
               
         />
         </div>
         </div>

          </ModalBody>
          <ModalFooter>
            <Button type="submit" color="green">Submit</Button>
          </ModalFooter>
          </form>
        </Modal>
        </div>
            
        )
    }
}

