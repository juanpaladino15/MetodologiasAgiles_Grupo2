import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import React, { useState } from 'react';
import { useHistory } from "react-router-dom"


function ThereAreParking(props){
	const [haylugar, sethaylugar] = useState(false)
	
	return(
		<div>
			<Grid
			container
			justifyContent="center"
			alignItems="center"
		></Grid>

			<Button onClick={(e)=>{sethaylugar(!haylugar)}}>{
				haylugar? 'hay lugar' : 'No hay lugar'				
				}</Button>
		</div>
	)
}

export default ThereAreParking
