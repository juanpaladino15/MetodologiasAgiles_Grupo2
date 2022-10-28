import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Rating from '@mui/material/Rating';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom"
import { useCookies } from 'react-cookie'

function ThereAreParking(props){
	//const {calle, entre1, entre2} = props
	const [haylugar, sethaylugar] = useState(0)

	const [rate, setrate] = useState(0)

	const [cookies, setCookie, removeCookie] = useCookies(['calle','entre1','entre2']);

	const url = 'estoyEn/' + cookies.calle + '/' + cookies.entre1 + '/' + cookies.entre2

	const changeLugar= async (cant)=>{
		const requestOptions = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body:{
				cantidad: cant
			}
		}
		try{
	    const response = await fetch(url,requestOptions)
			const data = await response.json()
			if(response.status == 200){
				sethaylugar(cant)
			}
		} catch(e){
			sethaylugar(0)
		}

	}

	const getRate = async (cant)=>{
		let url = 'http://' + config.api.host + ''
		const requestOptions = {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			}
		}
		try{
	    const response = await fetch(url,requestOptions)
			const data = await response.json()
			if(response.status == 200){
				sethaylugar(cant)
			}
		} catch(e){
			sethaylugar(0)
		}

	}

	useEffect(()=>{
		async function returnHayLugar(){
			const requestOptions = {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				}
			}
			try{
		      const response = await fetch(url,requestOptions)
				const data = await response.json()
				if(response.status == 200){
					sethaylugar(data.cantidad)
				}
			} catch(e){
				sethaylugar(0)
			}
		}
	},[])

	return(
		<Grid
			container
			justifyContent="center"
			alignItems="center"
		>
			<Paper sx={{
				backgroundColor:"#eeeeee"
				}}
				elevantion={3}
			>
				<Grid container spacing={5}>
					<Grid item xs={12}>
						<Typography>
							Me encuentro en:
						</Typography>
						<Typography>
							{cookies.calle + " e /" + cookies.entre1 + " y " + cookies.entre2}
						</Typography>
					</Grid>
					<Grid
						container
						item
						xs={12}
						justifyContent="center"
						alignItems="center"
						spacing={2}
						direction="column"
					>
						<Grid item>
						<Button
							variant='contained'
							size='large'
							sx={{ width:150 }}
							color={haylugar===0?'success':"primary"}
							onClick={(e)=>{changeLugar(0)}}>
							0
						</Button>
						</Grid>
						<Grid item>
						<Button
							variant='contained'
							size='large'
							sx={{ width:150 }}
							color={haylugar===1?'success':"primary"}
							onClick={(e)=>{changeLugar(1)}}>
							1
						</Button>
						</Grid>
						<Grid item>
						<Button
							variant='contained'
							size='large'
							sx={{ width:150 }}
							color={haylugar===2?'success':"primary"}
							onClick={(e)=>{changeLugar(2)}}>
							2
						</Button>
						</Grid>
						<Grid item>
						<Button
							variant='contained'
							size='large'
							sx={{ width:150 }}
							color={haylugar===3?'success':"primary"}
							onClick={(e)=>{changeLugar(3)}}>
							3	
						</Button>
						</Grid>
						<Grid item>
						<Button
							variant='contained'
							size='large'
							sx={{ width:150 }}
							color={haylugar===4?'success':"primary"}
							onClick={(e)=>{changeLugar(4)}}>
							4
						</Button>
						</Grid>
						<Grid item>
						<Button
							variant='contained'
							size='large'
							sx={{ width:150 }}
							color={haylugar===5?'success':"primary"}
							onClick={(e)=>{changeLugar(5)}}>
							+4
						</Button>
						</Grid>
						<Grid>
						<Rating name="read-only" value={rate} readOnly/>
						</Grid>
					</Grid>
				</Grid>
			</Paper>
		</Grid>
	)
}

export default ThereAreParking
