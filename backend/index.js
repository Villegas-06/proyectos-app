const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport')
const path = require('path')
const cors = require('cors');

const config = require('./config/config');

const app = express();
const PORT = process.env.PORT || 3000;

// Conexion a la base de datos MongoDB

mongoose.connect(config.mongoURI)
    .then(() => console.log('Conexión a MongoDB exitosa'))
    .catch(err => console.log(err));


app.use(bodyParser.json({ limit: '200mb' }));
app.use(bodyParser.text({ limit: '200mb' }));
app.use(bodyParser.urlencoded({ limit: '200mb', extended: true }));

// SOCKET
let server = app.listen(PORT, () => {
    console.log('Server started on port ' + PORT)
})
//Createa a socket port
var io = require('socket.io')(server)
//Declarate global var of connection socket to use in other controllers
global.io = io

app.use(cors({ origin: '*' }));

app.use(require('express-session')({
    secret: 'LicifyTest2024*+',
    resave: true,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session())
require('./config/passport')(passport)


app.get('/', (req, res) => {
    res.send('<h1>Server Running</h1>')
})

let router = express.Router();

const users = require('./routes/users');

app.use('/users', users);
app.use('/api', router)

require('./routes/api/user')(router);
require('./routes/api/constructor')(router);
