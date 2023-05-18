const config = require("./config.json");
const mysql = require("mysql");
const os = require("os");
const session = require("express-session");
const MySQLStore = require("express-mysql-session")(session);
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
        console.log("Db connect success");
      }
    });
  },
  sendQuery: async (con, query, callback) => {
    con.query(query, (error, rows, fields) => {
      if (error) throw error;
      else {
        callback(rows);
      }
    });
    //con.end();
  },
  initSession: (app) => {
    /*express-session 커넥션 */

    const options =
      os.hostname() === "sinsieon-ui-MacBookPro.local"
        ? dbConnInfo.dev
        : dbConnInfo.real;
    const sessionStore = new MySQLStore(options);
    app.use(
      session({
        secret: process.env.SESSION_SECRET_KEY,
        resave: false,
        saveUninitialized: true,
        store: sessionStore,
      })
    );
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
//
// };
