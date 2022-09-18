const express = require('express')
const bodyParser = require("body-parser")
const cors = require('cors')

var app = express()

/*****************************
 *		Main		
 *****************************/
app.use(bodyParser.json())
app.use(cors())

path = "/v1/trapito"

/* Para informar al sistema que se desea buscar aparcamiento
	a partir de una dirección */
app.post(path + "/searchparking", function(req,res){actions.searchParking(req,res)})

/* Para consultar si aún sigue habiendo lugar y donde
	(en el caso de que se pueda buscar por area) */
app.get(path + "/checkParking", function(req,res){actions.checkParking(req,res)})

app.listen(8082,function(){
	console.log("Nose server running")
	console.log('CORS-enabled')
})

