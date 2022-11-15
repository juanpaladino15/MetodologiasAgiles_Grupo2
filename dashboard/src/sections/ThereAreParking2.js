import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import Rating from '@mui/material/Rating';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom"
import { useCookies } from 'react-cookie'
import config from '../config'
import ReplayIcon from '@mui/icons-material/Replay';

function ThereAreParking(props){
	//const {calle, entre1, entre2} = props
	const [haylugar, sethaylugar] = useState(0)

	const [cookies, setCookie, removeCookie] = useCookies(['calle','entre1','entre2','userId']);
	const [rates, setRates] = useState([])
	const [rateAverage, setRateAverage] = useState(0)
	const [propinas, setPropinas] = useState(0)

	const changeLugar= async (cant)=>{
		console.log("Entro")
		const url='http://' + config.api.host +
				':4000/api/direcciones/' + cookies.calle + '/' + cookies.entre1 + '/' + cookies.entre2
		const requestOptions = {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body:JSON.stringify({
				estado: cant,
				aparcador: cookies.userId
			})
		}
		try{
	    const response = await fetch(url,requestOptions)
			const data = await response.json()
			if(response.status == 200){
				sethaylugar(cant)
			}
		} catch(e){
			console.log(e)
			sethaylugar(0)
		}

	}

	const getPropinas = async(cant)=>{
		let url = 'http://' + config.api.host + ':4000/api/usuarios/' + cookies.userId + "/propinas"
		const requestOptions = {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			}
		}
		try{
			const response = await fetch(url,requestOptions)
			if(response.status == 200){
				const data = await response.json()
				if(data.propinas){
					setPropinas(data.propinas)
				} else {
					setPropinas(0)
				}
			}
		} catch(e){
			console.log(e)
		}

	}

	const getScoring = async (cant)=>{
		let url = 'http://' + config.api.host + ':4000/api/usuarios/' + cookies.userId + "/scoring"
		console.log("URL:",url)
		const requestOptions = {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			}
		}
		try{
			const response = await fetch(url,requestOptions)
			if(response.status == 200){
				const data = await response.json()
				let aux = 0
				let auxR = []
				console.log("DATAS:",data)
				data.scoring.forEach(s=>{
					console.log(aux," + ", s.score)
					aux = aux + s.score
					console.log("total:",aux)
					auxR.push(
						<Grid>
							<Rating name="read-only" value={s.score} precision={0.5} readOnly/>
							<Typography>
								{s.comment}
							</Typography>
						</Grid>
					)
				})
				setRates(auxR)
				console.log("SCORE DIVIDID",aux,data.scoring.length)
				console.log("aux:",aux,"data.scoring.length",data.scoring.length)
				setRateAverage(aux/data.scoring.length)
			}
		} catch(e){
			console.log(e)
			setRateAverage(0)
			setRates([])
		}
	}

	useEffect(()=>{
		const url = 'estoyEn/' + cookies.calle + '/' + cookies.entre1 + '/' + cookies.entre2
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
		getScoring()
		getPropinas()
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
						<Typography variant='h6'>
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
						<Grid item>
							<Typography>
								Mi calificación actual
							<Chip icon={<ReplayIcon/>} onClick={()=>{getScoring();getPropinas()}} />
							</Typography>
							<Accordion>
								<AccordionSummary
									expendIcon={<ExpandMoreIcon />}
								>
									<Rating name="read-only" value={rateAverage} precision={0.5} readOnly/>
									
								</AccordionSummary>
								<AccordionDetails>
									{rates}
								</AccordionDetails>
							</Accordion>
						</Grid>
						<Grid item>
							<Grid container direction='column'>
								<Typography variant="h8">
									Mi propina total actual:
								</Typography>
								<Typography variant="h8">
									{"$ " + propinas}
								</Typography>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</Paper>
		</Grid>
	)
}

export default ThereAreParking
