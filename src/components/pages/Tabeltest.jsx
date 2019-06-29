import React from 'react';
import axios from 'axios';
import MTable from 'material-table';

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
      {content}
    </div>
  )
}
}
