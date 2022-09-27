import React, { useState, useEffect } from 'react'

import { Link } from 'react-router-dom'

import {collection, getDocs, gerDoc, deleteDoc} from 'firebase/firestore'

import { db } from '../firebaseConfig/firebase'

import Swal from 'sweetalert2'  //npm i sweetalert2
import withReactContent from 'sweetalert2-react-content'
import { async } from '@firebase/util'
const MySwal = withReactContent(Swal)

const Show = () => {
   //1- configurar los hoks
    const [direcciones, setDirecciones] = useState( [] )
  
    //2- referenciamos  a la DB firestore
  const direccionesCollection = collection(db, "direcciones")
   //3- funcion para mostrar todos los docs de direcciones 
  const getDirecciones = async () => {
    const data = await getDocs(direccionesCollection)
    console.log(data)
  }
   //4- funcion para eliminar un doc

   //5- funcion de confirmacion para sweetalert

   //6- usamos useEffect
  useEffect( () => {
    getDirecciones()
    //esLint-disable-next-Lines
  },)
    return (
    <div>
        Show
    </div>
  )
}

export default 
Show