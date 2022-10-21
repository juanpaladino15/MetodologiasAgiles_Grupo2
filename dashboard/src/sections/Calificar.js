import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Rating from '@mui/material/Rating';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { Formik, Form } from 'formik';
import React, { useState, useEffect, setValue } from 'react';
import { useHistory } from "react-router-dom"
import { useCookies } from 'react-cookie'

function Calificar(props){
	// const {calle, entre1, entre2} = props
	// const [haylugar, sethaylugar] = useState(0)
	const [value, setValue] = React.useState(2)
	// const [cookies, setCookie, removeCookie] = useCookies(['calle','entre1','entre2']);

	// const url = ''

	// const changeLugar= async (cant)=>{
	// 	const requestOptions = {
	// 		method: 'POST',
	// 		headers: {
	// 			'Content-Type': 'application/json',
	// 		},
	// 		body:{}
	// 	}
	// 	try{
	//       const response = await fetch(url,requestOptions)
	// 		const data = await response.json()
	// 		if(response.status == 200){
	// 			sethaylugar(cant)
	// 		}
	// 	} catch(e){
	// 		sethaylugar(0)
	// 	}

	// }
	// useEffect(()=>{
	// 	async function returnHayLugar(){
	// 		const requestOptions = {
	// 			method: 'GET',
	// 			headers: {
	// 				'Content-Type': 'application/json',
	// 			}
	// 		}
	// 		try{
	// 	      const response = await fetch(url,requestOptions)
	// 			const data = await response.json()
	// 			if(response.status == 200){
	// 				sethaylugar(data.cantidad)
	// 			}
	// 		} catch(e){
	// 			sethaylugar(0)
	// 		}
	// 	}
	// },[])

	return(
		<Grid
			container
			justifyContent="center"
			alignItems="center"
		>
		<Grid
			item
			sx={{
				marginTop: "50vh"
			}}
		>
		</Grid>
		
			<Paper sx={{
				backgroundColor:"#eeeeee"
				}}
				elevantion={3}
			>
				<Formik
					initialValues={{
						puntuacion: 0
					}}
					onSubmit={values=>{
						// search(values.puntuacion)
					}}
					render={({values,setFieldValue,handleChange})=>(
						<Form>
							<Grid container spacing={2}>
								<Typography component="legend">Puntuacion para el aparcador:</Typography>
									<Rating
 										name="simple-controlled"
 										value={values.puntuacion}
  										onChange={(event, newValue) => {
    									setValue(newValue);
  									}}
								/>
							</Grid>
						</Form>
					)}
				/>
			</Paper>
		</Grid>
	)
}

export default Calificar