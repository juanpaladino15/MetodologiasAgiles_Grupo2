import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Alert from '@mui/material/Alert';
import Rating from '@mui/material/Rating';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { Formik, Form } from 'formik';
import React, { useState, useEffect, setValue } from 'react';
import { useHistory } from "react-router-dom"
import { useCookies } from 'react-cookie'

function Calificar(props){
	const {calle, entre1, entre2} = props
	const [value, setValue] = React.useState(2)
	const [message,setMessage] = useState("")

	console.log("CALLESSSS:",calle,entre1,entre2)

	const enviarCalificacion = values =>{
		var url = "http://10.40.12.21:4000/api/direcciones/calificar"

		const requestOptions = {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
         },
			body:{
				calle: calle,
				entre1: entre1,
				entre2: entre2,
				calificacion: values.puntuacion
			}
      }

		fetch(url,requestOptions)
		.then(ok=>{
			if (ok.status != 200){
				setMessage("Error al calificar")
			} else {
				setMessage("")
			}
			console.log(ok)
			console.log("Datos enviados")
		})
		.catch(err=>{
			console.log("Entro por el error")
			console.log(err)
		})
	}

	return(
		<Grid
			container
			justifyContent="center"
			alignItems="center"
		>
			<Paper 
				sx={{
					backgroundColor:"#eeeeee",
					marginTop: "30vh",
					width: 500,
					height: 187
				}}
				
				elevantion={3}
				
			>
				<Formik
					initialValues={{
						puntuacion: 0
					}}
					onSubmit={values=>{
						console.log(values.puntuacion)
						enviarCalificacion(values)
					}}
					render={({values,setFieldValue,handleChange})=>(
						<Form>
							<Grid 
								container 
								spacing={2}
								justifyContent="center"
								alignItems="center"
								sx={{
									marginTop: "5vh"
								}}
							>
								<Typography component="legend">Puntuacion para el aparcador:</Typography>

								<Rating
 									name="simple-controlled"
 									value={values.puntuacion}
  									onChange={(event) => {
    									setFieldValue("puntuacion", event.target.value);
  									}}
								/>

								<Grid 
									item
									justifyContent="center"
									alignItems="center"
									sx={{
										marginTop: "1vh",
										marginRight: "4vw"
									}}
								>
									<Button
										variant='contained'
										type="submit"
									>
										Enviar
									</Button>
								</Grid>
								<Grid>
									{
									message!=""?<Alert severity="error">{message}</Alert>:null
									}
								</Grid>
								
							</Grid>
							
						</Form>
					)}
				/>
			</Paper>
		</Grid>
	)
}

export default Calificar
