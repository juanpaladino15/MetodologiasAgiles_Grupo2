import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { collection, where, getDocs, query } from 'firebase/firestore'
import { db } from '../firebaseConfig/firebase'
import Button from '@mui/material/Button';

import Swal from 'sweetalert2'  //npm i sweetalert2
import withReactContent from 'sweetalert2-react-content' //npm i sweetalert2-react-content


const MySwal = withReactContent(Swal)

const Search = () => {
 const [ Calle, setCalle ] = useState('')
 const [ entre1, setEntre1 ] = useState('')
 const [ entre2, setEntre2 ] = useState('')
 const [direcciones, setDirecciones] = useState([])
 const navigate = useNavigate()

  const direccionesCollection = collection(db, "direcciones")

  const search = async (e) => {
    e.preventDefault();
    //console.log(e.target[0].value)
    //await addDoc( direccionesCollection, { Calle: Calle, entre1: entre1, entre2: entre2, estado: estado } )
    const q = query(
      collection(db, "direcciones"),
      where("Calle", "==", Calle),
      where("entre1", "==", entre1),
      where("entre2", "==", entre2)
    );
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      querySnapshot.forEach((doc) => {
        //console.log(doc.id, "=>", doc.data());
        if (doc.data().estado == true) {
          console.log(doc.data());
          console.log("Verde / Hay Lugar");
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Hay Lugar para estacionar',
            showConfirmButton: false,
            timer: 2000
          })
        } else {
          console.log(doc.data());
          console.log("Rojo / No hay Lugar");
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'No hay lugar',
            showConfirmButton: false,
            timer: 2000
          })
        }
      });
    } else {
      console.log("Amarillo / La direccion no ha sido informada");
      Swal.fire({
        position: 'top-end',
        icon: 'warning',
        title: 'Tal vez encuentres lugar. Esta direccion no fue informada.',
        showConfirmButton: false,
        timer: 2000
      })
    }
  }; 
 
  


  return (
    <div className='container'>
        <div className='row'>
            <div className='col'>
                <h1>Hay Lugar?</h1>
                <h5>Test: 12 e/56 y 57</h5>
                <h5>Test: 7 e/45 y 46</h5>
                <h5>Test: Cualquier otra</h5>
                 <form onSubmit={search}>
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
                        <Button type="submit" variant="contained" color="success">Search</Button>   
                 </form>   
            </div>
        </div>
    </div> 
  )
}

export default Search