import React from 'react';
import axios from 'axios';
import Tabeljs from './Tabeljs';

export default class TabelArtikel extends React.Component{
constructor(){
  super();
  this.state ={
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
   content = <Tabeljs data1={this.data}/>
  }

  return (
    <div>
      {content}
    </div>
  )
}
}
