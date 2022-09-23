const express = require('express')
const bodyParser = require("body-parser")
const cors = require('cors')
const tlib = require("../libs/tokens.js")

var app = express()
tokens = new tlib.TokenList()

function verifyToken(req,res,next){
   if(!tokens.findToken(req.header.token))
      res.status(401).send("token invalido")
   else
      next()
}

/*****************************
 *		Main		
 *****************************/
app.use(bodyParser.json())
app.use(cors())
//app.use(verifyToken)

path = "/v1/trapito"

app.post(path + "/login", function(req,res){actions.login(req,res)})

/* Para informar al sistema que se desea buscar aparcamiento
	a partir de una dirección */
app.post(path + "/searchparking", function(req,res){actions.searchParking(req,res)})

/* Para consultar si aún sigue habiendo lugar y donde
	(en el caso de que se pueda buscar por area) */
app.get(path + "/checkParking", function(req,res){actions.checkParking(req,res)})

app.listen(8082,function(){
	console.log("Driver API corriendo")
})

