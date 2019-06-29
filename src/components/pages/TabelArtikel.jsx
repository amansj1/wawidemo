import React from 'react';
import axios from 'axios';
import MTable from 'material-table';

export default class TabelArtikel extends React.Component{
  constructor(){
    super();
    this.state ={
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
    }
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
  let content;

  if (this.state.loading) {
    content = <div>Loading...</div>;
  } else { 
    content =  <MTable 
    title="Artikel"
    columns={this.state.columns}
    data={this.state.data}
    editable = {{
    onRowAdd: console.log('haiii')
    }}
    />

  }

  return (
    <div>
      {content}
    </div>
  )
}
}
