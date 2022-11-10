const { Router } = require('express');
const {db} = require('../../firebase');

const router = Router();

//recupera todas las direcciones
router.get('/', async (req, res) => {
    const querySnapshot = await db.collection("direcciones").get();
    const direcciones = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }))
    res.json(direcciones)
});

//recupera una direccion por id
router.get("/:id", async (req, res) => {
    const direccion = await db.collection('direcciones').doc(req.params.id).get()
    res.json(direccion.data());
});

//recupera una direccion por poximidad
router.get("/:calle/:entre1/:entre2" , async (req, res) => {
    const querySnapshot = await db.collection('direcciones')
    .get();

    const direcciones = querySnapshot.docs.map(doc => ({
        id: doc.id,
		  entre1:parseInt(doc.data().entre1),
		  entre2:parseInt(doc.data().entre2),
		  Calle:parseInt(doc.data().Calle),
		  estado:doc.data().estado,
		  aparcador:doc.data().aparcador,
		  medido:doc.data().medido
    }))

	console.log("Buscando calles:",parseInt(req.params.calle) - 1,parseInt(req.params.calle) + 1)
    res.send(direcciones.filter(d=>
		d.Calle >= parseInt(req.params.calle) - 1 &&
		d.Calle <= parseInt(req.params.calle) + 1 &&
		d.entre1 >= parseInt(req.params.entre1) - 1 &&
		d.entre1 <= parseInt(req.params.entre2) + 1));
});

// Actualiza una direccion segun su calle
router.put("/:calle/:entre1/:entre2", async(req,res)=>{
	 const querySnapshot = await db.collection("direcciones")
		.where('Calle','==',parseInt(req.params.calle))
		.where('entre1','==',parseInt(req.params.entre1))
		.where('entre2','==',parseInt(req.params.entre2))
		.get()

	const direcciones = querySnapshot.docs.map(doc => ({
		id:doc.id,
		...doc.data()
	}))
	console.log("Direcciones:",direcciones)

	if(direcciones.length!=1){
		const direccion = await db.collection("direcciones").add({
			Calle: parseInt(req.params.calle),
			entre1: parseInt(req.params.entre1),
			entre2: parseInt(req.params.entre2),
			estado: req.body.estado,
			aparcador: req.body.aparcador,
    })
		console.log("AGREGANDO direccion")
		res.send({message:"Dirección actualizada 2"})
		return
	}
	const direccion = direcciones[0]
	const id = direccion.id
	delete(direccion.id)
	direccion["estado"] = req.body.estado
	direccion["aparcador"] = req.body.aparcador
	console.log("La direccion es:",direccion)
	console.log("El id es:",id)
	await db.collection("direcciones").doc(id).update(direccion);
	res.send({message:"Dirección actualizada"})
})


//carga una direccion nueva
router.post('/new-direccion', async (req, res ) => {
    //const { Calle, entre1, entre2, estado } = req.body
    
     //------------carga direccion-----------
    console.log(req.body);
    const direccion = await db.collection("direcciones").add({
        Calle: parseInt(req.body.Calle),
        entre1: parseInt(req.body.entre1),
        entre2: parseInt(req.body.entre2),
        estado: req.body.estado
    });

    //------------retorna message-----------------------------------
    if(res.statusCode == 200){
        res.json({status: res.statusCode, message: "Direccion cargada"})
    }
    if(res.statusCode != 200){
        res.json({status: res.statusCode, message: "Error al cargar direccion"})
    } 
    //---------------------------------------------------------  
    
    //res.redirect('/') //redirecciona a localhost:3000 
})

//devuelve una direccion para su edicion 
router.get('/edit-direccion/:id', async (req, res) => {
    const doc = await db.collection('direcciones').doc(req.params.id).get()

    // renderiza la direccion de id igual al parametro en vista handelbar
    //res.render("direcciones", { direccion: { id: doc.id, ...doc.data() }});

    const direcccion = await db.collection("direcciones").doc(id).update(req.body);
    res.json(doc.data()) //retorna un json con una tupla direccion 
})

//borra un direccion eliminandola de la bd
router.get('/delete-direccion/:id', async (req, res) => {
    
    const doc = await db.collection('direcciones').doc(req.params.id).delete()    
    //---------------retorna menssage luego de cargar------------
    if(res.statusCode == 200){
        res.json({status: res.statusCode, message: "Direccion borrada"})
    }
    if(res.statusCode != 200){
        res.json({status: res.statusCode, message: "Error al borrar"})
    } 
    //---------------------------------------

    //res.redirect('/') //redirecciona a localhost:3000
})


//actualiza todos los campos de una direccion segun su id 
router.post("/update-direccion/:id", async (req, res) => {
    
    const { id } = req.params;
    
    const direcccion = await db.collection("direcciones").doc(id).update(req.body);
    //------------actualiza direccion retorna message-----------------------------------
    if(res.statusCode == 200){
        res.json({status: res.statusCode, message: "Direccion Actualizada"})
    }
    if(res.statusCode != 200){
        res.json({status: res.statusCode, message: "Error al actualizar direccion"})
    } 
    //---------------------------------------------------------    

   // res.redirect("/"); //redirecciona a localhost:3000

})

//calificar Dado calle, entre1, entre2 y un score (del 1 al 5) 
//se busca en la coleccion de calles por los datos 
//calle, entre1 y entre2. 
//Se obtiene el id del trapito y luego se agrega el score en el 
//array del trapito.

router.get('/calificar/:calle/:entre1/:entre2/:score', async (req, res ) => {

    //------------consulta direccion-----------
    const querySnapshot = await db.collection('direcciones', ref => ref.where('Calle', '==', parseInt(req.params.calle)))
    .where('entre1', '==', parseInt(req.params.entre1))
    .where('entre2', '==', parseInt(req.params.entre2)).get();
    
   
    //console.log(querySnapshot); 

    if (querySnapshot.empty) {
        console.log('No matching documents.');
        res.json({status: res.statusCode, message: "No matching documents."})
        //return;
    } else {
        querySnapshot.forEach(doc => {
            //console.log(doc.id, '=>', doc.data().aparcador); 
            const idUsuario = doc.data().aparcador;            
            const usuario = db.collection('usuarios').doc(idUsuario);
            const getDoc = usuario.get().then(doc => {
                if (!doc.exists) {
                    console.log('No such document!');
                    res.json({status: res.statusCode, message: "No such document!"})
                } else {
                    //console.log('Document data:', doc.data());
                    if (doc.data().rol == "trapito") {
                        console.log("Es un trapito");
                        usuario.update({
                            calificaciones: doc.data().calificaciones.concat(parseInt(req.params.score))
                        });
                        res.json({status: res.statusCode, message: "Calificacion agregada"})
                    }
                    else {
                        console.log("No es un aparcador");
                        res.json({status: res.statusCode, message: "No es un aparcador"})
                    }
                }
            })
            .catch(err => {
                console.log('Error getting document', err);
                res.json({status: res.statusCode, message: "Error getting document"})
            });
        });
        }
})
          


module.exports = router;
