import React from 'react';
import axios from 'axios';
import MTable from 'material-table';
import './Kelolaantrian.css';
import Swal from 'sweetalert2';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';


export default class AntrinApotek extends React.Component{
    constructor(props){
        super(props);
        this.state={
            loading:true,
            modalup:false,
            modalup2:false,
            rowKlik:false,

            colAntrian:[
            {title:'Id Antrian Apotek', field:'id_mst_antrian_apotek'},
            {title:'Pasien', field:'mst_resep_obat.mst_pasien.name'},
            {title:'Jenis Kelamin', field:'mst_resep_obat.mst_pasien.gender'}
            ],
            dataAntrian:[],

            colSelesai:[
            {title:'Id Antrian Apotek', field:'id_mst_antrian_apotek'},
            {title:'Pasien', field:'mst_resep_obat.mst_pasien.name'},
            {title:'Jenis Kelamin', field:'mst_resep_obat.mst_pasien.gender'}
            ],
            dataSelesai:[],

            colreject:[
              {title:'Id Antrian Apotek', field:'id_mst_antrian_apotek'},
              {title:'Pasien', field:'mst_resep_obat.mst_pasien.name'},
              {title:'Jenis Kelamin', field:'mst_resep_obat.mst_pasien.gender'}
              ],
              dataReject:[],

            idAntrianApotek:'',
            idApotek:1,
            idmstantrianpasien:'',
            obat:[],
            colObat:[
              {title:'Nama Obat', field:'mst_nrm_opol.mst_obat.nama_obat'},
              {title:'Takaran', field:'takaran_obat'},
              {title:'Harga', field:'mst_nrm_opol.harga_obat'}
            ],
            namapasien:''
        }
        this.toggle = this.toggle.bind(this);
        this.toggle2 = this.toggle2.bind(this);
    }
    toggle() {
      this.setState(prevState => ({
        modalup: !prevState.modalup    
      }));
  };
  toggle2() {
    this.setState(prevState => ({
      modalup2: !prevState.modalup2    
    }));
};
    fetchdata = () =>{
      Swal.showLoading();

        const url ='https://zav-wawi.herokuapp.com/api/antrian_apotek/hasprocessed/apotekid=';
        axios.get(url + this.props.id_pengguna)
        .then(response => {
          Swal.fire(
            'Connected!',
            'Loading Selesai',
            'success'
          )
          this.setState({
            dataAntrian: response.data.data,
            loading: false
          });
          // alert(response.data.note);
          console.log(response.data.data);
        })
        .catch(error => {
        //  alert(error);
        });
    
    
        const url1 ='https://zav-wawi.herokuapp.com/api/antrian_apotek/haspicked/apotekid=';
        axios.get(url1 + this.props.id_pengguna)
        .then(response => {
          this.setState({
            dataSelesai: response.data.data,
            loading: false
          });
          // alert(response.data.note);
          console.log(response.data.data);
        })
        .catch(error => {
          // alert(error.response);
        });

        const url2 ='https://zav-wawi.herokuapp.com/api/antrian_apotek/hasrejected/apotekid=';
        axios.get(url2 + this.props.id_pengguna)
        .then(response => {
          this.setState({
            dataReject: response.data.data,
      
          });
          
          // alert(response.data.note);
          console.log(response.data.data);
        })
        .catch(error => {
          // alert(error.response);
        });
    }

    componentDidMount(){
        this.fetchdata();
     
     }
  

     submit=()=>{
       
      

     }

     antrianhasproses = (e) =>{
      e.preventDefault();
      const url4 ='https://zav-wawi.herokuapp.com/api/antrian_apotek/picked/id_mst_antrian_apotek=';
      console.log(url4+this.state.idmstantrianpasien);
      axios.get(url4+this.state.idmstantrianpasien)
      .then(response => {
        // console.log(response);
        this.fetchdata();
        this.toggle();
      })
      .catch(error => {
        console.log(error.response);
      });
     }
     antrianhasreject = (e) =>{
      e.preventDefault();
      const url4 ='https://zav-wawi.herokuapp.com/api/antrian_apotek/rejected/id_mst_antrian_apotek=';
      console.log(url4+this.state.idmstantrianpasien);
      axios.get(url4+this.state.idmstantrianpasien)
      .then(response => {
        // console.log(response);
        this.fetchdata();
        this.toggle();
      })
      .catch(error => {
        console.log(error.response);
      });
     }

     rowClik1 = (e,rowData) => {
      e.preventDefault();
      this.setState({
          idmstantrianpasien: rowData.id_mst_antrian_apotek,
          namapasien:rowData.mst_resep_obat.mst_pasien.name,
          obat:rowData.mst_resep_obat.trans_obat,
      });    
      this.toggle();
     
    }
    rowClik2 = (e,rowData) => {
      e.preventDefault();
      this.setState({
          idmstantrianpasien: rowData.id_mst_antrian_apotek,
          namapasien:rowData.mst_resep_obat.mst_pasien.name,
          obat:rowData.mst_resep_obat.trans_obat,
      });    
      this.toggle2();
     
    }
    render(){
        let content;
        if(this.state.loading){
            content=Swal.showLoading();
        }else{
            content=
            <div>
            <div className="row">
            <div className="col-md-12">
                <MTable 
                title="Antrian Resep (Klik Baris Untuk Diproses)"
                columns={this.state.colAntrian}
                data={this.state.dataAntrian}
                onRowClick={this.rowClik1}
                />
            </div>
            </div>
            <br/>
            <div className="row">
                 <div className="col-md-6">
                  <MTable 
                title="Antrian Resep (Sudah Diproses)"
                columns={this.state.colSelesai}
                data={this.state.dataSelesai}
                onRowClick={this.rowClik2}
                />
                </div>
                <div className="col-md-6">
                  <MTable 
                title="Antrian Resep (Reject Resep)"
                columns={this.state.colreject}
                data={this.state.dataReject}
                onRowClick={this.rowClik2}
                />
            </div>
            </div>
           </div>
        

        }
        return(
        <div>{content}
         <Modal isOpen={this.state.modalup} toggle={this.toggle} className="modal-lg">
          <ModalHeader toggle={this.toggle}><b>Resep Pasien </b> {this.state.namapasien}</ModalHeader>
          <ModalBody>
          <MTable 
                title="Daftar Obat"
                columns={this.state.colObat}
                data={this.state.obat}
                />
          </ModalBody>
          <ModalFooter>
          <Button type="button" color="red" onClick={this.antrianhasreject} >Reject Resep </Button>
          <Button type="button" color="green" onClick={this.antrianhasproses} >Resep Selesai </Button>
          
          </ModalFooter>
       
        </Modal>
        <Modal isOpen={this.state.modalup2} toggle={this.toggle2} className="modal-lg">
          <ModalHeader toggle={this.toggle2}><b>Resep Pasien </b> {this.state.namapasien}</ModalHeader>
          <ModalBody>
          <MTable 
                title="Daftar Obat"
                columns={this.state.colObat}
                data={this.state.obat}
                />
          </ModalBody>
          <ModalFooter>          
          </ModalFooter>
       
        </Modal>
          
        </div>
        )
    }
}