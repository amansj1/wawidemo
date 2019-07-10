import React from 'react';
import axios from 'axios';
import MTable from 'material-table';
import Maps from './Maps';

export default class TabelArtikel extends React.Component{
constructor(){
  super();
  this.state ={
    columns: [
      {title:'ID', field:'id'},
      {title:'Judul', field:'title'},
      {title:'Isi', field:'body'},
    ],
    loading : true,
    data:[]
  }
}

fetchdata = () =>{
  const url ='https://jsonplaceholder.typicode.com/posts';
  axios.get(url)
  .then(response => {
    this.setState({
      data: response.data,
      loading: false
    });
    console.log(response.data);
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
   content = 
    <MTable 
    title="JSON Placeholder"
    columns={this.state.columns}
    data={this.state.data}
    />

  }

  return (
    <div>
    
      <Maps
     google={this.props.google}
     center={{lat: -7.790073587756385, lng: 110.36041300469356}}
     height='300px'
     zoom={15}
    />
    <br/>
    <br/>
      {content}
    </div>
  )
}
}
