const express = require('express');
const morgan = require('morgan');
const cors = require ('cors');
const { autoCommit } = require('oracledb');
const app = express();
require('dotenv').config();
const router =require ('../routes/routes.js')
//var router = express.Router();
/*Configuracion */

//app.set(process.env.PORT || 6001);
var port = process.env.PORT || 3001  // establecemos nuestro puerto
app.use(express.json());
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));
app.use(router);

/*app.get('/', function(req, res) {
       res.send("Hello World!");
})*/
// iniciamos nuestro servidor
app.listen(port)
console.log('API escuchando en el puerto ' + port)

/*app.listen(app.get('port'),()=>{
    console.log( 'server : '+process.env.HOST+' escuchando status 200 en el puerto : '+ process.env.PORT);
})*/
