import React, { Component } from 'react';
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';
import { Col, Row, Form, FormGroup, Label, Input } from 'reactstrap';
class FormArtikel extends Component {
state = {
  modal: false
}

toggle = () => {
  this.setState({
    modal: !this.state.modal
  });
}

render() {
  return (
    <MDBContainer>
      <MDBBtn onClick={this.toggle}>Tambah Data</MDBBtn>
      <MDBModal isOpen={this.state.modal} toggle={this.toggle} size="lg">
        <MDBModalHeader toggle={this.toggle}>Form Tambah Data Monik</MDBModalHeader>
        <MDBModalBody>
        <Form> 
        <Row form>
          <FormGroup>
             <Label for="">Judul Artikel</Label>
             <Input type="text" name="" id="" placeholder=""  />
          

          
         <Label for="">Isi Artikel</Label>
         <Input type="textarea" name="" id="" placeholder=""/>
       

         <Col md={5}>
             <Label for="">Tanggal </Label>
             <Input type="date" name="" id="" placeholder="" />
             </Col>
           </FormGroup>
        

   
     
         
           
             <Label for="exampleCity">Foto Artikel</Label>
             <Input type="file" name="city" id="exampleCity"/>
       
        

         <FormGroup>
         <Label for="exampleSelect">Kategori</Label>
         <Input type="select" name="select" id="exampleSelect">
           <option>Ibu dan Anak</option>
           <option>Info Penyakit</option>
           <option>Obat Herbal</option>
           <option>Berita Terbaru</option>
           <option>Lainya</option>
         </Input>
       </FormGroup>
       </Row>

     
         </Form>
        </MDBModalBody>
        <MDBModalFooter>
          <MDBBtn color="secondary" onClick={this.toggle}>Close</MDBBtn>
          <MDBBtn color="primary">Save changes</MDBBtn>
        </MDBModalFooter>
      </MDBModal>
    </MDBContainer>
    );
  }
}

export default FormArtikel;