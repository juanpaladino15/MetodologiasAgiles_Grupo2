import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Typography from '@mui/material/Typography';
import Switch from '@mui/material/Switch';
import config from '../config.js'


function WhereIAm(props){
	const [alertMessage,setAlertMessage] = useState(null)

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
		>
		<Typography variant="h3">
			Donde estara hoy?
		</Typography>
		<Box
			sx={{
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
					var p =null
					const options = {
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify(values)
					}
					if(values.aparcador)
						p = fetch(config.api.host + "/v1/driver/login",options)
					else
						p = fetch(config.api.host + "/v1/parking/login",options)
					p.then(ok=>{
						if(ok.status === 200)
							console.log("Paso autenticación")
						else
							setAlertMessage("Usuario inválido")
					})
					.catch(err=>{
						setAlertMessage("Api no responde")
					})
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
								label='Calle'
								name='calle'
								value={values.user}
								onChange={handleChange}
							/>
						</Grid>
						<Grid item>
							<TextField
								label='Entre Calle'
								name='Entre1'
								value={values.passwd}
								onChange={handleChange}
							/>
						</Grid>
						<Grid item>
							<TextField
								label='Entre Calle'
								name='entre2'
								value={values.passwd}
								onChange={handleChange}
							/>
						</Grid>
						<Grid item>
							<Button
								variant='contained'
								type="submit"
							>
								Aceptar
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

export default WhereIAm
