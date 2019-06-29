import React from 'react';
import { MDBCard, MDBIcon, MDBRow, MDBCol } from 'mdbreact';

const AdminCardSection = () => {
  return (
    <MDBRow className="mb-4">
        <MDBCol xl="3" md="6" className="mb-r">
          <MDBCard className="cascading-admin-card">
              <div className="admin-up">
              <MDBIcon icon="male" className="primary-color"/>
                <div className="data">
                  <h4>Pria</h4>
                  <h4>
                    <strong>Jumlah : 100</strong> 
                  </h4>
                </div>
              </div>
              
            </MDBCard>
        </MDBCol>
        <MDBCol xl="3" md="6" className="mb-r">
          <MDBCard className="cascading-admin-card">
              <div className="admin-up">
              <MDBIcon icon="female" className="warning-color"/>
                <div className="data">
                <h4>Wanita</h4>
                  <h4>
                    <strong>Jumlah : 40</strong>
                  </h4>
                </div>
              </div>
             
            </MDBCard>
        </MDBCol>
        <MDBCol xl="3" md="6" className="mb-r">
          <MDBCard className="cascading-admin-card">
              <div className="admin-up">
              <MDBIcon icon="child" className="light-blue lighten-1"/>
                <div className="data">
                <h4>Anak</h4>
                  <h4>
                    <strong>Jumlah : 200</strong>
                  </h4>
                </div>
              </div>
              
            </MDBCard>
        </MDBCol>
        <MDBCol xl="3" md="6" className="mb-r">
          <MDBCard className="cascading-admin-card">
              <div className="admin-up">
              <MDBIcon icon="wheelchair " className="red accent-2"/>
                <div className="data">
                <h4>Lansia</h4>
                  <h4>
                    <strong>Jumlah : 10</strong>
                  </h4>
                </div>
              </div>
              
            </MDBCard>
        </MDBCol>
      </MDBRow>
  )
}

export default AdminCardSection;

