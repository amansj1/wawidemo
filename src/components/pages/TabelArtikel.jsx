import React from 'react';
import axios from 'axios';
import MTable, {MTableToolbar} from 'material-table';
import Chip from '@material-ui/core/Chip';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import TextField from '@material-ui/core/TextField';

export default class TabelArtikel extends React.Component{
  constructor(){
    super();
    this.state ={
      Judul:'',
      Isi:'',
      Foto:'',
      idpenulis:'1',
      idkategori:'1',
      modaladd:false,
      columns: [
        {title:'ID', field:'id_mst_artikel'},
        {title:'Judul', field:'judul_artikel'},
        {title:'Isi', field:'isi_artikel'},
        {title:'Foto Artikel', field:'foto_artikel'},
        {title:'Nama Penulis', field:'mst_penulis.name'},
        {title:'Tanggal Dibuat', field:'created_at'},
      ],
      loading : true,
      data:[]
    };
    this.toggle = this.toggle.bind(this);
  }
  handleChangeAdd = event =>{
    this.setState({
      [event.target.name]: event.target.value
  })
    console.log( this.state.Judul , this.state.Isi , this.state.Foto, this.state.idpenulis, this.state.idkategori );
  }
handleSubmitAdd (e){
  debugger
  e.preventDefault();
  const apiurl = 'https://zav-wawi.herokuapp.com/api/artikel/create'
  const addartikel ={
    id_mst_penulis : this.state.idpenulis,
    judul_artikel : this.state.Judul,
    isi_artikel : this.state.Isi,
    id_kategori_artikel : this.state.idkategori,
    foto_artikel : this.state.Foto    
  };
  axios.post(apiurl, addartikel)
  .then(res => {
    this.fetchdata();
    console.log(res.data);
  })
  this.toggle();
}

  toggle() {
    this.setState(prevState => ({
      modaladd: !prevState.modaladd
    }));
  }


fetchdata = () =>{
  const url ='https://zav-wawi.herokuapp.com/api/artikel/all';
  axios.get(url)
  .then(response => {
    this.setState({
      data: response.data,
      loading: false
    });
    console.log(response);
  })
  .catch(error => {
    console.log(error);
  });
}


componentDidMount(){
    return this.fetchdata();
}
render () {
//handle
  function rowClik (e,rowData) {
    e.preventDefault();
    console.log('ini id',rowData.mst_penulis.name );
  }
  // function handleClick(e){
  //   e.preventDefault();
  //  this.setState =({open:true}); 
  // }
//content
  let content;
  if (this.state.loading) {
    content = <div>Loading...</div>;
  } else { 
    content =  <MTable 
    title="Artikel"
    columns={this.state.columns}
    data={this.state.data}
    onRowClick={rowClik}
    components={{
      Toolbar: props => (
        <div>
          <MTableToolbar {...props} />
          <div style={{padding: '0px 10px'}}>
            <Chip label="+ Tambah Artikel" onClick={this.toggle} color="grey" style={{marginLeft: 5}}/>
          </div>
        </div>
      ),
    }}
    />

  }

  return (
    <div>
      {content}
      <Modal isOpen={this.state.modaladd} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}><b>Tambah Artikel</b></ModalHeader>
          <form method="post" onSubmit ={(e) => this.handleSubmitAdd(e)}  >
          <ModalBody>
            <div>
              <pre> debug judul : {this.state.Judul}</pre>
              <pre> debug isi : {this.state.Isi}</pre>
              <pre> debug foto : {this.state.Foto}</pre>
              <pre> debug idpenuls : {this.state.idpenulis}</pre>
              <pre> debug idkate : {this.state.idkategori}</pre>
            </div>

            <TextField
              name="Judul"
              id="outlined-name"
              label="Judul Artikel"
              margin="normal"
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
 
          </ModalBody>
          <ModalFooter>
            <Button type="submit" color="grey">Submit</Button>
          </ModalFooter>
          </form>
        </Modal>



    </div>
  )
}
}
