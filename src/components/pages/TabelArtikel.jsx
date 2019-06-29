import React from 'react';
import axios from 'axios';


export default class TabelArtikel extends React.Component{
constructor(){
  super();
  this.state = {
  columns: [],
  data: [],
  loading: true
};
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
    content = this.state.data.map(artikel => {
      return (
        <div key={artikel.id_mst_artikel}>
          <p>judul:</p>&nbsp;{artikel.judul_artikel},&nbsp;
          <p>isi:</p>&nbsp;{artikel.isi_artikel}&nbsp;
        </div>
        

      );
    });
  }

  return (
    <div>
      {content}
    </div>
  )
}
}
