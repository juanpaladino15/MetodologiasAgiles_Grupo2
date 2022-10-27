import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import Grid from '@mui/material/Grid';
import { Formik, Form } from 'formik';
import Button from '@mui/material/Button';
import { collection, where, getDocs, query } from 'firebase/firestore'
import { db } from '../firebaseConfig/firebase'

import Swal from 'sweetalert2'  //npm i sweetalert2
//import withReactContent from 'sweetalert2-react-content' //npm i sweetalert2-react-content


//const MySwal = withReactContent(Swal)

function ItemParking(props){
	const {dir, cant} = props
	return(
		<Grid item container>
			<Grid item xs={4}>
				{dir}
			</Grid>
			<Grid item xs={5}>
				{cant}
			</Grid>
			<Grid item xs={3}>
				<Button variant='contained'>
					Calificar
				</Button>
			</Grid>
		</Grid>
	)
}

function SearchParking(props){
	const [ calle, setCalle ] = useState('')
	const [ entre1, setEntre1 ] = useState('')
	const [ entre2, setEntre2 ] = useState('')
	const [direcciones, setDirecciones] = useState([])
	const [message, setMessage] = useState(null)

	const direccionesCollection = collection(db, "direcciones")

	const search = async (values) => {
		var url = "http://10.40.12.21:4000/api/direcciones/" + values.calle + "/" + values.entre1 + "/" + values.entre2
		//var url = "http://10.40.12.21:4000/api/direcciones/"
		const requestOptions = {
         method: 'GET',
         headers: {
            'Content-Type': 'application/json',
         }
      }
      try{
         const response = await fetch(url,requestOptions)
			console.log("Estado:",response.status)

			const result = await response.json()
			var items = new Array
			console.log("RESULT",result)
      	result.forEach(d => {
				items.push(<ItemParking
					dir={d.Calle + " e " + d.entre1 + "/" + d.entre2}
					cant={d.estado}
				/>)
			})
			setDirecciones(items)
			setMessage(null)
		} catch(e){
			setMessage("Fallo de la API")
			console.log(e)
		}
  }
 
  return (
		<Grid
			container
			justifyContent='center'
			alignItems='center'
		>
			<Box sx={{width:400}}>
			<Paper sx={{
				backgroundColor:"#eeeeee",
				padding:2
			}} elevantion={3}>
			<Typography>
				Buscar Estacionamiento
			</Typography>
			<Grid sx={{paddingTop:1}}>
				<Formik
					initialValues={{
						calle:'',
						entre1:'',
						entre2:''
					}}
					onSubmit={values=>{
						search(values)
					}}
					render={({values,setFieldValue,handleChange})=>(
						<Form>
							<Grid container spacing={2}>
								<Grid item xs={12}>
									<TextField
										label='Calle'
										name='calle'
										value={values.calle}
										onChange={handleChange}
									/>
								</Grid>
								<Grid item xs={12}>
									<TextField
										label='entre calle'
										name='entre1'
										value={values.entre1}
										onChange={handleChange}
									/>
								</Grid>
								<Grid item xs={12}>
									<TextField
										label='y calle'
										name='entre2'
										value={values.entre2}
										onChange={handleChange}
									/>
								</Grid>
								<Grid item xs={12}>
									<Button
										type='submit'
										variant='contained'
									>
										Buscar
									</Button>
								</Grid>
							</Grid>
						</Form>
					)}
				/>
			</Grid>
			<Grid sx={{paddingTop:3}}>
				<Typography>
					Hemos encontrado los siguiente lugares
				</Typography>
				<Grid>
					{direcciones.length>0?
						<Grid spacing={2}>
							{direcciones}
						</Grid>:
						<Alert severity="info">
							Sin datos. Intente otra dirección
						</Alert>
					}
					{message!=null?
						<Alert severity="error">
							{message}
						</Alert>:null
					}
				</Grid>
			</Grid>
			</Paper>
			</Box>
		</Grid>
  )
}

export default SearchParking
