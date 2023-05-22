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
import Axios from "axios";
import { useState } from "react";

import "./App.css";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [country, setCountry] = useState("");
  const [position, setPosition] = useState("");
  const [salary, setSalary] = useState(0);
  const [employeeList, setEmployeeList] = useState([]);

  const addEmployee = async () => {
    await Axios.post("http://localhost:3001/create", {
      name,
      age,
      country,
      position,
      salary,
    });
    console.log("success");
  };

  const getEmployees = async () => {
    const response = await Axios.get("http://localhost:3001/employees");
    setEmployeeList(response.data);
  };

  const displayInfo = () => {
    console.log(name, age, country, position, salary);
  };

  const handleUpdate = (index) => {
    console.log("Update clicked for index:", index);
  };

  const handleCancel = (index) => {
    console.log("Cancel clicked for index:", index);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Container className="App">
        <Box mt={2}>
          <Typography variant="h6" gutterBottom>
            Add Employee
          </Typography>
          <TextField
            label="Name"
            fullWidth
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          <TextField
            label="Age"
            type="number"
            fullWidth
            value={age}
            onChange={(event) => setAge(event.target.value)}
          />
          <TextField
            label="Country"
            fullWidth
            value={country}
            onChange={(event) => setCountry(event.target.value)}
          />
          <TextField
            label="Position"
            fullWidth
            value={position}
            onChange={(event) => setPosition(event.target.value)}
          />
          <TextField
            label="Salary (year)"
            type="number"
            fullWidth
            value={salary}
            onChange={(event) => setSalary(event.target.value)}
          />
          <Button variant="contained" onClick={addEmployee}>
            Add Employee
          </Button>
        </Box>
        <hr />
        <Box mt={2}>
          <Button variant="contained" onClick={getEmployees}>
            Show Employees
          </Button>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Age</TableCell>
                  <TableCell>Country</TableCell>
                  <TableCell>Position</TableCell>
                  <TableCell>Salary</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {employeeList.map((val, index) => (
                  <TableRow key={index}>
                    <TableCell>{val.Name}</TableCell>
                    <TableCell>{val.Age}</TableCell>
                    <TableCell>{val.Country}</TableCell>
                    <TableCell>{val.Position}</TableCell>
                    <TableCell>{val.Salary}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        onClick={() => handleUpdate(index)}
                      >
                        Update
                      </Button>
                      <Button
                        variant="contained"
                        onClick={() => handleCancel(index)}
                      >
                        Cancel
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;
