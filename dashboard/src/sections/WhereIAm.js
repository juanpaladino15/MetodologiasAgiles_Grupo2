import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Typography from '@mui/material/Typography';
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
			sx={{
				marginTop: "60px"
			}}
		>
		<Typography variant="h3">
			Donde va a estar hoy?
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
					calle:'',
					calle1:'',
					calle2:'',
					aparcador:true
				}}
				onSubmit={(values)=>{
					var p =null
					const options = {
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify(values)
					}
					if(values.aparcador)
						p = fetch(config.api.host + "/v1/parking/whereiam",options)
					
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
								value={values.calle}
								onChange={handleChange}
							/>
						</Grid>
						<Grid item>
							<TextField
								label='Entre Calle'
								name='calle1'
								value={values.calle1}
								onChange={handleChange}
							/>
						</Grid>
						<Grid item>
							<TextField
								label='Entre Calle'
								name='calle2'
								value={values.calle2}
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
