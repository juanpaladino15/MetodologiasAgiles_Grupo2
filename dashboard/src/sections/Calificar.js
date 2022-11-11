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
import config from '../config';

function Calificar(props){
	const {calle, entre1, entre2} = props
	const [value, setValue] = React.useState(2)
	const [message,setMessage] = useState("")
	const [calificado,setCalificado] = useState(false)

	let history = useHistory();

	// console.log("CALLESSSS:",calle,entre1,entre2)

	const enviarCalificacion = values =>{
		var url = "http://"+ config.api.host +
					 ":4000/api/direcciones/calificar/"+ calle +
					 "/" + entre1 + "/" + entre2 + "/" + values.puntuacion

		const requestOptions = {
         method: 'GET',
         headers: {
            'Content-Type': 'application/json',
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
						puntuacion: 0,
						comment: ""
					}}
					onSubmit={values=>{
						console.log(values.puntuacion)
						enviarCalificacion(values)
						setCalificado(true)
					}}
					render={({values,setFieldValue,handleChange})=>(
						<Form>
							<Grid 
								container 
								spacing={2}
								direction='column'
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

								<Grid item>
									<TextField
									label='Deje un comentario'
									name='comment'
									value={values.comment}
									onChange={handleChange}
									/>
								</Grid>

								<Grid 
									item
									justifyContent="center"
									alignItems="center"
									sx={{
										marginTop: "1vh",
										marginRight: "4vw"
									}}
								>
									{!calificado?
										<Button
											variant='contained'
											type="submit"
										>
											Enviar
										</Button>
										:
										<Button
											variant='contained'
											onClick={()=>{
												history.push("/searchparking")
												}
											}
										>
											Gracias!!!	
										</Button>
									}

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
