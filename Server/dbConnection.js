const config = require("./config.json");
const mysql = require("mysql");
const os = require("os");
var dbConnInfo = {
  dev: {
    host: config.HOST,
    user: config.USER,
    password: config.PASSWORD,
    database: config.DATABASE,
  },
  real: {
    host: config.HOST,
    user: config.USER,
    password: config.PASSWORD,
    database: config.DATABASE,
  },
};

var dbConnection = {
  init: () => {
    console.log(os.hostname());
    if (os.hostname() === "sinsieon-ui-MacBookPro.local") {
      return mysql.createConnection(dbConnInfo.dev);
    } else {
      return mysql.createConnection(dbConnInfo.real);
    }
  },
  connect: (con) => {
    con.connect((err) => {
      if (err) console.error(err);
      else {
        console.log;
      }
    });
  },
};
module.exports = dbConnection;

// export const getDbConnection = () => {
//   const connection = mysql.createConnection({
//     host: config.HOST,
//     user: config.USER,
//     password: config.PASSWORD,
//     database: config.DATABASE,
//   });
//   connection.connect();
//   return connection;
// };

// export const sendQuery = (con, query) => {
//   con.query(query, (error, rows, fields) => {
//     if (error) throw error;
//     console.log(rows);
//   });
//   con.end();
// };
