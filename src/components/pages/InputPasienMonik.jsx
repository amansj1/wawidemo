import React from 'react';

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import MTable from 'material-table';
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
           
           
            jadwal_monik :[],
           
            golongan_darah:'',
            id_jadwal:'',
            alamat:'',
            kelurahan:'',
            kecamatan:'',
            kabkot:'',
            prov:'',
            regional:'',
            pemkes:'',
            pmt:'',
            usg:'',
            penyeluhan:'',
            metabolik:'',
            tinggi:'',
            berat:'',
            th:'',
            rh:'',
            asamurat:'',
            guladarah:'',
            koles:'',
            tekanandarah:'',
            modalup:false,
        
        }
        this.toggleU = this.toggleU.bind(this);

  
        
    }
    resetstatetrans =() => {
        this.setState({
            golongan_darah:'',
            id_jadwal:'',
            alamat:'',
            kelurahan:'',
            kecamatan:'',
            kabkot:'',
            prov:'',
            regional:'',
            pemkes:'',
            pmt:'',
            usg:'',
            penyeluhan:'',
            metabolik:'',
            tinggi:'',
            berat:'',
            th:'',
            rh:'',
            asamurat:'',
            guladarah:'',
            koles:'',
            tekanandarah:'',

        })
    }
    resetstate = ()=>{
        this.setState({
            kode_pasien_monik:'U.00'+this.today,
            id:'',
            nik:'',
            nama:'',
            tgl:'',
            pekerjaan:'',
            pendidikan:'',
            jk:'',
            golongan_darah:'',
            isUpdate:false
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
        //   console.log(response.data.data);
          
        })
        .catch(error => {
         alert(error);
        });
        this.datakegiatanmonik();
      }

    datakegiatanmonik = () =>{
        const url ='https://zav-wawi.herokuapp.com/api/jadwal_monik/all';
        axios.get(url)
        .then(response => {
          this.setState({
            jadwal_monik: response.data.data
          });
        //   console.log(response.data.data);
          
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
    handleDelPasien = event =>{
        event.preventDefault();
        axios.delete(`https://zav-wawi.herokuapp.com/api/pasien_monik/delete/pasien_monikid=${this.state.id}`)
        .then(res => {
            
            // console.log(res.data);
        })
       
        this.resetstate();
        this.setState({
            loading:true
        })
        this.fetchdata();
      
      }
    handleSubmitTrans(e){
        e.preventDefault();
        const apiurl = 'https://zav-wawi.herokuapp.com/api/trans_monik/create'
        const addtrans ={
            kode_aksi_monik: 'TR.00'+this.state.today,
            id_jadwal_monik: this.state.id_jadwal,
            id_mst_pasien_monik: this.state.id,
            alamat_lengkap: this.state.alamat,
            kelurahan: this.state.kelurahan,
            kecamatan: this.state.kecamatan,
            kabupaten_kota: this.state.kabkot,
            provinsi: this.state.prov,
            regional: this.state.regional,
            pemkes_umum: this.state.pemkes,
            pmt: this.state.pmt,
            usg: this.state.usg,
            penyuluhan: this.state.penyeluhan,
            metabolik: this.state.metabolik,
            bb: this.state.berat,
            tb: this.state.tinggi,
            rh: this.state.rh,
            td: this.state.tekanandarah,
            au: this.state.asamurat,
            gul: this.state.guladarah,
            kol: this.state.koles
        };
        axios.post(apiurl, addtrans)
        .then(res => {
        //   console.log(res.data);
        })

        this.resetstatetrans();
        this.toggleU();
    }
    
    handleSubmit (e){
        e.preventDefault();
        if(this.state.isUpdate){
            const id = this.state.id
            const apiurl = 'https://zav-wawi.herokuapp.com/api/pasien_monik/update/pasien_monikid='
            const putpasien ={
                name:this.state.nama,
                no_ktpkk:this.state.nik,
                tgl_lahir:this.state.tgl,
                gender:this.state.jk,
                golongan_darah:this.state.golongan_darah,
                pekerjaan:this.state.pekerjaan,
                pendidikan:this.state.pendidikan     
            };
            axios.put(apiurl + id, putpasien)
            .then(res => {
             
            //   console.log(res.data);
            })
            this.resetstate();
            this.setState({
                loading:true
            })
            this.fetchdata();
            
           


        }else{
        const apiurl = 'https://zav-wawi.herokuapp.com/api/pasien_monik/create'
        const addpasien ={
            kode_pasien_monik:this.state.kode_pasien_monik,
            name:this.state.nama,
            no_ktpkk:this.state.nik,
            tgl_lahir:this.state.tgl,
            gender:this.state.jk,
            golongan_darah:this.state.golongan_darah,
            pekerjaan:this.state.pekerjaan,
            pendidikan:this.state.pendidikan  
        };
        axios.post(apiurl, addpasien)
        .then(res => {
          this.fetchdata();
        //   console.log(res.data);
        })
        this.resetstate();

        }
        this.setState({
            loading:true
        })
        this.fetchdata();
        
      }
    
      toggleU() {
        this.setState(prevState => ({
          modalup: !prevState.modalup    
        }));
      }
    render(){
        let content;
        let isupdate;

        if(this.state.isUpdate){
        
            isupdate = <div>
            <Button type="button" color="white" onClick={this.resetstate} >Tambah Baru</Button>
            <Button type="button" color="grey" onClick={this.toggleU} >Input Detil</Button>
            <Button type="button" color="red" onClick={(e) => this.handleDelPasien(e)} >Delete</Button>
            <Button type="submit" color="green" >Update</Button>
        </div>
            
        }else{
            
             isupdate = <div>
                 <Button type="submit" color="green" >Submit</Button>
            </div>
        }

        let jadwal = this.state.jadwal_monik.map(function(item, i){
            return <option key={i} value={item.id_jadwal_monik}>{item.kegiatan}</option>;
          })

        if(this.state.loading){
            content= <div>Loading ..</div>
        }else{
        content =    
                <MTable 
                title="Tabel Pasien"
                columns={this.state.columns}
                data={this.state.data}
                onRowClick={this.rowClik}
                />
        }
        if(this.state.id_trans>0){
            this.toggles();
        }else{

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

        <Modal isOpen={this.state.modalup} toggle={this.toggleU} className="modal-lg">
          <ModalHeader toggle={this.toggleU}><b>Input Transaksi Monik {this.state.nama}</b></ModalHeader>
          <form method="post" onSubmit ={(e) => this.handleSubmitTrans(e)}  >
          <ModalBody>
         
          <div className="col-md-5">
             <NativeSelect id="select"
                value={this.state.id_jadwal}
                onChange={this.handleChangeAdd}
                input={<OutlinedInput name="id_jadwal" value={this.state.id_jadwal} fullWidth id="outlined-age-simple"  />}
                 >
                <option>- Pilih Jadwal Monik -</option>
                {jadwal}
                </NativeSelect>
         </div>
         <div className="row" id="input2">
        <div className="col-md-11">
            <TextField
            name="alamat"
            id="outlined-name"
            label="Alamat Lengkap"
            fullWidth
            margin="normal"
            variant="outlined"
            value={this.state.alamat}
            onChange={this.handleChangeAdd}
            />
        </div>
        </div>
        <div className="row" id="input2">
        <div className="col-md-3">
            <TextField
            name="kelurahan"
            id="outlined-name"
            label="Kelurahan"
            fullWidth
            margin="normal"
            variant="outlined"
            value={this.state.kelurahan}
            onChange={this.handleChangeAdd}
            />
        </div>
        <div className="col-md-3">
            <TextField
            name="kecamatan"
            id="outlined-name"
            label="Kecamatan"
            fullWidth
            margin="normal"
            variant="outlined"
            value={this.state.kecamatan}
            onChange={this.handleChangeAdd}
            />
            </div>
            <div className="col-md-3">
            <TextField
            name="kabkot"
            id="outlined-name"
            label="Kab/Kota"
            fullWidth
            margin="normal"
            variant="outlined"
            value={this.state.kabkot}
            onChange={this.handleChangeAdd}
            />
        </div>
        </div>
        <div className="row" id="input2">
        <div className="col-md-3">
            <TextField
            name="prov"
            id="outlined-name"
            label="Provinsi"
            fullWidth
            margin="normal"
            variant="outlined"
            value={this.state.prov}
            onChange={this.handleChangeAdd}
            />
        </div>
        <div className="col-md-3">
            <TextField
            name="regional"
            id="outlined-name"
            label="Regional"
            fullWidth
            margin="normal"
            variant="outlined"
            value={this.state.regional}
            onChange={this.handleChangeAdd}
            />
        </div>
        <div className="col-md-3">
            <TextField
            name="pemkes"
            id="outlined-name"
            label="PEMKES"
            fullWidth
            margin="normal"
            variant="outlined"
            value={this.state.pemkes}
            onChange={this.handleChangeAdd}
            />
        </div>
        </div>
        <div className="row" id="input2">
        <div className="col-md-2">
            <TextField
            name="pmt"
            id="outlined-name"
            label="PMT"
            fullWidth
            margin="normal"
            variant="outlined"
            value={this.state.pmt}
            onChange={this.handleChangeAdd}
            />
        </div>
        <div className="col-md-2">
            <TextField
            name="usg"
            id="outlined-name"
            label="Usg"
            fullWidth
            margin="normal"
            variant="outlined"
            value={this.state.usg}
            onChange={this.handleChangeAdd}
            />
        </div>
        <div className="col-md-2">
            <TextField
            name="penyeluhan"
            id="outlined-name"
            label="Penyuluhan"
            fullWidth
            margin="normal"
            variant="outlined"
            value={this.state.penyeluhan}
            onChange={this.handleChangeAdd}
            />
            </div>
            <div className="col-md-2">
            <TextField
            name="metabolik"
            id="outlined-name"
            label="Metabolik"
            fullWidth
            margin="normal"
            variant="outlined"
            value={this.state.metabolik}
            onChange={this.handleChangeAdd}
            />
        </div>
        <div className="col-md-2">
            <TextField
            name="rh"
            id="outlined-name"
            label="Rh"
            fullWidth
            margin="normal"
            variant="outlined"
            value={this.state.rh}
            onChange={this.handleChangeAdd}
            />
        </div>
        </div>
        
        <div className="row" id="input2">
                          <div className="col-md-2">
                                    <TextField
                                    name="tinggi"
                                    id="outlined-name"
                                    label="Tinggi Badan"
                                    fullWidth
                                    margin="normal"
                                    variant="outlined"
                                    value={this.state.tinggi}
                                    onChange={this.handleChangeAdd}
                                    />
                            </div>
                            <div className="col-md-2">
                                    <TextField
                                    name="berat"
                                    id="outlined-name"
                                    label="Berat Badan"
                                    fullWidth
                                    margin="normal"
                                    variant="outlined"
                                    value={this.state.berat}
                                    onChange={this.handleChangeAdd}
                                    />
                            </div>
                            <div className="col-md-2">
                                    <TextField
                                    name="tekanandarah"
                                    id="outlined-name"
                                    label="Tekanan Darah"
                                    fullWidth
                                    margin="normal"
                                    variant="outlined"
                                    value={this.state.tekanandarah}
                                    onChange={this.handleChangeAdd}
                                    />
                            </div>
                            <div className="col-md-2">
                                    <TextField
                                    name="asamurat"
                                    id="outlined-name"
                                    label="Asam Urat"
                                    fullWidth
                                    margin="normal"
                                    variant="outlined"
                                    value={this.state.asamurat}
                                    onChange={this.handleChangeAdd}
                                    />
                            </div>
                            <div className="col-md-2">
                                    <TextField
                                    name="guladarah"
                                    id="outlined-name"
                                    label="Gula Darah"
                                    fullWidth
                                    margin="normal"
                                    variant="outlined"
                                    value={this.state.guladarah}
                                    onChange={this.handleChangeAdd}
                                    />
                            </div>
                            <div className="col-md-2">
                                    <TextField
                                    name="koles"
                                    id="outlined-name"
                                    label="Kolesterol"
                                    fullWidth
                                    margin="normal"
                                    value={this.state.koles}
                                    variant="outlined"
                                    onChange={this.handleChangeAdd}
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

