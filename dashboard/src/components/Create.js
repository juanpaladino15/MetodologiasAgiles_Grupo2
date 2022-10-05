import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { collection, addDoc } from 'firebase/firestore'
import { db } from '../firebaseConfig/firebase'
import Button from '@mui/material/Button';

const Search = () => {
  const [ Calle, setCalle ] = useState('')
  const [ entre1, setEntre1 ] = useState('')
  const [ entre2, setEntre2 ] = useState('')
  const [ estado, setEstado ] = useState(true)
  const navigate = useNavigate()

  const direccionesCollection = collection(db, "direcciones")

  const store = async (e) => {
    e.preventDefault()
    await addDoc( direccionesCollection, { Calle: Calle, entre1: entre1, entre2: entre2, estado: estado } )
    navigate('/Show')
    //console.log(e.target[0].value)
  }

  return (
    <div className='container'>
        <div className='row'>
            <div className='col'>
                <h1>Crear direccion</h1>
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
                            onChange={ (e)=> setEntre1(e.target.value)} 
                            type="text"
                            className='form-control'
                        />                 
                    </div>
                    <div className='mb-3'>
                        <label className='form-label'>Entre 2</label>
                        <input
                            value={entre2}
                            onChange={ (e)=> setEntre2(e.target.value)} 
                            type="text"
                            className='form-control'
                        />                 
                    </div>
                    <div className="form-check form-switch">
                       <label className="form-check-label" for="estado">Estado</label>
                       <input 
                          //value={estado}
                          checked={estado}
                          className="form-check-input" 
                          onChange={ (e)=> setEstado(e.target.checked)} 
                          type="checkbox" 
                          id="estado"                          
                          />
                        </div> 
                        <Button type="submit" variant="contained" >Guardar</Button>   
                 </form>   
            </div>
        </div>
    </div> 
  )
}

export default Search


