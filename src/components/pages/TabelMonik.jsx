import React from 'react';
import { MDBDataTable } from 'mdbreact';
import { MDBRow, MDBCol, MDBView, MDBCard, MDBCardBody} from 'mdbreact';
import FormM from './modalform/FormMonik';


var TabelMonik = () => {
  var data = {
    columns: [
      {
        label: 'ID',
        field: 'id_monik',
        sort: 'asc',
        width: 100
      },
      {
        label: 'Jam Mulai',
        field: 'jam_mulai',
        sort: 'asc',
        width: 50
      },
      {
        label: 'Jam Selesai',
        field: 'jam_selesai',
        sort: 'asc',
        width: 50
      },
      {
        label: 'Kegiatan',
        field: 'kegiatan',
        sort: 'asc',
        width: 150
      },
      {
        label: 'Tanggal',
        field: 'date',
        sort: 'asc',
        width: 150
      },
      {
        label: 'Nama Daerah',
        field: 'nama_daerah',
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
        id_monik: '77200',
        jam_mulai: '07.00',
        jam_selesai: '09.00',
        kegiatan: 'Data dummy untuk monik',
        date: '2011/04/25',
        nama_daerah: 'Kulon Progo, Jawa Tengah'
      },
      {
        id_monik: '77200',
        jam_mulai: '07.00',
        jam_selesai: '09.00',
        kegiatan: 'Data dummy untuk monik',
        date: '2011/04/25',
        nama_daerah: 'Kulon Progo, Jawa Tengah'
      },
      {
        id_monik: '77200',
        jam_mulai: '07.00',
        jam_selesai: '09.00',
        kegiatan: 'Data dummy untuk monik',
        date: '2011/04/25',
        nama_daerah: 'Kulon Progo, Jawa Tengah'
      },
      {
        id_monik: '77200',
        jam_mulai: '07.00',
        jam_selesai: '09.00',
        kegiatan: 'Data dummy untuk monik',
        date: '2011/04/25',
        nama_daerah: 'Kulon Progo, Jawa Tengah'
      },
      {
        id_monik: '77200',
        jam_mulai: '07.00',
        jam_selesai: '09.00',
        kegiatan: 'Data dummy untuk monik',
        date: '2011/04/25',
        nama_daerah: 'Kulon Progo, Jawa Tengah'
      },
      {
        id_monik: '77200',
        jam_mulai: '07.00',
        jam_selesai: '09.00',
        kegiatan: 'Data dummy untuk monik',
        date: '2011/04/25',
        nama_daerah: 'Kulon Progo, Jawa Tengah'
      },
      {
        id_monik: '77200',
        jam_mulai: '07.00',
        jam_selesai: '09.00',
        kegiatan: 'Data dummy untuk monik',
        date: '2011/04/25',
        nama_daerah: 'Kulon Progo, Jawa Tengah'
      },
      {
        id_monik: '77200',
        jam_mulai: '07.00',
        jam_selesai: '09.00',
        kegiatan: 'Data dummy untuk monik',
        date: '2011/04/25',
        nama_daerah: 'Kulon Progo, Jawa Tengah'
      },
      {
        id_monik: '77200',
        jam_mulai: '07.00',
        jam_selesai: '09.00',
        kegiatan: 'Data dummy untuk monik',
        date: '2011/04/25',
        nama_daerah: 'Kulon Progo, Jawa Tengah'
      },
      {
        id_monik: '77200',
        jam_mulai: '07.00',
        jam_selesai: '09.00',
        kegiatan: 'Data dummy untuk monik',
        date: '2011/04/25',
        nama_daerah: 'Kulon Progo, Jawa Tengah'
      },
      {
        id_monik: '77200',
        jam_mulai: '07.00',
        jam_selesai: '09.00',
        kegiatan: 'Data dummy untuk monik',
        date: '2011/04/25',
        nama_daerah: 'Kulon Progo, Jawa Tengah'
      },
      {
        id_monik: '77200',
        jam_mulai: '07.00',
        jam_selesai: '09.00',
        kegiatan: 'Data dummy untuk monik',
        date: '2011/04/25',
        nama_daerah: 'Kulon Progo, Jawa Tengah'
      },
      {
        id_monik: '77200',
        jam_mulai: '07.00',
        jam_selesai: '09.00',
        kegiatan: 'Data dummy untuk monik',
        date: '2011/04/25',
        nama_daerah: 'Kulon Progo, Jawa Tengah'
      },
      {
        id_monik: '77200',
        jam_mulai: '07.00',
        jam_selesai: '09.00',
        kegiatan: 'Data dummy untuk monik',
        date: '2011/04/25',
        nama_daerah: 'Kulon Progo, Jawa Tengah'
      },
      {
        id_monik: '77200',
        jam_mulai: '07.00',
        jam_selesai: '09.00',
        kegiatan: 'Data dummy untuk monik',
        date: '2011/04/25',
        nama_daerah: 'Kulon Progo, Jawa Tengah'
      },
      {
        id_monik: '77200',
        jam_mulai: '07.00',
        jam_selesai: '09.00',
        kegiatan: 'Data dummy untuk monik',
        date: '2011/04/25',
        nama_daerah: 'Kulon Progo, Jawa Tengah'
      },

      
    ]
  };

  return (
    <MDBRow>
        <MDBCol md="12">
            <MDBCard className="mt-5">
                <MDBView className="gradient-card-header green darken-2">
                <h4 className="h4-responsive text-white">Kegiatan Monik</h4>
                </MDBView>
                
                
                    <MDBCardBody>
                    <FormM />
                        <MDBDataTable
                        striped
                        bordered
                        small
                        data={data}
                        />
                </MDBCardBody>
            </MDBCard>
        </MDBCol>
    </MDBRow>

  );
}

export default TabelMonik;