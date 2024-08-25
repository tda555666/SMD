require("dotenv").config();
const express = require("express");
const app = express();
require('./db/db');
const cors = require("cors");
const bodyParser = require('body-parser');
const taskRoutes = require('./routes/tasks');

//import conroller
const userController = require("./controller/user");
//listening on port
const port = process.env.PORT || 3055;
//import sevice of auth
const AuthController = require('./services/auth');

// Middleware
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(
  cors({
  origin: ['http://localhost:5173' ],
  methods: ['GET', 'POST','DELETE'],
  credentials: true,
  })
);

app.use(bodyParser.json());

//here starts the routing 
app.use('/api/tasks', taskRoutes);
app.post("/register", userController.register);
app.post("/login", AuthController.login);



//listening on port
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


