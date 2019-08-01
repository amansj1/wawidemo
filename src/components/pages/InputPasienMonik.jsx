import React from 'react';
// import axios from 'axios';

import { Button} from 'reactstrap';
import TextField from '@material-ui/core/TextField';

import NativeSelect from '@material-ui/core/NativeSelect';

import Paper from '@material-ui/core/Paper';
import './InputPasienMonik.css';
import { OutlinedInput } from '@material-ui/core';

export default class InputPasienMonik extends React.Component{
    constructor(props){
        super(props);
        this.state={
            nik:'',
            nama:'',
            tgl:'',
            pekerjaan:'',
            pendidikan:'',
            alamat:'',
            jk:'',
            tinggi:'',
            berat:'',
            asamurat:'',
            guladarah:'',
            koles:'',
            tekanandarah:''

        }
    }
    handleSubmit(e){
        e.preventDefault();
        this.resetstate();  
    }

    handleChangeAdd = event =>{
        this.setState({[event.target.name]: event.target.value})
    }

    
    
    
    render(){

        return(
            <Paper className="paper">
                <div className="formpad">
                    <h3 className="MuiTypography-root MuiTypography-h6"><b>Tambah Pasien Monik</b></h3><br/>
                    <form method="post" onSubmit ={(e) => this.handleSubmit(e)}  >
                       
                        <div className="col-md-4">
                        <TextField
                        name="nik"
                        id="outlined-name"
                        label="NIK"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        onChange={this.handleChangeAdd}
                        /> 
                        </div> 
                        <div className="row" id="input2">
                            <div className="col-md-6">
                            <TextField
                            name="nama"
                            id="outlined-name"
                            label="Nama Pasien"
                            fullWidth
                            margin="normal"
                            variant="outlined"
                            onChange={this.handleChangeAdd}
                            />
                            </div>
                            <div className="col-md-4">
                            <TextField
                            name="pekerjaan"
                            id="outlined-name"
                            label="Pekerjaan"
                            fullWidth
                            margin="normal"
                            variant="outlined"
                            onChange={this.handleChangeAdd}
                            />
                            </div>
                           
                      </div>
                      <div className="row" id="input2">
                      <div className="col-md-3">
                            
                            <NativeSelect id="select"
                                value={this.state.jk}
                                onChange={this.handleChangeAdd}
                                input={<OutlinedInput name="jk" value={this.state.jk} fullWidth id="outlined-age-simple"  />}
                            >
                                <option>- Pilih Jenis Kelamin -</option>
                                <option value='Laki-laki'>Laki-laki</option>
                                <option value='Perempuan'>Perempuan</option>

                            </NativeSelect>
                            </div>
                      <div className="col-md-3">
                        <TextField
                            id="date"
                            name="tgl"
                            label="Tanggal Lahir"
                            type="date"
                            fullWidth
                            variant="outlined"
                            value={this.state.tgl}
                            defaultValue="2019-05-24"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange={this.handleChangeAdd}
                            />
                            </div>
                            <div className="col-md-4">
                            <NativeSelect id="select"
                                value={this.state.pendidikan}
                                onChange={this.handleChangeAdd}
                                input={<OutlinedInput name="pendidikan" value={this.state.pendidikan} fullWidth id="outlined-age-simple"  />}
                            >
                                <option>- Pilih Tingkat Pendidikan -</option>
                                <option value='SD'>SD</option>
                                <option value='SMP'>SMP</option>
                                <option value='SMA'>SMA</option>
                                <option value='Sarjana'>Sarjana</option>
                                <option value='Magister'>Magister</option>
                            </NativeSelect>
                            </div>
                        </div>
                        <div className="row" id="input2">
                            <div className="col-md-12">
                                <TextField
                                name="alamat"
                                id="outlined-name"
                                label="Alamat"
                                fullWidth
                                margin="normal"
                                variant="outlined"
                                onChange={this.handleChangeAdd}
                                />
                            </div>
                        </div>
                        <div className="row" id="input2">
                            <div className="col-md-2">
                                    <TextField
                                    name="tinggi"
                                    id="outlined-name"
                                    label="Tinggi Badan"
                                    fullWidth
                                    margin="normal"
                                    variant="outlined"
                                    onChange={this.handleChangeAdd}
                                    />
                            </div>
                            <div className="col-md-2">
                                    <TextField
                                    name="berat"
                                    id="outlined-name"
                                    label="Berat Badan"
                                    fullWidth
                                    margin="normal"
                                    variant="outlined"
                                    onChange={this.handleChangeAdd}
                                    />
                            </div>
                            <div className="col-md-2">
                                    <TextField
                                    name="tekanandarah"
                                    id="outlined-name"
                                    label="Tekanan Darah"
                                    fullWidth
                                    margin="normal"
                                    variant="outlined"
                                    onChange={this.handleChangeAdd}
                                    />
                            </div>
                            <div className="col-md-2">
                                    <TextField
                                    name="asamurat"
                                    id="outlined-name"
                                    label="Asam Urat"
                                    fullWidth
                                    margin="normal"
                                    variant="outlined"
                                    onChange={this.handleChangeAdd}
                                    />
                            </div>
                            <div className="col-md-2">
                                    <TextField
                                    name="guladarah"
                                    id="outlined-name"
                                    label="Gula Darah"
                                    fullWidth
                                    margin="normal"
                                    variant="outlined"
                                    onChange={this.handleChangeAdd}
                                    />
                            </div>
                            <div className="col-md-2">
                                    <TextField
                                    name="koles"
                                    id="outlined-name"
                                    label="Kolesterol"
                                    fullWidth
                                    margin="normal"
                                    variant="outlined"
                                    onChange={this.handleChangeAdd}
                                    />
                            </div>
                        </div>
                        <br/>
                        <div className="put1">
                        <Button type="submit" color="green" >Submit</Button>
                        </div>
                    </form>
                </div>
            </Paper>
        )
    }
}

