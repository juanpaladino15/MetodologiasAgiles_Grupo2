import { Routes, Route } from "react-router-dom"
import WhereIAm from './sections/WhereIAm.js'
import ThereAreParking from './sections/ThereAreParking.js'
import SearchParking from './sections/SearchParking.js'
import Parking from './sections/Parking.js'
import Login from './sections/Login.js'
import NoPage from './NoPage.js'
import Show from "./components/Show.js"
import Create from "./components/Create.js"
import Edit from "./components/Edit.js"
//import SearchParking  from "./components/SearchParking.js"

function MyRoutes(props){
	return(
		<Routes>
			{/* PAra el login en general */}
			<Route path='/login' element={<Login/>}/>

			{/* Para el trapito */}
			<Route path='/whereiam' element={<WhereIAm />}/>
			<Route path='/thereareparking' element={<ThereAreParking />}/>

			{/* Para el conducor */}
			<Route path='/search' element={<SearchParking/>}/>
			<Route path='/parking' element={<Parking/>}/>
			//<Route path='/Show' element={<Show />} />
			//<Route path='/SearchParking' element={<SearchParking />} />
			//<Route path='/Create' element={<Create />} />
			//<Route path='/Edit/:id' element={<Edit />} />
			{/* La pagina no existe */}
			<Route path="*" element={<NoPage/>}/>
		</Routes>
	)
}

export default MyRoutes
