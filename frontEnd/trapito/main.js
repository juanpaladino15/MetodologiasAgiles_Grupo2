const express = require('express')
const bodyParser = require("body-parser")
const cors = require('cors')
const actions = require('./actions')
const tlib = require("../libs/tokens.js")

var app = express()
tokens = new tlib.TokenList()

function verifyToken(req,res,next){
	console.log("REQ:",req)
	if(!tokens.findToken(req.headers.token))
		res.status(401).send("token invalido")
	else
		next()
}

/*****************************
 *		Main		
 *****************************/
/* Esta api es para el trapito */

app.use(bodyParser.json())
app.use(cors())
//app.use(verifyToken)

var validTokens=[]

path = "/v1/trapito"

app.post(path + "/login", function(req,res){actions.login(req,res)})

/* Para indicarle ál sistema la cuadra en la que estoy */
app.post(path + "/whereiam", function(req,res){actions.whereIAm(req,res)})

/*
EJEMPLO
app.get(path + "/:trapitoid", function(req,res){
	console.log("El id del trapito que viene en la llamada a la API es:",req.params.trapitoid)
	res.send({
		nombre: "Santiago",
		edad: 43
	})
})
*/

/* Para indicarle a la aplicación si hay o no esapcio donde me encuentro */
app.post(path + "/thereareparking", function(req,res){actions.thereAreParking(req,res)})

app.listen(8081,function(){
	console.log("Trapito server corriendo")
})

