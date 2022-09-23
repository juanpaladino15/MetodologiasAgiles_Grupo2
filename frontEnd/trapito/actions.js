module.exports = {
	login: function(req,res){
      if(req.body.username == 'driver'
         && req.body.passwd == 'driver'){
			var t = help.hash_generate()
         res.send({token:t})
      } else {
         res.status(401).send({message:"Error de autenticacion"})
      }
   },

	thereAreParking: function(req,res){
		/* Para indicarle ál sistema la cuadra en la que estoy */
		res.send("Implementar")
	},

	whereIAm: function(req,res){
		/* Para indicarle a la aplicación si hay o no esapcio donde me encuentro */
		res.send("Implementar")
	}
}
