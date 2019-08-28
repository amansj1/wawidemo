import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import MTable, {MTableToolbar} from 'material-table';
import Chip from '@material-ui/core/Chip';
import NativeSelect from '@material-ui/core/NativeSelect';
import Paper from '@material-ui/core/Paper';
import { OutlinedInput } from '@material-ui/core';

import './InputObat.css';
import Swal from 'sweetalert2';

export default class InputObat extends React.Component{
    constructor(props){
        super(props)
        this.state={
            apotekid:this.props.id_pengguna,
            invStok:'',
            staStok:'',
            hargaObat:'',

            idObat:'',
            namaObat:'',
            namajenisObat:'',
            idJenis:'',
            jenisObat:[],

            colGetObat:[
                {title:'Id Obat', field:'id_mst_obat'},
                {title:'Nama Obat', field:'nama_obat'},
                {title:'Jenis Obat', field:'jenis_obat.nama_jenis_obat'},
                {title:'Tanggal Input Obat', field:'created_at'},
            ],
            colGetObatApt:[
              {title:'Nama Obat', field:'mst_obat.nama_obat'},
              {title:'Jenis Obat', field:'mst_obat.jenis_obat.nama_jenis_obat'},
              {title:'Stok Inventori', field:'inventori_stok'},
              {title:'Harga Obat', field:'harga_obat'},
          ],
            dataGetObat:[],
            dataGetObatApt:[],


            modalup:false,
            isAddToApotek:false,
            addtopuskesmas:false,

            loading:true
        };
        this.toggle = this.toggle.bind(this);
     
    }

    datajenisobat = () =>{
        const url ='https://zav-wawi.herokuapp.com/api/jenis_obat/all';
        axios.get(url)
        .then(response => {
          this.setState({
            jenisObat: response.data.data,
            loading: false
          });
          Swal.hideLoading()
          
        })
        .catch(error => {
         alert(error);
        });
        // alert('Silahkan tambahkan stok obat apotek dengan cara memilih pada baris tabel, apabila obat tidak terdapat pada tabel silahkan pilih + Tambah Obat');
    }
    fetchdata = () =>{
      const url2 ='https://zav-wawi.herokuapp.com/api/obat/byapotekid=';
      const id = this.props.id_pengguna;
        axios.get(url2+id)
        .then(response => {
          this.setState({
            dataGetObatApt: response.data.data,
          });
          // Swal.hideLoading()
        })
        .catch(error => {
         alert(error);
        });

        const url ='https://zav-wawi.herokuapp.com/api/obat/all';
        axios.get(url)
        .then(response => {
          this.setState({
            dataGetObat: response.data.data,
            loading: false
          });
          // Swal.hideLoading()
          this.datajenisobat();
        })
        .catch(error => {
         alert(error);
        });
        
      }
      componentDidMount(){
        this.fetchdata();
      
     }
  
     toggle() {
        this.setState(prevState => ({
          modalup: !prevState.modalup    
        }));
    };

    handleChangeAdd = event =>{
        this.setState({[event.target.name]: event.target.value})
    }

    rowClik = (e,rowData) => {
        e.preventDefault();
        this.setState({
            idObat:rowData.id_mst_obat,
            namaObat:rowData.nama_obat,
            addtopuskesmas:true
        });
    }
    resetstate=()=>{
        this.setState({
            apotekid:this.props.id_pengguna,
            invStok:'',
            staStok:'',
            hargaObat:'',
            idJenis:'',

            idObat:'',
            namaObat:'',
            addtopuskesmas:false,
            modalup:false
        })
    }

    handleSubmit=(e)=>{
        e.preventDefault();
        const apiurl = 'https://zav-wawi.herokuapp.com/api/obat/create/byapotekid='
        const addtrans ={
            fk_mst_obat: this.state.idObat,
            inventori_stok:this.state.invStok,
            status_stok: this.state.staStok,
            harga_obat: this.state.hargaObat
        };
      
        axios.post(apiurl+this.props.id_pengguna, addtrans)
        .then(res => {
          this.fetchdata();
        //   console.log(res.data);
        }).catch(e =>{ console.log(e.response)})
        this.resetstate();
    }
    handleSubmitObatBaru=(e)=>{
        e.preventDefault();
        const apiurl1 = 'https://zav-wawi.herokuapp.com/api/obat/create'
        const addtrans ={
            nama_obat: this.state.namaObat,
            id_jenis_obat:this.state.idJenis
        };
      
        axios.post(apiurl1, addtrans)
        .then(res => {
          this.fetchdata();
          // console.log(res.data);
        }).catch(e =>{ console.log(e.response)})
        this.resetstate();
    }
    


