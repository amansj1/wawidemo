import React from 'react';
import { MDBDataTable } from 'mdbreact';
import { MDBRow, MDBCol, MDBView, MDBCard, MDBCardBody} from 'mdbreact';
import FormM from './modalform/FormArtikel';
import './TabelArtikel.css';


var TabelArtikel = () => {
  var data = {
    columns: [
      {
        label: 'Judul Artikel',
        field: 'judul',
        sort: 'asc',
        width: 100
      },
      {
        label: 'Isi Artikel',
        field: 'isi_artikel',
        sort: 'asc',
        width: 50
      },
      {
        label: 'Tanggal',
        field: 'date',
        sort: 'asc',
        width: 150
      },
      {
        label: 'Kategori',
        field: 'kategori',
        sort: 'asc',
        width: 100
      },
      {
        label: 'Aksi',
        field: 'aksi',
        sort: 'asc',
        width: 100
      }
    ],
    rows: [
      {
        judul: 'Tips sehat dummy data',
        isi_artikel: 'ini dummy data untuk artikel',
        date: '2011/04/25',
        kategori: 'Ibu dan Anak'
      },
     
      
    ]
  };
  function handleClick(e) {
    e.preventDefault();
    console.log('The link was clicked.');
  }

  return (

    <MDBRow>
        <MDBCol md="12">
            <MDBCard className="mt-5">
                <MDBView className="header">
                <center><h2 className="text-white">Artikel</h2></center>
                </MDBView>
                
                
                    <MDBCardBody>
                    <FormM />
                        <MDBDataTable
                        striped
                        bordered
                        small
                        data={data}
                        onClick={handleClick}
                        />

                </MDBCardBody>
            </MDBCard>
        </MDBCol>
    </MDBRow>

  );
}

export default TabelArtikel;