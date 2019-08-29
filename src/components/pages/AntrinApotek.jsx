import React from 'react';
import axios from 'axios';
import MTable from 'material-table';
import './Kelolaantrian.css';
import Swal from 'sweetalert2';

export default class AntrinApotek extends React.Component{
    constructor(props){
        super(props);
        this.state={
            loading:false,
            rowKlik:false,

            colAntrian:[
            {title:'Id Antrian Apotek', field:'id_mst_antrian_apotek'},
            {title:'Pasien', field:'mst_resep_obat[0].mst_pasien.name'},
            {title:'Status', field:'status'}
            ],
            dataAntrian:[],

            colSelesai:[
            {title:'Id Antrian Apotek', field:'id_mst_antrian_apotek'},
            {title:'Pasien', field:'mst_resep_obat[0].mst_pasien.name'},
            {title:'Status', field:'status'}
            ],
            dataSelesai:[],

            idAntrianApotek:'',
            idApotek:1,
            idmstantrianpasien:'',
            obat:[]
        }
    }
    fetchdata = () =>{

        const url ='https://zav-wawi.herokuapp.com/api/antrian_apotek/hasprocessed/apotekid=';
        axios.get(url + this.props.id_pengguna)
        .then(response => {
          Swal.hideLoading()
          this.setState({
            dataAntrian: response.data.data,
            loading: false
          });
          // alert(response.data.note);
          // console.log(response.data.data);
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
      })
      .catch(error => {
        console.log(error.response);
      });
     }
     antrianhasreject = (e) =>{
      e.preventDefault();
      const url4 ='https://zav-wawi.herokuapp.com/api/antrian_apotek/picked/id_mst_antrian_apotek=';
      console.log(url4+this.state.idmstantrianpasien);
      axios.get(url4+this.state.idmstantrianpasien)
      .then(response => {
        // console.log(response);
        this.fetchdata();
      })
      .catch(error => {
        console.log(error.response);
      });
     }

     rowClik1 = (e,rowData) => {
      e.preventDefault();
      this.setState({
          idmstantrianpasien: rowData.id_mst_antrian_apotek,
          // namaObat:rowData.nama_obat,
      });
     
    }
    render(){
        let content;
        if(this.state.loading){
            content=Swal.showLoading();
        }else{
            content=
            <div className="row">
            <div className="col-md-6">
                <MTable 
                title="Antrian Resep (Klik Baris Untuk Diproses)"
                columns={this.state.colAntrian}
                data={this.state.dataAntrian}
                onRowClick={this.rowClik1}
                />
            </div>
            <div className="col-md-6">
            <MTable 
                title="Antrian Resep (Sudah Diproses)"
                columns={this.state.colSelesai}
                data={this.state.dataSelesai}
                />
            </div>
        </div>

        }
        return(
        <div>{content}
         <Modal isOpen={this.state.modalup} toggle={this.toggle} className="modal-lg">
          <ModalHeader toggle={this.toggle}><b>Resep Pasien</b></ModalHeader>
         
          <ModalBody>
          <div className="row" id="input2">
                <div className="col-md-7">
                   <TextField
                    name="namaObat"
                    id="outlined-name"
                    label="Nama Obat Baru"
                    fullWidth
                    value={this.state.namaObat}
                    margin="normal"
                    variant="outlined"
                    onChange={this.handleChangeAdd}
                   />
                </div>
                <div className="col-md-4">
                  <div className="select">
                <NativeSelect id="select"
                    value={this.state.idJenis}
                    onChange={this.handleChangeAdd}
                    input={<OutlinedInput name="idJenis" value={this.state.idJenis} fullWidth id="outlined-age-simple"  />}
                            >
                    <option>- Pilih Jenis Obat -</option>
                    {jenis}
                    </NativeSelect>
                </div> </div>            
         </div>
          </ModalBody>
          <ModalFooter>
            <Button type="submit" color="green">Submit</Button>
          </ModalFooter>
       
        </Modal>
          
        </div>
        )
    }
}