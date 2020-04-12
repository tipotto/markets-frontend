const express = require("express");
const mysql = require("mysql");
// const cors = require("cors")({ origin: true });
const app = express();
// app.use(cors);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// const client = mysql.createConnection({
//   host: "localhost",
//   user: "tipotto",
//   password: "L1keana5234",
//   //   port: 3306,
//   database: "myApp"
// });

const client =
  process.env.NODE_ENV === "production"
    ? mysql.createConnection({
        user: process.env.REACT_APP_DB_USER,
        password: process.env.REACT_APP_DB_PASSWORD,
        database: process.env.REACT_APP_DB_DATABASE,
        socketPath: `/cloudsql/${process.env.REACT_APP_INSTANCE_CONNECTION_NAME}`
      })
    : mysql.createConnection({
        user: process.env.REACT_APP_DB_USER,
        password: process.env.REACT_APP_DB_PASSWORD,
        database: process.env.REACT_APP_DB_DATABASE,
        host: "localhost"
      });

client.connect(err => {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + client.threadId);
});

// read OK
// app.get("/user", (req, res) => {
//   client.query("SELECT * from user;", (err, rows, fields) => {
//     if (err) throw err;

//     res.send(rows);
//   });
// });

// create ok
app.post("/user/create", (req, res) => {
  const name = req.body.username;
  const email = req.body.email;
  const password = req.body.password;

  client.query(
    "INSERT INTO users (name, email, password) VALUES (?)",
    [name, email, password],
    (err, result) => {
      if (err) throw err;
      console.log("Created new user.");
      client.query(
        "SELECT * from users WHERE email = ?",
        [email],
        (err, rows, fields) => {
          if (err) throw err;
          // res.send(rows);
          console.log("Fetched new user: " + rows);
          res.json({
            data: rows
          });
        }
      );
    }
  );
});

// update ok
// app.put("/user/update", (req, res) => {
//   const id = req.body.id;
//   const status = req.body.status;
//   client.query(
//     "UPDATE users SET status = ? WHERE id = ?",
//     [status, id],
//     (err, result) => {
//       if (err) throw err;
//       client.query("SELECT * from users;", (err, rows, fields) => {
//         if (err) throw err;
//         res.send(rows);
//       });
//     }
//   );
// });

// delete ok
// app.delete("/user/delete", (req, res) => {
//   const id = req.body.id;
//   client.query(`DELETE FROM users WHERE id = ?`, [id], (err, result) => {
//     if (err) throw err;
//     client.query("SELECT * from users;", (err, rows, fields) => {
//       if (err) throw err;
//       res.send(rows);
//     });
//   });
// });

app.listen(8000, () => console.log("Listening on port 8000"));
