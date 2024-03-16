require("dotenv").config();
const express = require("express");
const app = express();
const morgan = require("morgan");
const helmet = require("helmet");
const compression = require("compression");
const session = require("express-session");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const MongoDBStore = require('connect-mongodb-session')(session)

//init middlewares
app.use(
  cors({
    origin: 'http://127.0.0.1:5173',
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true,
    optionsSuccessStatus: 200
  })
);
app.use(morgan("dev"));
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(cookieParser());
app.use(
  express.urlencoded({
    extended: true,
  })
);

// setting up connect-mongodb-session store
console.log("DATABASE_CONNECTION_STRING::", process.env.DATABASE_CONNECTION_STRING)
const mongoDBstore = new MongoDBStore({
  uri: process.env.DATABASE_CONNECTION_STRING,
  collection: 'testSession',
})

//set headers for sending payload
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header(
    "Access-Control-Allow-Methods",
    "GET,PUT,POST,DELETE,UPDATE,OPTIONS"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept"
  );
  next();
});

//init session
app.use(
  session({
    secret: 'a1s2d3f4g5h6',
    name: 'session-test', // cookies name to be put in "key" field in postman
    store: mongoDBstore,
    cookie: {
      maxAge: 5 * 60 * 1000, // this is when our cookies will expired and the session will not be valid anymore (user will be log out)
      sameSite: false,
      secure: false, // to turn on just in production
    },
    resave: true,
    saveUninitialized: true,
  })
)

//init db
require("./dbs/init.mongo");

// app.get("/get-session", (req, res) => {
//   // res.send(req.session);
//   const payload = {
//     isvalid: req.session?.id || false,
//     username: req.session.user,
//   };
//   console.log('session id', req.session?.id);
//   res.status(201).json(payload);
// });

// app.post("/set-session", async (req, res, next) => {
//   req.session.user = { name: req.body.username || 'Guest', status: "ok" };
//   // res.send('SET OK!');
//   console.log(req.session.id);
//   res.status(201).json(req.session.user);
// });

//init routes
app.use("/", require("./routes"));

//handling errors
app.use((req, res, next) => {
  const error = new Error("Service Not Found");
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  const statusCode = err.status || 500;
  return res.status(statusCode).json({
    status: "error",
    code: statusCode,
    message: err.message || "Internal Server Error",
  });
});

module.exports = app;
