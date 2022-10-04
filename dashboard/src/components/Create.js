import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { collection, addDoc } from 'firebase/firestore'
import { db } from '../firebaseConfig/firebase'

import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';




const Create = () => {
  const [ Calle, setCalle ] = useState('')
  const [ entre1, setEntre1 ] = useState('')
  const [ entre2, setEntre2 ] = useState('')
  const [ estado, setEstado ] = useState(true)
  const navigate = useNavigate()

  const direccionesCollection = collection(db, "direcciones")

  const store = async (e) => {
    e.prevenDefault()
   await addDoc( direccionesCollection, {Calle: Calle, entre1: entre1, entre2: entre2, estado: estado})
   navigate('/Show')
   //console.log(e.target[0].value)
  }
  
   
  
  
  return (
    <div className='container'>
      <div className='row'>
        <div className='col'>
          <h1>Crear Direccion</h1>

          <form onSubmit={store}>

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
           
            <Button variant="contained">Store</Button>

          </form>

        </div>

      </div>
      
      </div>
  )
}

export default Create