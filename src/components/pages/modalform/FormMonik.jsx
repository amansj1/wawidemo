import React, { Component } from 'react';
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';
import { Col, Row, Form, FormGroup, Label, Input} from 'reactstrap';
class FormMonik extends Component {
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
          <br></br>
          <Row form>
           <Col md={3}>
              <Label for="exampleEmail">Id Monik</Label>
              <Input type="email" name="email" id="exampleEmail" placeholder="" />
              </Col>
            
           
        
             <Col md={2}>
            <FormGroup>
              <Label for="exampleEmail">Jam Mulai</Label>
              <Input type="time" name="email" id="exampleEmail" placeholder="" />
            </FormGroup>
          </Col>
        

          <Col md={2}>
            <FormGroup>
              <Label for="examplePassword">Jam Selesai</Label>
              <Input type="time" name="password" id="examplePassword" placeholder="" />
            </FormGroup>
          </Col>

          <Col md={3}>
            <FormGroup>
              <Label for="examplePassword">Tanggal Kegiatan</Label>
              <Input type="date" name="password" id="examplePassword" placeholder="" />
            </FormGroup>
          </Col>

        </Row>

        <FormGroup>
          <Label for="exampleAddress">Kegiatan</Label>
          <Input type="textarea" name="address" id="exampleAddress" placeholder=""/>
        </FormGroup>

        <Row form>
          <Col md={12}>
            <FormGroup>
              <Label for="exampleCity">Foto Monik</Label>
              <Input type="file" name="city" id="exampleCity"/>
            </FormGroup>
          </Col>

          <Col md={8}>
            <FormGroup>
              <Label for="exampleState">Nama Daerah</Label>
              <Input type="text" name="state" id="exampleState"/>
            </FormGroup>
          </Col>

          <Col md={8}>
            <FormGroup>
              <Label for="exampleZip">Alamat Daerah</Label>
              <Input type="textarea" name="zip" id="exampleZip"/>
            </FormGroup>  
          </Col>
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

export default FormMonik;