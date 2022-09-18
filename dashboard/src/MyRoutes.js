import { Routes, Route } from "react-router-dom"
import WhereIAm from './sections/WhereIAm.js'
import ThereAreParking from './sections/ThereAreParking.js'
import SearchParking from './sections/SearchParking.js'
import Parking from './sections/Parking.js'
import NoPage from './NoPage.js'

function MyRoutes(props){
	return(
		<Routes>
			/* Para el trapito */
			<Route path='/whereiam' element={<WhereIAm />}/>
			<Route path='/thereareparking' element={<ThereAreParking />}/>

			/* Para el conducor */
			<Route path='/searchparking' element={<SearchParking/>}/>
			<Route path='/parking' element={<Parking/>}/>
			
			/* La pagina no existe */
			<Route path="*" element={<NoPage/>}/>
		</Routes>
	)
}

export default MyRoutes
