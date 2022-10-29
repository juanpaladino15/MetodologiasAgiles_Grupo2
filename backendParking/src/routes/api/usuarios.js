const { Router } = require('express');
const { auth } = require('firebase-admin');
const {db} = require('../../firebase');

const router = Router();

router.post('/', async (req, res) => {
	/* Agerga un usuario */
    console.log(req.body);
    const {nombre, apellido, email, password, rol} = req.body;
    const user = await db.collection('usuarios').add(req.body)
    res.json({message: 'Usuario creado'});
});


router.post('/login', async (req, res) => {
    console.log(req.body);
    const {email, password} = req.body;
    const user = await db.collection('usuarios').where('email', '==', email).where('password', '==', password).get();
    if(user.empty){
        res.status(401).json({message: 'Usuario no encontrado'});
    }else{
       // res.json({message: 'Usuario encontrado'});
			res.json({
				id:user.docs[0].id,
				rol:user.docs[0].data().rol,
			})
/*
        res.json(user.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        })))        
*/
    }
    
});

router.post('/logout', async (req, res) => {
    console.log(req.body);
    const {email, password} = req.body;
    const user = await db.collection('usuarios').where('email', '==', email).where('password', '==', password).get();
    if(user.empty){
        res.json({message: 'Usuario no encontrado'});
    }else{
        res.json({message: 'Usuario encontrado'});
    }
});

router.post('/singup', async (req, res) => {
    console.log(req.body);
    await auth().createUser({
        email: req.body.email,
        password: req.body.password
    }).then((user) => {
        res.json({message: 'Usuario creado'});
    }).catch((error) => {
        res.json({message: 'Error al crear el usuario'});
    }); 

});

router.get('/', async (req, res) => {
	const querySnapshot = await db.collection("usuarios").get();

    const usuarios = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }))
//    const usuario = await db.collection('usuarios').doc().get()
    res.json(usuarios);
});


router.get('/:id/scoring', async (req, res) => {
    const usuario = await db.collection('usuarios').doc(req.params.id).get()
	console.log("SCORE:",usuario.data().calificaciones)
    res.send({scoring:usuario.data().calificaciones});
});


router.get('/:id', async (req, res) => {
    const usuario = await db.collection('usuarios').doc(req.params.id).get()
    res.json(usuario.data());
});
    
module.exports = router;