    render(){
       
        let content;
        let jenis = this.state.jenisObat.map(function(item, i){
            return <option key={i} value={item.id_jenis_obat}>{item.nama_jenis_obat}</option>;
          })

        if(this.state.loading){
            content =Swal.showLoading();
        }else if(this.state.addtopuskesmas){
            content = <div> <Paper className="paper">
            <div className="formpad">
                <h3 className="MuiTypography-root MuiTypography-h6"><b>Tambah Stok Obat {this.state.namaObat}  ke Apotek </b></h3><br/>
                <form method="post" onSubmit ={(e) => this.handleSubmit(e)}  >
            
                    <div className="row" id="input2">
                        <div className="col-md-3">
                        <TextField
                        name="invStok"
                        type="number"
                        id="outlined-name"
                        label="Jumlah Inventori Stok"
                        fullWidth
                        value={this.state.invStok}
                        margin="normal"
                        variant="outlined"
                        onChange={this.handleChangeAdd}
                        />
                        </div>
                        <div className="col-md-3">
                            <div className="select">
                            <NativeSelect id="select"
                                value={this.state.staStok}
                                onChange={this.handleChangeAdd}
                                input={<OutlinedInput name="staStok" value={this.state.staStok} fullWidth id="outlined-age-simple"  />}
                            >
                                <option>- Pilih Status Stok -</option>
                                <option value='1'>Sesuai inventori stok </option>
                                <option value='0'>Tidak sesuai inventori stok</option>

                            </NativeSelect>
                            </div>
                            </div>
                        <div className="col-md-4">
                        <TextField
                        name="hargaObat"
                        type="number"
                        id="outlined-name"
                        label="Harga Obat"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        value={this.state.hargaObat}
                        onChange={this.handleChangeAdd}
                        />
                        </div>
                       
                        
                     
                  </div>
                  <div className="col-md-12">
                            <div className="tombol">
                            <Button type="submit" color="green" >Submit</Button>
                            </div>
                            <br/>
                        </div>   
                 
                        <br/>
                  
                   
                </form>
            </div>
        </Paper>
        <br/>
        <MTable 
            title="Daftar Obat Apotek "
            columns={this.state.colGetObatApt}
            data={this.state.dataGetObatApt}
            />
        <br/>
        <MTable 
            title="Obat Terdaftar (Pilih Baris Untuk Menambahkan Inventori)"
            columns={this.state.colGetObat}
            data={this.state.dataGetObat}
            onRowClick={this.rowClik}
            components={{
              Toolbar: props => (
                <div>
                  <MTableToolbar {...props} />
                  <div style={{padding: '0px 10px'}}>
                    <Chip label="+ Tambah Obat" onClick={this.toggle}  style={{marginLeft: 5}}/>
                  </div>
                </div>
              ),
            }}
            />

</div>




        }else{
            content =<div>
               <MTable 
            title="Daftar Obat Apotek "
            columns={this.state.colGetObatApt}
            data={this.state.dataGetObatApt}
            />             
              <br/>
              <MTable 
            title="Obat Terdaftar (Pilih Baris Untuk Menambahkan Inventori)"
            columns={this.state.colGetObat}
            data={this.state.dataGetObat}
            onRowClick={this.rowClik}
            components={{
              Toolbar: props => (
                <div>
                  <MTableToolbar {...props} />
                  <div style={{padding: '0px 10px'}}>
                    <Chip label="+ Tambah Obat" onClick={this.toggle}  style={{marginLeft: 5}}/>
                  </div>
                </div>
              ),
            }}
            /></div>
        }
        return(
            <div>
                {content}
                <Modal isOpen={this.state.modalup} toggle={this.toggle} className="modal-lg">
          <ModalHeader toggle={this.toggle}><b>Input Obat Yang Belum Terdaftar</b></ModalHeader>
          <form method="post" onSubmit ={(e) => this.handleSubmitObatBaru(e)}  >
          <ModalBody>
          <div className="row" id="input2">
                <div className="col-md-7">
                   <TextField
                    name="namaObat"
                    id="outlined-name"
                    label="Nama Obat Baru"
                    fullWidth
                    value={this.state.namaObat}
                    margin="normal"
                    variant="outlined"
                    onChange={this.handleChangeAdd}
                   />
                </div>
                <div className="col-md-4">
                  <div className="select">
                <NativeSelect id="select"
                    value={this.state.idJenis}
                    onChange={this.handleChangeAdd}
                    input={<OutlinedInput name="idJenis" value={this.state.idJenis} fullWidth id="outlined-age-simple"  />}
                            >
                    <option>- Pilih Jenis Obat -</option>
                    {jenis}
                    </NativeSelect>
                </div> </div>            
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