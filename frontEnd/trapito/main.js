const express = require('express')
const bodyParser = require("body-parser")
const cors = require('cors')
const actions = require('./actions')

var app = express()

/*****************************
 *		Main		
 *****************************/
/* Esta api es para el trapito */

app.use(bodyParser.json())
app.use(cors())

path = "/v1/trapito"

/* Para indicarle ál sistema la cuadra en la que estoy */
app.post(path + "/whereiam", function(req,res){actions.whereIAm(req,res)})

/* Para indicarle a la aplicación si hay o no esapcio donde me encuentro */
app.post(path + "/thereareparking", function(req,res){actions.thereAreParking(req,res)})

app.listen(8081,function(){
	console.log("Nose server running")
	console.log('CORS-enabled')
})

