import React from 'react';
import AdminCardSection from './sectionAntri/AdminCardSection8';
import TableSection from './sectionAntri/TableSection8';
import BreadcrumSection from './sectionAntri/BreadcrumSection8';


const DashboardPage =  () => {
  return (
    <React.Fragment>
      <BreadcrumSection />
      <AdminCardSection />

      <TableSection />

      
    </React.Fragment>
  )
}

export default DashboardPage;