import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getDoc, updateDoc, doc } from 'firebase/firestore'
import { db } from '../firebaseConfig/firebase'

import Swal from 'sweetalert2'  //npm i sweetalert2
import withReactContent from 'sweetalert2-react-content' //npm i sweetalert2-react-content

const MySwal = withReactContent(Swal)


const Edit = () => {
  const [ Calle, setCalle ] = useState('')
  const [ entre1, setEntre1 ] = useState('')
  const [ entre2, setEntre2 ] = useState('')
  const [ estado, setEstado ] = useState(true)
  const navigate = useNavigate()

  const {id} = useParams()

  const update = async (e) => {
    e.preventDefault()
    const direccion = doc(db, "direcciones", id)
    const data = {Calle: Calle, entre1: entre1, entre2: entre2, estado: estado}
    await updateDoc(direccion, data)
    navigate('/')
  }

  const getProductById = async (id) => {
    const direccion = getDoc( doc(db, "direcciones", id) )
    if(direccion.exists){
       //console.log(direccion.data())
       setCalle(direccion.data.Calle)
       setEntre1(direccion.data.entre1)
       setEntre1(direccion.data.entre1)
       setEstado(direccion.data.estado) 
     } else {
     console.log("La direccion no existe")
     }
    }  

  useEffect( () => {
    getProductById(id)
  }, [])


  return (
    <div className='container'>
      <div className='row'>
        <div className='col'>
          <h1>Editar Direccion</h1>

          <form onSubmit={update}>

            <div className='mb-3'>
              <label className='form-label'>Calle</label>
              <input 
                value={Calle}
                onChange={ (e) => setCalle(e.target.value)}
                type="text"
                className='form-control'              
              />
            </div>

            <div className='mb-3'>
              <label className='form-label'>Entre 1</label>
              <input 
                value={entre1}
                onChange={ (e) => setEntre1(e.target.value)}
                type="text"
                className='form-control'              
              />
            </div>

            <div className='mb-3'>
              <label className='form-label'>Entre 2</label>
              <input 
                value={entre2}
                onChange={ (e) => setEntre2(e.target.value)}
                type="text"
                className='form-control'              
              />
            </div>

            <div className='mb-3'>
              <label className='form-label'>Hay Lugar</label>
              <input 
                value={estado}
                onChange={ (e) => setEstado(e.target.value)}
                type="checkbox"
                className='checkbox'
                              
              />
            </div>
            <button type='submit' className='btn btn-primary'>Update</button>

          </form>

        </div>

      </div>
      
      </div>
  )
}

export default Edit