import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import {
  Box,
  Button,
  Container,
  CssBaseline,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import Tab from "@mui/material/Tab";
import Axios from "axios";
import * as React from "react";
import { useState } from "react";

import "./App.css";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  const [nome, setNome] = useState("");
  const [descrizione, setDescrizione] = useState("");
  const [dataInizio, setDataInizio] = useState("");
  const [dataFine, setDataFine] = useState("");
  const [costo, setCosto] = useState(0);
  const [tipo, setTipo] = useState("");
  const [validita, setValidita] = useState(0);
  const [locazione, setLocazione] = useState("");
  const [capacita, setCapacita] = useState(0);
  const [cf, setCF] = useState("");
  const [cognome, setCognome] = useState("");
  const [indirizzo, setIndirizzo] = useState("");
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("");
  const [ruolo, setRuolo] = useState(0);
  const [stipendio, setStipendio] = useState(0);

  const [abbonamentiList, setAbbonamentiList] = useState([]);
  //const [bigliettiList, setBigliettiList] = useState([]);
  const [giostreList, setGiostreList] = useState([]);
  const [operatoriList, setOperatoriList] = useState([]);

  const [newCosto, setNewCosto] = useState([]);
  const [newTipo, setNewTipo] = useState([]);
  const [newStipendio, setNewStipendio] = useState([]);

  //ui component
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  //end ui component

  const addAbbonamento = async () => {
    await Axios.post("http://localhost:3001/createAbbonamento", {
      nome,
      descrizione,
      dataInizio,
      dataFine,
      costo,
    });
    console.log("success");
  };

  const addBiglietto = async () => {
    await Axios.post("http://localhost:3001/createBiglietto", {
      tipo,
      descrizione,
      costo,
      validita,
    });
    console.log("success");
  };

  const addGiostra = async () => {
    await Axios.post("http://localhost:3001/createGiostra", {
      nome,
      tipo,
      locazione,
      capacita,
      costo,
    });
    console.log("success");
  };

  const addOperatore = async () => {
    await Axios.post("http://localhost:3001/createOperatore", {
      nome,
      cognome,
      indirizzo,
      telefono,
      email,
      ruolo,
      stipendio,
    });
    console.log("success");
  };

  const getAbbonamenti = async () => {
    const response = await Axios.get("http://localhost:3001/abbonamenti");
    setAbbonamentiList(response.data);
  };

  const getBiglietti = async () => {
    const response = await Axios.get("http://localhost:3001/biglietti");
    setAbbonamentiList(response.data);
  };

  const getGiostre = async () => {
    const response = await Axios.get("http://localhost:3001/giostre");
    setGiostreList(response.data);
  };

  const getOperatori = async () => {
    const response = await Axios.get("http://localhost:3001/operatori");
    setOperatoriList(response.data);
  };

  /*const displayInfo = () => {
    console.log(name, age, country, position, salary);
  };*/

  const updateAbbonamenti = (id) => {
    console.log(newCosto);
    console.log("Update clicked for index:", id);
    Axios.put("http://localhost:3001/updateabbonamenti", {
      id: id,
      Costo: newCosto,
    }).then((response) => {
      /*setEmployeeList(
        employeeList.map((val) => {
          return val.id === id
            ? {
                id: val.id,
                name: val.name,
                country: val.country,
                age: val.age,
                position: val.position,
                salary: newSalary,
              }
            : val;
        })
      );*/
      getAbbonamenti();
    });
  };

  const updateBiglietti = (id) => {
    console.log(newCosto);
    console.log("Update clicked for index:", id);
    Axios.put("http://localhost:3001/updatebiglietti", {
      id: id,
      Costo: newCosto,
    }).then((response) => {
      getBiglietti();
    });
  };

  const updateGiostre = (id) => {
    console.log(newCosto);
    console.log("Update clicked for index:", id);
    Axios.put("http://localhost:3001/updategiostre", {
      id: id,
      Tipo: newTipo,
    }).then((response) => {
      getGiostre();
    });
  };

  const updateOperatori = (id) => {
    console.log(newCosto);
    console.log("Update clicked for index:", id);
    Axios.put("http://localhost:3001/updateoperatori", {
      id: id,
      Stipendio: newStipendio,
    }).then((response) => {
      getOperatori();
    });
  };

  const deleteAbbonamenti = (id) => {
    console.log("Cancel clicked for index:", id);
    Axios.delete(`http://localhost:3001/deleteAbbonamenti/${id}`).then(
      (response) => {
        setAbbonamentiList(
          abbonamentiList.filter((val) => {
            return val.idAbbonamento !== id;
          })
        );
      }
    );
  };

  const deleteBiglietti = (id) => {
    console.log("Cancel clicked for index:", id);
    Axios.delete(`http://localhost:3001/deleteBiglietti/${id}`).then(
      (response) => {
        getBiglietti();
      }
    );
  };

  const deleteGiostre = (id) => {
    console.log("Cancel clicked for index:", id);
    Axios.delete(`http://localhost:3001/deleteGiostre/${id}`).then(
      (response) => {
        getGiostre();
      }
    );
  };

  const deleteOperatori = (id) => {
    console.log("Cancel clicked for index:", id);
    Axios.delete(`http://localhost:3001/deleteOperatori/${id}`).then(
      (response) => {
        getOperatori();
      }
    );
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Container maxWidth="x1" className="App">
        <Box sx={{ width: "100%", typography: "body1" }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
              >
                <Tab label="Abbonamento" value="1" />
                <Tab label="Biglietto" value="2" />
                <Tab label="Giostra" value="3" />
                <Tab label="Operatore" value="4" />
              </TabList>
            </Box>
            <TabPanel value="1">
              {" "}
              <Box mt={2}>
                <Typography variant="h6" gutterBottom>
                  Abbonamento
                </Typography>
                <TextField
                  label="Nome"
                  fullWidth
                  value={nome}
                  onChange={(event) => setNome(event.target.value)}
                  style={{ marginBottom: "8px" }}
                />
                <TextField
                  label="Descrizione"
                  fullWidth
                  value={descrizione}
                  onChange={(event) => setDescrizione(event.target.value)}
                  style={{ marginBottom: "8px" }}
                />
                <TextField
                  label="DataInizio"
                  fullWidth
                  value={dataInizio}
                  onChange={(event) => setDataInizio(event.target.value)}
                  style={{ marginBottom: "8px" }}
                />
                <TextField
                  label="DataFine"
                  fullWidth
                  value={dataFine}
                  onChange={(event) => setDataFine(event.target.value)}
                  style={{ marginBottom: "8px" }}
                />
                <TextField
                  label="Costo"
                  type="number"
                  fullWidth
                  value={costo}
                  onChange={(event) => setCosto(event.target.value)}
                  style={{ marginBottom: "8px" }}
                />
                <Button variant="contained" onClick={addAbbonamento}>
                  Aggiungi Abbonamento
                </Button>
              </Box>
              <hr />
              <Box mt={2}>
                <Button variant="contained" onClick={getAbbonamenti}>
                  Leggi Abbonamenti
                </Button>
                <TableContainer maxWidth="xl" class="table">
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Nome</TableCell>
                        <TableCell>Descrizione</TableCell>
                        <TableCell>Data Inizio</TableCell>
                        <TableCell>Data Fine</TableCell>
                        <TableCell>Costo</TableCell>
                        <TableCell>Actions</TableCell>
                        <TableCell>Update</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {abbonamentiList.map((val, index) => (
                        <TableRow key={index}>
                          <TableCell>{val.Nome}</TableCell>
                          <TableCell>{val.Descrizione}</TableCell>
                          <TableCell>{val.DataInizio}</TableCell>
                          <TableCell>{val.DataFine}</TableCell>
                          <TableCell>{val.Costo}</TableCell>
                          <TableCell>
                            <Button
                              variant="contained"
                              onClick={() =>
                                updateAbbonamenti(val.idAbbonamento)
                              }
                            >
                              Update
                            </Button>
                            <Button
                              variant="contained"
                              onClick={() =>
                                deleteAbbonamenti(val.idAbbonamento)
                              }
                            >
                              Delete
                            </Button>
                          </TableCell>
                          <TableCell>
                            <TextField
                              type="text"
                              onChange={(event) =>
                                setNewCosto(event.target.value)
                              }
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            </TabPanel>
            <TabPanel value="2">
              {" "}
              <Box mt={2}>
                <Typography variant="h6" gutterBottom>
                  Biglietto
                </Typography>
                <TextField
                  label="Tipo"
                  fullWidth
                  value={tipo}
                  onChange={(event) => setTipo(event.target.value)}
                  style={{ marginBottom: "8px" }}
                />
                <TextField
                  label="Descrizione"
                  fullWidth
                  value={descrizione}
                  onChange={(event) => setDescrizione(event.target.value)}
                  style={{ marginBottom: "8px" }}
                />
                <TextField
                  label="Costo"
                  fullWidth
                  value={costo}
                  onChange={(event) => setCosto(event.target.value)}
                  style={{ marginBottom: "8px" }}
                />
                <TextField
                  label="Validita"
                  fullWidth
                  value={validita}
                  onChange={(event) => setValidita(event.target.value)}
                  style={{ marginBottom: "8px" }}
                />
                <Button variant="contained" onClick={addBiglietto}>
                  Aggiungi Biglietto
                </Button>
              </Box>
              <hr />
              <Box mt={2}>
                <Button variant="contained" onClick={getBiglietti}>
                  Leggi Biglietti
                </Button>
                <TableContainer maxWidth="xl" class="table">
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Tipo</TableCell>
                        <TableCell>Descrizione</TableCell>
                        <TableCell>Costo</TableCell>
                        <TableCell>Validita</TableCell>
                        <TableCell>Actions</TableCell>
                        <TableCell>Update</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {abbonamentiList.map((val, index) => (
                        <TableRow key={index}>
                          <TableCell>{val.Tipo}</TableCell>
                          <TableCell>{val.Descrizione}</TableCell>
                          <TableCell>{val.Costo}</TableCell>
                          <TableCell>{val.Validita}</TableCell>
                          <TableCell>
                            <Button
                              variant="contained"
                              onClick={() => updateBiglietti(val.idBiglietto)}
                            >
                              Update
                            </Button>
                            <Button
                              variant="contained"
                              onClick={() => deleteBiglietti(val.idBiglietto)}
                            >
                              Delete
                            </Button>
                          </TableCell>
                          <TableCell>
                            <TextField
                              type="text"
                              onChange={(event) =>
                                setNewCosto(event.target.value)
                              }
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            </TabPanel>
            <TabPanel value="3">
              {" "}
              <Box mt={2}>
                <Typography variant="h6" gutterBottom>
                  Giostra
                </Typography>
                <TextField
                  label="Nome"
                  fullWidth
                  value={nome}
                  onChange={(event) => setNome(event.target.value)}
                  style={{ marginBottom: "8px" }}
                />
                <TextField
                  label="Tipo"
                  fullWidth
                  value={tipo}
                  onChange={(event) => setTipo(event.target.value)}
                  style={{ marginBottom: "8px" }}
                />
                <TextField
                  label="Locazione"
                  fullWidth
                  value={locazione}
                  onChange={(event) => setLocazione(event.target.value)}
                  style={{ marginBottom: "8px" }}
                />
                <TextField
                  label="Capacita"
                  fullWidth
                  value={capacita}
                  onChange={(event) => setCapacita(event.target.value)}
                  style={{ marginBottom: "8px" }}
                />
                <Button variant="contained" onClick={addGiostra}>
                  Aggiungi Giostra
                </Button>
              </Box>
              <hr />
              <Box mt={2}>
                <Button variant="contained" onClick={getGiostre}>
                  Leggi Giostre
                </Button>
                <TableContainer maxWidth="xl" class="table">
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Nome</TableCell>
                        <TableCell>Tipo</TableCell>
                        <TableCell>Locazione</TableCell>
                        <TableCell>Capacita</TableCell>
                        <TableCell>Actions</TableCell>
                        <TableCell>Update</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {giostreList.map((val, index) => (
                        <TableRow key={index}>
                          <TableCell>{val.Nome}</TableCell>
                          <TableCell>{val.Tipo}</TableCell>
                          <TableCell>{val.Locazione}</TableCell>
                          <TableCell>{val.Capacita}</TableCell>
                          <TableCell>
                            <Button
                              variant="contained"
                              onClick={() => updateGiostre(val.idGiostra)}
                            >
                              Update
                            </Button>
                            <Button
                              variant="contained"
                              onClick={() => deleteGiostre(val.idGiostra)}
                            >
                              Delete
                            </Button>
                          </TableCell>
                          <TableCell>
                            <TextField
                              type="text"
                              onChange={(event) =>
                                setNewTipo(event.target.value)
                              }
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            </TabPanel>
            <TabPanel value="4">
              {" "}
              <Box mt={2}>
                <Typography variant="h6" gutterBottom>
                  Giostra
                </Typography>
                <TextField
                  label="Codice Fiscale"
                  fullWidth
                  value={cf}
                  pattern="^[a-zA-Z]{6}[0-9]{2}[a-zA-Z][0-9]{2}[a-zA-Z][0-9]{3}[a-zA-Z]$"
                  onChange={(event) => setCF(event.target.value)}
                  style={{ marginBottom: "8px" }}
                />
                <TextField
                  label="Cognome"
                  fullWidth
                  value={cognome}
                  onChange={(event) => setCognome(event.target.value)}
                  style={{ marginBottom: "8px" }}
                />
                <TextField
                  label="Nome"
                  fullWidth
                  value={nome}
                  onChange={(event) => setNome(event.target.value)}
                  style={{ marginBottom: "8px" }}
                />
                <TextField
                  label="Domicilio"
                  fullWidth
                  type="address"
                  value={indirizzo}
                  onChange={(event) => setIndirizzo(event.target.value)}
                  style={{ marginBottom: "8px" }}
                />
                <TextField
                  label="Recapito telefonico"
                  fullWidth
                  value={telefono}
                  onChange={(event) => setTelefono(event.target.value)}
                  style={{ marginBottom: "8px" }}
                />
                <TextField
                  label="Email"
                  fullWidth
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  style={{ marginBottom: "8px" }}
                />
                <TextField
                  label="Ruolo"
                  fullWidth
                  type="number"
                  value={ruolo}
                  onChange={(event) => setRuolo(event.target.value)}
                  style={{ marginBottom: "8px" }}
                />
                <TextField
                  label="Stipendio"
                  fullWidth
                  type="number"
                  value={stipendio}
                  onChange={(event) => setStipendio(event.target.value)}
                  style={{ marginBottom: "8px" }}
                />
                <Button variant="contained" onClick={addOperatore}>
                  Aggiungi Operatore
                </Button>
              </Box>
              <hr />
              <Box mt={2}>
                <Button variant="contained" onClick={getOperatori}>
                  Leggi Operatori
                </Button>
                <TableContainer maxWidth="xl" class="table">
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Codice Fiscale</TableCell>
                        <TableCell>Cognome</TableCell>
                        <TableCell>Nome</TableCell>
                        <TableCell>Indirizzo</TableCell>
                        <TableCell>Recapito telefonico</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Ruolo</TableCell>
                        <TableCell>Stipendio</TableCell>
                        <TableCell>Actions</TableCell>
                        <TableCell>Update</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {operatoriList.map((val, index) => (
                        <TableRow key={index}>
                          <TableCell>{val.CF}</TableCell>
                          <TableCell>{val.Cognome}</TableCell>
                          <TableCell>{val.Nome}</TableCell>
                          <TableCell>{val.Indirizzo}</TableCell>
                          <TableCell>{val.NumTelefono}</TableCell>
                          <TableCell>{val.Email}</TableCell>
                          <TableCell>{val.Ruolo}</TableCell>
                          <TableCell>{val.Stipendio}</TableCell>
                          <TableCell>
                            <Button
                              variant="contained"
                              onClick={() => updateOperatori(val.idOperatore)}
                            >
                              Update
                            </Button>
                            <Button
                              variant="contained"
                              onClick={() => deleteOperatori(val.idOperatore)}
                            >
                              Delete
                            </Button>
                          </TableCell>
                          <TableCell>
                            <TextField
                              type="text"
                              onChange={(event) =>
                                setNewStipendio(event.target.value)
                              }
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            </TabPanel>
          </TabContext>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;
