const { Router } = require('express');
const {db} = require('../../firebase');

const router = Router();

//actualiza estado de una direccion
router.put('/:calle/:entre1/:entre2/:estado/:trapito', async (req, res) => {
    //------------consulta direccion-----------
    const direcciones = await db.collection("direcciones")
    .where("Calle", "==", parseInt(req.params.calle))
    .where("entre1", "==", parseInt(req.params.entre1))
    .where("entre2", "==", parseInt(req.params.entre2)).get();

    const id = direcciones.docs[0].id;

    console.log(id);

    //------------actualiza direccion-----------
    const direccion = await db.collection("direcciones").doc(id).update({
        estado: req.params.estado,
        aparcador: req.params.trapito
    });
   

    
    //------------actualiza direccion retorna message-----------------------------------
    if(res.statusCode == 200){
        res.json({status: res.statusCode, message: "Direccion Actualizada"})
    }
    if(res.statusCode != 200){
        res.json({status: res.statusCode, message: "Error al actualizar direccion"})
    }
    //---------------------------------------------------------

})


module.exports = router;
