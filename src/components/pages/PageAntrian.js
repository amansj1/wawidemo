import React from 'react';
import { MDBRow } from 'mdbreact';
import AdminCardSection from './sectionAntri/AdminCardSection8';
// import AdminCardSection2 from './sectionAntrian/AdminCardSection2';
import TableSection from './sectionAntri/TableSection8';
import BreadcrumSection from './sectionAntri/BreadcrumSection8';
import ChartSection from './sectionAntri/ChartSection8';
// import ChartSection2 from './sectionAntrian/ChartSection2';
import MapSection from './sectionAntri/MapSection8';
import ModalSection from './sectionAntri/ModalSection8';

const DashboardPage =  () => {
  return (
    <React.Fragment>
      <BreadcrumSection />
      <AdminCardSection />
      {/* <ChartSection /> */}
      <TableSection />
      {/* <ChartSection /> */}
      
    </React.Fragment>
  )
}

export default DashboardPage;