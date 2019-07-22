import React from 'react';
import axios from 'axios';
import MTable, {MTableToolbar} from 'material-table';
import Chip from '@material-ui/core/Chip';
import { Button} from 'reactstrap';
import TextField from '@material-ui/core/TextField';
import Maps from './Maps';
import InputLabel from '@material-ui/core/InputLabel';
import NativeSelect from '@material-ui/core/NativeSelect';
import Input from '@material-ui/core/Input';
import Paper from '@material-ui/core/Paper';
import './TableMonikTest.css';

export default class TabelMonikTest  extends React.Component{
    constructor(props){
        super(props);
        this.state ={
          //variable untuk diisi
          id : '',
          idmonik:'',
          mulai:'',
          selesai:'',
          kegiatan:'',
          tgl:'',
          long: 0,
          lat: 0,
    
          //property table untuk disi pake API
          columns: [
            {title:'Id', field:'id_jadwal_monik'},
            {title:'Id Monik', field:'id_mst_monik'},
            {title:'Mulai', field:'jam_mulai_monik'},
            {title:'Selesai', field:'jam_selesai_monik'},
            {title:'Kegiatan', field:'kegiatan'},
            {title:'Tanggal Kegiatan', field:'tgl_kegiatan'},
          ],
          data:[],
    
          //manage tampilan
          loading : true,
          modaladd:false,
          modalup:false,
        };
        // this.handleSubmitAdd = this.handleSubmitAdd.bind(this);
        this.toggleU = this.toggleU.bind(this);
        this.toggle = this.toggle.bind(this);
        this.resetstate =  this.resetstate.bind(this);
      }

// ambil data ke API (GET DATA)
fetchdata = () =>{
  const url ='https://zav-wawi.herokuapp.com/api/jadwal_monik/all';
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


handleChangeAdd = event =>{
  this.setState({
    [event.target.name]: event.target.value
})
};


//reset state
resetstate(){
  this.setState({
    id : '',
    idmonik:'',
    mulai:'',
    selesai:'',
    kegiatan:'',
    tgl:'',
    long:'',
    lat:'',
    modaladd:false,
    modalup:false,
  })
  }

  toggle() {
    this.resetstate();
    this.setState({
      modaladd: true   
    });
}

  toggleU() {
    this.setState({
      modalup: true
    });
    // this.setState(prevState => ({
    //   modalup: !prevState.modalup    
    // }));
  }

  rowClik = (e,rowData) => {
    e.preventDefault();
    this.setState({
      id : rowData.id_jadwal_monik,
      idmonik: rowData.id_mst_monik,
      mulai:rowData.jam_mulai_monik,
      selesai:rowData.jam_selesai_monik,
      kegiatan : rowData.kegiatan,
      tgl: rowData.tgl_kegiatan,
      long: parseFloat(rowData.long_monik),
      lat: parseFloat(rowData.lat_monik),
    });
    this.toggleU();
  //isi data state nya pake roeData.var
    
  }

  handleSubmitAdd (e){
    e.preventDefault();
    this.resetstate();
    const apiurl = 'https://zav-wawi.herokuapp.com/api/jadwal_monik/create'
    const add ={
      id_mst_monik : this.state.idmonik,
      lat_monik : this.state.lat,
      long_monik : this.state.long,
      jam_mulai_monik : this.state.mulai,
      jam_selesai_monik : this.state.selesai,
      kegiatan : this.state.kegiatan,
      tgl_kegiatan : this.state.tgl
      
    };
    axios.post(apiurl, add)
    .then(res => {
      this.fetchdata();
      alert(res.note);
    })
    
    this.resetstate();
   
  }
  handleSubmitPut (e){
    e.preventDefault();
    const id = this.state.id
    const apiurl = 'https://zav-wawi.herokuapp.com/api/jadwal_monik/update/jadwalmonikid='
    console.log(apiurl + id);
    debugger
    const put ={
      id_mst_monik : this.state.idmonik,
      lat_monik : this.state.lat,
      long_monik : this.state.long,
      jam_mulai_monik : this.state.mulai,
      jam_selesai_monik : this.state.selesai,
      kegiatan : this.state.kegiatan,
      tgl_kegiatan : this.state.tgl 
    };
    axios.put(apiurl + id, put)
    .then(res => {
      this.fetchdata();
      console.log(res.data);
      alert(res.data.note);
    })
    this.resetstate();
    
  }
  handleDel = event =>{
    event.preventDefault();
    axios.delete(`https://zav-wawi.herokuapp.com/api/jadwal_monik/delete/jadwalmonikid=${this.state.id}`)
    .then(res => {
      this.fetchdata();
      console.log(res);
      alert(res.data.note);
    })
    this.resetstate();
  }
  handleLatChange = (value)=>{
    this.setState({
      lat : value
    })
   
  }
  handleLngChange = (newvalue)=>{
    this.setState({
      long : newvalue
    })
  }


render(){
    
  let content;
  if (this.state.loading) {
    content = <div>Loading...</div>;
  } else { 

  if(this.state.modalup){
    content =
    <div >
     <Paper className="paper" >
        <div className="formpad">
        <h6 className="MuiTypography-root MuiTypography-h6">Update Kegiatan Monik {this.state.id} </h6>
        <br/>
        <Maps
        google={this.props.google}
        center={{lat: this.state.lat, lng: this.state.long}}
        height='300px'
        zoom={15}
        onLatChange ={(value)=> this.handleLatChange(value)}
        onLngChange ={(value)=> this.handleLngChange(value)}
        /> <br/><br/>
         <form method="post" onSubmit ={(e) => this.handleSubmitPut(e)}  >
        <TextField
              name="kegiatan"
              id="outlined-name"
              label="Kegiatan"
              width = '50%'
              margin="normal"
              variant="outlined"
              value ={this.state.kegiatan}
              onChange={this.handleChangeAdd}
            />
        <br/>
              <InputLabel htmlFor="age-native-helper">Monik</InputLabel>
              <NativeSelect
                value={this.state.idmonik}
                onChange={this.handleChangeAdd}
                input={<Input name="idmonik" value={this.state.idmonik} id="age-native-helper" />}
              >
                <option value="" />
                <option value={1}>Monik - 1</option>
                <option value={2}>Monik - 2</option>
                <option value={3}>Monik - 3</option>
                <option value={4}>Monik - 4</option>
                <option value={5}>Monik - 5</option>
                <option value={6}>Monik - 6</option>
                <option value={7}>Monik - 7</option>
                <option value={8}>Monik - 8</option>
                <option value={9}>Monik - 9</option>
                <option value={10}>Monik - 10</option>

              </NativeSelect>
              &emsp; &emsp; &emsp;

              <TextField
              id="date"
              name="tgl"
              label="Tanggal Pelaksanaan"
              type="date"
              value={this.state.tgl}
              defaultValue="2019-05-24"
              InputLabelProps={{
                shrink: true,
              }}
              onChange={this.handleChangeAdd}
            />
            &emsp; &emsp; &emsp;
            <TextField
              id="time"
              name="mulai"
              label="Waktu Mulai"
              type="time"
              value = {this.state.mulai}
              defaultValue="07:30"
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                step: 300, // 5 min
              }}
              onChange={this.handleChangeAdd}
            />
            &emsp; &emsp; &emsp;
            <TextField
              id="time"
              label="Waktu Selesai"
              name="selesai"
              type="time"
              value = {this.state.selesai}
              defaultValue="07:30"
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                step: 300, // 5 min
              }}
              onChange={this.handleChangeAdd}

