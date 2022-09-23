const help = require("../libs/help.js")
module.exports = {
	login: function(req,res){
		if(req.body.username == 'driver'
			&& req.body.passwd == 'driver'){
			res.send({token:help.hash_generate()})
		} else {
			res.status(401).send({message:"Error de autenticacion"})
		}
	},
	searchParking: function(req,res){
		/* Para informar al sistema que se desea buscar
			aparcamiento a partir de una dirección */
		res.send("Implementar")
	},

	checkParking: function(req,res){
		/* Para consultar si aún sigue habiendo lugar y donde
			(en el caso de que se pueda buscar por area) */
		res.send("Implementar")
	}
}
