import React from 'react';
import axios from 'axios';
import MTable, {MTableToolbar} from 'material-table';
import Chip from '@material-ui/core/Chip';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import OutlinedInput from '@material-ui/core/OutlinedInput';

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
handleSubmitAdd = event =>{
  event.preventDefault();
  const addartikel ={
    judul_artikel : this.state.Judul,
    isi_artikel : this.state.Isi,
    foto_artikel : this.state.Foto,
    id_mst_penulis : this.state.idpenulis,
    id_kategori_artikel : this.state.idkategori
  };
  axios.post('https://zav-wawi.herokuapp.com/api/artikel/create',{addartikel})
  .then(res => {
    console.log(res);
    console.log(res.data)
  })
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
          <form onSubmit ={this.handleSubmitAdd}  >
          <ModalBody>
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
             <input
                accept="image/*"
                id="text-button-file"
                multiple
                name="Foto"
                onChange={this.handleChangeAdd}
                type="file"
              />
          </ModalBody>
          <ModalFooter>
            <Button type="submit">Submit</Button>
          </ModalFooter>
          </form>
        </Modal>



    </div>
  )
}
}