            />
          <br/>
          <br/>
              <div className="put">
              <Button type="button" color="red" onClick={(e) => this.handleDel(e)}>Delete</Button>
              <Button type="submit" color="green" >Update</Button>
              </div>
          <br/>
          </form>
          </div>
          
      </Paper>

  
      <br/>
      <br/>

    <MTable 
    title="Jadwal Monik"
    columns={this.state.columns}
    data={this.state.data}
    onRowClick={this.rowClik}
    components={{
      Toolbar: props => (
        <div>
          <MTableToolbar {...props} />
          <div style={{padding: '0px 10px'}}>
            <Chip label="+ Tambah Jadwal" onClick={this.toggle}  style={{marginLeft: 5}}/>
          </div>
        </div>
      ),
    }}
    />
  </div>
  }else if (this.state.modaladd) {
    content =  
    <div>
       <Paper className="paper" >
        <div className="formpad">
    <form method="post" onSubmit ={(e) => this.handleSubmitAdd(e)}  >

    <Maps
      google={this.props.google}
      center={{lat: -7.790073587756385, lng: 110.36041300469356}}
      height='300px'
      zoom={15}
      onLatChange ={(value)=> this.handleLatChange(value)}
      onLngChange ={(value)=> this.handleLngChange(value)}
       /> <br/><br/>
    
      <TextField
        name="kegiatan"
        id="outlined-name"
        label="Kegiatan"
        fullWidth
        margin="normal"
        variant="outlined"
        onChange={this.handleChangeAdd}
      />
  <br/>
        <InputLabel htmlFor="age-native-helper">Monik</InputLabel>
        <NativeSelect
          value={this.state.idmonik}
          onChange={this.handleChangeAdd}
          input={<Input name="idmonik" id="age-native-helper" />}
        >
          <option value="" />
          <option value={1}>Monik - 1</option>
          <option value={2}>Monik - 2</option>
          <option value={3}>Monik - 3</option>
          <option value={4}>Monik - 4</option>
          <option value={5}>Monik - 5</option>
          <option value={6}>Monik - 6</option>
          <option value={7}>Monik - 7</option>
          <option value={8}>Monik - 8</option>
          <option value={9}>Monik - 9</option>
          <option value={10}>Monik - 10</option>

        </NativeSelect>
        &emsp; &emsp; &emsp;
        <TextField
        id="date"
        name="tgl"
        label="Tanggal Pelaksanaan"
        type="date"
        defaultValue="2019-05-24"
        InputLabelProps={{
          shrink: true,
        }}
        onChange={this.handleChangeAdd}
      />
      &emsp; &emsp; &emsp;
      <TextField
        id="time"
        name="mulai"
        label="Waktu Mulai"
        type="time"
        defaultValue="07:30"
        InputLabelProps={{
          shrink: true,
        }}
        inputProps={{
          step: 300, // 5 min
        }}
        onChange={this.handleChangeAdd}
      />
      &emsp; &emsp; &emsp;
      <TextField
        id="time"
        label="Waktu Selesai"
        name="selesai"
        type="time"
        defaultValue="07:30"
        InputLabelProps={{
          shrink: true,
        }}
        inputProps={{
          step: 300, // 5 min
        }}
        onChange={this.handleChangeAdd}

      />
    <br/>
    <br/>
    <br/>
    <div className="put1">
    <Button type="submit" color="green" >Submit</Button>
    </div>
    </form>
    </div>     
    </Paper>
    
      <br/>
     <br/>
    <MTable 
    title="Jadwal Monik"
    columns={this.state.columns}    
    data={this.state.data}
    onRowClick={this.rowClik}
    components={{
      Toolbar: props => (
        <div>
          <MTableToolbar {...props} />
          <div style={{padding: '0px 10px'}}>
            <Chip label="+ Tambah Jadwal" onClick={this.toggle}  style={{marginLeft: 5}}/>
          </div>
        </div>
      ),
    }}
    />


</div>
  }else{
    content =
    <MTable 
    title="Jadwal Monik"
    columns={this.state.columns}
    data={this.state.data}
    onRowClick={this.rowClik}
    components={{
      Toolbar: props => (
        <div>
          <MTableToolbar {...props} />
          <div style={{padding: '0px 10px'}}>
            <Chip label="+ Tambah Jadwal" onClick={this.toggle}  style={{marginLeft: 5}}/>
          </div>
        </div>
      ),
    }}
    />
  }}



  
        
        return(
          <div>
             {content}
          </div>
           
        )
    }
}