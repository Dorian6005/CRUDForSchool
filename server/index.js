const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "admin",
  database: "mydb",
});

app.post("/createAbbonamento", (req, res) => {
  const nome = req.body.nome;
  const descrizione = req.body.descrizione;
  const dataInizio = req.body.dataInizio;
  const dataFine = req.body.dataFine;
  const costo = req.body.costo;

  db.query(
    //prepared statement
    "INSERT INTO abbonamento (Nome, Descrizione,DataInizio , DataFine, Costo) VALUES (?, ?, ?, ?, ?)",
    [nome, descrizione, dataInizio, dataFine, costo],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
});

app.post("/createBiglietto", (req, res) => {
  const tipo = req.body.tipo;
  const descrizione = req.body.descrizione;
  const costo = req.body.dataInizio;
  const validita = req.body.validita;

  db.query(
    //prepared statement
    "INSERT INTO biglietto (Tipo, Descrizione,Costo ,Validita) VALUES (?, ?, ?, ?)",
    [tipo, descrizione, costo, validita],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
});

app.post("/createGiostra", (req, res) => {
  const nome = req.body.nome;
  const tipo = req.body.tipo;
  const locazione = req.body.locazione;
  const capacita = req.body.capacita;
  const costo = req.body.costo;

  db.query(
    //prepared statement
    "INSERT INTO giostra (Nome, Tipo, Locazione, Capacita) VALUES (?, ?, ?, ?)",
    [nome, tipo, locazione, capacita],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
});

app.post("/createOperatore", (req, res) => {
  const nome = req.body.nome;
  const cognome = req.body.cognome;
  const indirizzo = req.body.indirizzo;
  const telefono = req.body.telefono;
  const email = req.body.email;
  const ruolo = req.body.ruolo;
  const stipendio = req.body.stipendio;

  db.query(
    //prepared statement
    "INSERT INTO operatore (Nome, Cognome, Indirizzo, NumTelefono, Email, Ruolo, Stipendio) VALUES (?, ?, ?, ?, ?, ?, ?)",
    [nome, cognome, indirizzo, telefono, email, ruolo, stipendio],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
});

app.get("/abbonamenti", (req, res) => {
  db.query("SELECT * FROM abbonamento", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.get("/biglietti", (req, res) => {
  db.query("SELECT * FROM biglietto", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.get("/giostre", (req, res) => {
  db.query("SELECT * FROM giostra", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.get("/operatori", (req, res) => {
  db.query("SELECT * FROM operatore", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.put("/updateabbonamenti", (req, res) => {
  const id = req.body.id;
  const costo = req.body.Costo;
  console.log(costo);
  db.query(
    "UPDATE abbonamento SET Costo = ? WHERE idAbbonamento = ?",
    [costo, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.put("/updatebiglietti", (req, res) => {
  const id = req.body.id;
  const costo = req.body.Costo;
  console.log(costo);
  db.query(
    "UPDATE biglietto SET Costo = ? WHERE idBiglietto = ?",
    [costo, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.put("/updategiostre", (req, res) => {
  const id = req.body.id;
  const tipo = req.body.Tipo;
  console.log(tipo);
  db.query(
    "UPDATE giostra SET Tipo = ? WHERE idGiostra = ?",
    [tipo, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.put("/updateoperatori", (req, res) => {
  const id = req.body.id;
  const stipendio = req.body.Stipendio;
  db.query(
    "UPDATE operatore SET Stipendio = ? WHERE idOperatore = ?",
    [stipendio, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.delete("/deleteAbbonamenti/:id", (req, res) => {
  const id = req.params.id;
  db.query(
    "DELETE FROM abbonamento WHERE idAbbonamento = ?",
    id,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.delete("/deleteBiglietti/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM biglietto WHERE idBiglietto = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.delete("/deleteGiostre/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM giostra WHERE idGiostra = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.delete("/deleteOperatori/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM operatore WHERE idOperatore = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
