import React from 'react';
import axios from 'axios';
import MTable, {MTableToolbar} from 'material-table';
import Chip from '@material-ui/core/Chip';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import TextField from '@material-ui/core/TextField';
import NativeSelect from '@material-ui/core/NativeSelect';
import { OutlinedInput } from '@material-ui/core';
import './TabelArtikel.css';
import Swal from 'sweetalert2';

export default class TabelArtikel extends React.Component{
  constructor(props){
    super(props);
    this.state ={
      //variable untuk diisi
      id : '',
      Judul:'',
      Isi:'',
      Foto:'',
      idpenulis:'',
      idkategori:'',
      kategoriartikel:[],
      Kat:'',

      //property table untuk disi pake API
      columns: [
        {title:'ID', field:'id_mst_artikel'},
        {title:'Judul', field:'judul_artikel'},
        {title:'Kategori Artikel', field:'kategori_artikel.kategori'},
        {title:'Nama Penulis', field:'mst_penulis.name'},
        {title:'Tanggal Dibuat', field:'created_at'},
      ],
      data:[],

      //manage tampilan
      loading : true,
      modaladd:false,
      modalup:false,
      modKat:false,
      modKat1:false
    };
    this.handleSubmitAdd = this.handleSubmitAdd.bind(this);
    this.toggleU = this.toggleU.bind(this);
    this.toggle = this.toggle.bind(this);

    this.resetstate =  this.resetstate.bind(this);
  }

//ketika submit dari form artikel (POST DATA)
handleSubmitAdd (e){
  e.preventDefault();
  const apiurl = 'https://zav-wawi.herokuapp.com/api/artikel/create'
  const addartikel ={
    id_mst_penulis : this.props.id_pengguna,
    judul_artikel : this.state.Judul,
    isi_artikel : this.state.Isi,
    id_kategori_artikel : this.state.idkategori,
    foto_artikel : this.state.Foto    
  };
  axios.post(apiurl, addartikel)
  .then(res => {
    this.fetchdata();
    // console.log(res.data);
    alert(res.data.note)
  }).catch(e=>{console.log(e.response)})
  this.resetstate();
  this.toggle();
}
handleSubmitKat (e){
  e.preventDefault();
  const apiurl1 = 'https://zav-wawi.herokuapp.com/api/kategori/create'
  const addartikel ={
    kategori : this.state.Kat    
  };
  axios.post(apiurl1, addartikel)
  .then(res => {
    this.fetchdata();
    // console.log(res.data);
    alert(res.data.note)
  }).catch(e=>{console.log(e.response)})
  this.resetstate();
  this.toggl();
}

//ketika submit dari form artikel (PUT DATA)
handleSubmitPut (e){
  e.preventDefault();
  const id = this.state.id
  const apiurl = 'https://zav-wawi.herokuapp.com/api/artikel/update/artikelid='
  // console.log(apiurl + id);

  const putartikel ={
    id_mst_penulis : this.props.id_pengguna,
    judul_artikel : this.state.Judul,
    isi_artikel : this.state.Isi,
    id_kategori_artikel : this.state.idkategori,
    foto_artikel : this.state.Foto    
  };
  axios.put(apiurl + id, putartikel)
  .then(res => {
    this.fetchdata();
    // console.log(res.data);
    alert(res.data.note)
  }).catch(e=>{console.log(e.response)})
  this.resetstate();
  this.toggleU();
}



// ambil data ke API (GET DATA)
fetchdata = () =>{
  const url ='https://zav-wawi.herokuapp.com/api/artikel/all';
  axios.get(url)
  .then(response => {
    this.setState({
      data: response.data,
      loading: false
    });
    Swal.hideLoading()
    // console.log(response);
  })
  .catch(error => {
    console.log(error);
  });
  this.kategoriartikell();
}
componentDidMount(){
    return this.fetchdata();
}



// kumpulan handle onclik/onchange

//reset state
resetstate = ()=>{
this.setState({
  id : '',
  Judul:'',
  Isi:'',
  Foto:'',
  idpenulis:'',
  idkategori:'',
  Kat:'',
})
}
// untuk buka modal add
toggle() {
    this.setState(prevState => ({
      modaladd: !prevState.modaladd    
    }));
    this.resetstate();
};

toggleU() {
  this.setState(prevState => ({
    modalup: !prevState.modalup    
  }));
}
  //untuk form add masukin value ke state
  handleChangeAdd = event =>{
    this.setState({
      [event.target.name]: event.target.value
  })
  };

kategoriartikell = () =>{
  const url ='https://zav-wawi.herokuapp.com/api/kategori/all';
        axios.get(url)
        .then(response => {
          this.setState({
            kategoriartikel: response.data.data
          });
          // console.log(response.data.data);
          
        })
        .catch(error => {
         alert(error);
        });
}
handleDel = event =>{
  event.preventDefault();
  axios.delete(`https://zav-wawi.herokuapp.com/api/artikel/delete/artikelid=${this.state.id}`)
  .then(res => {
    this.fetchdata();
    alert(res.data.note)
    // console.log(res);
    // console.log(res.data);
  });
  this.resetstate();
  this.toggleU();
  


}
//handle yang ambil data dari table
rowClik = (e,rowData) => {
  e.preventDefault();
  this.setState({
    id : rowData.id_mst_artikel,
    Judul: rowData.judul_artikel,
    Isi: rowData.isi_artikel,
    Foto: rowData.foto_artikel,
    idpenulis:'',
    idkategori:rowData.id_kategori_artikel,
  });
  this.toggleU();
//isi data state nya pake roeData.var
  // console.log('ini id',rowData.mst_penulis.name );
  
}


render () {


//content
let jadwal = this.state.kategoriartikel.map(function(item, i){
  return <option key={i} value={item.id_kategori_artikel}>{item.kategori}</option>;
})
  let content;
  if (this.state.loading) {
    content = Swal.showLoading() ;
  } else { 
    content =  
    <div>
      <MTable 
    title="Artikel"
    columns={this.state.columns}
        data={this.state.data}
    onRowClick={this.rowClik}
    components={{
      Toolbar: props => (
        <div>
          <MTableToolbar {...props} />
          <div style={{padding: '0px 10px'}}>
            <Chip label="+ Tambah Artikel" onClick={this.toggle}  style={{marginLeft: 5}}/>
          </div>
        </div>
      ),
    }}
    />
    </div>

  }

  return (
    <div>
      {content}
      {/* modal untuk add form */}
      <Modal isOpen={this.state.modaladd} toggle={this.toggle} className="modal-lg">
          <ModalHeader toggle={this.toggle}><b>Tambah Artikel</b></ModalHeader>
          <form method="post" onSubmit ={(e) => this.handleSubmitAdd(e)}  >
          <ModalBody>         
          <NativeSelect id="select"
              value={this.state.idkategori}
              onChange={this.handleChangeAdd}
              input={<OutlinedInput name="idkategori" value={this.state.idkategori} fullWidth id="outlined-age-simple"  />}
              >
              {jadwal}
              </NativeSelect>
              <TextField
              name="Judul"
              id="outlined-name"
              label="Judul Artikel"
              margin="normal"
              fullWidth
              variant="outlined"
              onChange={this.handleChangeAdd}
            />

        <br/>
            <TextField
              id="outlined-multiline-static"
              label="Isi Artikel"
              name="Isi"
              fullWidth
              multiline
              rows="7"
              defaultValue=""
              margin="normal"
              variant="outlined"
              onChange={this.handleChangeAdd}
            />
           
            <TextField
              name="Foto"
              id="outlined-name"
              label="Link Foto"
              margin="normal"
              variant="outlined"
              onChange={this.handleChangeAdd}
            />
            <br/>
            <img src={this.state.Foto} alt="Foto Artikel" width="500" height="333"></img>
 
          </ModalBody>
          <ModalFooter>
            <Button type="submit" color="grey">Submit</Button>
          </ModalFooter>
          </form>
        </Modal>
      



 {/* modal untuk update form */}
 <Modal isOpen={this.state.modalup} toggle={this.toggleU} className="modal-lg">
          <ModalHeader toggle={this.toggleU}><b>Update Artikel {this.state.id}</b></ModalHeader>
          <form method="post" onSubmit ={(e) => this.handleSubmitPut(e)}  >
          <ModalBody>
         
          <NativeSelect id="select"
              value={this.state.idkategori}
              onChange={this.handleChangeAdd}
              input={<OutlinedInput name="idkategori" value={this.state.idkategori} fullWidth id="outlined-age-simple"  />}
              >
              {jadwal}
              </NativeSelect>
              <TextField
              name="Judul"
              id="outlined-name"
              label="Judul Artikel"
              margin="normal"
              fullWidth
              variant="outlined"
              value = {this.state.Judul}
              onChange={this.handleChangeAdd}
            />
            <TextField
              id="outlined-multiline-static"
              label="Isi Artikel"
              name="Isi"
              fullWidth
              multiline
              rows="7"
              defaultValue=''
              margin="normal"
              variant="outlined"
              value = {this.state.Isi}
              onChange={this.handleChangeAdd}
             
            />

            <TextField
              name="Foto"
              id="outlined-name"
              label="Link Foto"
              margin="normal"
              defaultValue=''
              variant="outlined"
              value = {this.state.Foto}
              onChange={this.handleChangeAdd}
            />
            <br/>
            <img src={this.state.Foto} alt="Foto Artikel" width="500" height="333"></img>
           
          </ModalBody>
          <ModalFooter>
            <Button type="button" color="red" onClick={(e) => this.handleDel(e)}>Delete</Button>
            <Button type="submit" color="cyan">Update</Button>
          </ModalFooter>
          </form>
        </Modal>

    </div>
  )
}
}
