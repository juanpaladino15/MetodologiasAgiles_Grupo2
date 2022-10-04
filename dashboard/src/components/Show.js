import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'


import { db } from '../firebaseConfig/firebase'
import { collection, getDocs, getDoc, deleteDoc, doc, where } from 'firebase/firestore'
import { async } from '@firebase/util'

import Swal from 'sweetalert2'  //npm i sweetalert2
import withReactContent from 'sweetalert2-react-content' //npm i sweetalert2-react-content

const MySwal = withReactContent(Swal)



const Show = () => {
    //1- configurar los hooks
    const [direcciones, setDirecciones] = useState([])

    //2- referenciamos  a la DB firestore
    const direccionesCollection = collection(db, "direcciones")
    //3- funcion para mostrar todos los docs de direcciones 
    const getDirecciones = async () => {
        const dato = await getDocs(direccionesCollection)
        //console.log(data)
        setDirecciones(
            dato.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        )
        console.log(direcciones)
    }
    //4- funcion para eliminar un doc
    const deleteDireccion = async (id) => {
        const direccionDoc = doc(db, "direcciones", id)
        await deleteDoc(direccionDoc)
        getDirecciones()
    }


    //5- funcion de confirmacion para sweetalert
    const confirmDelete = (id) => {
        MySwal.fire({
            title: 'Se borrará esta dirección',
            text: "¿Está seguro de eliminarla?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, borrar!'
          }).then((result) => {
            if (result.isConfirmed) {
                deleteDireccion(id)
                Swal.fire(
                'Borrado!',
                'La dirección ha sido eliminada.',
                'Éxito'
              )
            }
          })
    }

    //6- usamos useEffect
    useEffect(() => {
        getDirecciones()
        //esLint-disable-next-Lines
    })

    

    

    return (
        //vista
        <>  
        <div className='container'>
            <div className='row'>
                <div className='col'>
                    <div className="d-grid grap-2">
                        <Link to="/create" className='btn btn-secondary mt-2 mb-2'>Create</Link>
                    </div>

                    <table className='table table-dark table-hover'>
                        <thead>
                            <tr>
                                <th>Calle</th>
                                <th>Entre 1</th>
                                <th>Entre 2</th>
                                <th>Estado</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {direcciones.map( (direccion) => (
                                <tr key={direccion.id}>
                                    <td>{direccion.Calle}</td>
                                    <td>{direccion.entre1}</td>
                                    <td>{direccion.entre2}</td>
                                    <td>{direccion.estado}</td>
                                    <td>
                                        <Link to={'/edit/${direccion.id}'} className='btn btn-ligth'>Editar</Link>
                                        <button onClick={ () => { confirmDelete(direccion.id) } } className="btn btn-danger">Borrar</button>
                                    </td>

                                </tr>
                            )

                            )}
                        </tbody>

                    </table>


                </div>

            </div>
         </div>       
             

           
        </>
    )
}

export default
    Show