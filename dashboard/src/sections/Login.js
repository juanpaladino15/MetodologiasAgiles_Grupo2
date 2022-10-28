import React, { useState } from 'react';
import { useHistory } from "react-router-dom"
import { Formik, Form } from 'formik';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';
import { useCookies } from "react-cookie";
import config from '../config.js'

function Login(props){

	const [alertMessage,setAlertMessage] = useState(null)

	const [cookies, setCookie, removeCookie] = useCookies(["token"]);

	let history = useHistory();

	const login = async (values)=>{
		var url = "http://"+ config.api.host +":4000/api/usuarios/login" 
		const requestOptions = {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
         },
			body:JSON.stringify({
				email:values.username,
				password:values.passwd
			})
      }

		try {
			const response = await fetch(url,requestOptions)
			const result = await response.json()
			console.log(result)
			setCookie("userId", result.id, { path: "/" });
			setCookie("userRol", result.rol, { path: "/" });
			if(result.rol == 'trapito'){
				history.push("/whereiam")
			} else {
				history.push("/searchparking")
			}
		} catch(e){
			console.log(e)
			setAlertMessage("Error para autenticar")
		}
	}

	return(
		<Grid
			container
			justifyContent="center"
			alignItems="center"
			spacing={2}
			direction='column'
		>
		<Grid
			item
			sx={{
				marginTop: "60px"
			}}
		>
		<Typography variant="h3">
			Parking App
		</Typography>
		<Box
			sx={{
				marginTop: "50px",
				paddingTop:"30px",
				width: "400px",
				height: "300px",
				border: "1px solid #AAA",
				borderRadius:"5px"
			}}
		>
			<Formik
				initialValues={{
					username:'',
					passwd:'',
					aparcador:false
				}}
				onSubmit={(values)=>{
					login(values)
				/*
					if(!values.aparcador){
						if(values.username === 'conductor@test.com.ar'
						&& values.passwd === 'AgilesConductor'){
							setCookie("token", "untoken", { path: "/" });
      					history.push("/searchparking")
						} else
							setAlertMessage("Usuario invalido")
					} else {
						if(values.username === 'trapito@test.com.ar'
						&& values.passwd === 'AgilesTrapito'){
							setCookie("token", "untoken", { path: "/" });
      					history.push("/whereiam")
						} else
							setAlertMessage("Usuario invalido")
					}
				*/
				}}

			render={({values,setFieldValue,handleChange}) => (
				<Form>
					<Grid container
						spacing={2}
						direction="column"
						justifyContent="center"
						alignItems="center"
					>
						<Grid item>
							<TextField
								label='Usuario'
								name='username'
								value={values.username}
								onChange={handleChange}
							/>
						</Grid>
						<Grid item>
							<TextField
								label='Contraseña'
								name='passwd'
								type="password"
								value={values.passwd}
								onChange={handleChange}
							/>
						</Grid>
						<Grid item container
							justifyContent="center"
							direction='row'
						>
						</Grid>
						<Grid item>
							<Button
								variant='contained'
								type="submit"
							>
								Ingresar
							</Button>
						</Grid>
						<Grid item xs={12}>
							{alertMessage!=null?
								<Alert
									severity="error"
								>
									{alertMessage}
								</Alert>
								:
								null
							}
						</Grid>
					</Grid>
				</Form>
			)}
			/>
		</Box>
		</Grid>
		</Grid>
	)
}

export default Login
