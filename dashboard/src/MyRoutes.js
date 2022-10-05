import { Route, Switch } from "react-router-dom"
import WhereIAm from './sections/WhereIAm.js'
import ThereAreParking from './sections/ThereAreParking.js'
import SearchParking from './sections/SearchParking.js'
import Parking from './sections/Parking.js'
import Login from './sections/Login.js'
import NoPage from './NoPage.js'
import Show from "./components/Show.js"
import Create from "./components/Create.js"
import Edit from "./components/Edit.js"

function MyRoutes(props){
	return(
		<Switch>
			{/* PAra el login en general */}
			<Route path='/login'>
				<Login/>
			</Route>

			{/* Para el trapito */}
			<Route path='/whereiam'>
				<WhereIAm />
			</Route>
			<Route path='/thereareparking'>
				<ThereAreParking />
			</Route>

			{/* Para el conducor */}

			<Route path='/search' element={<SearchParking/>}/>
			<Route path='/parking' element={<Parking/>}/>
			//<Route path='/Show' element={<Show />} />			
			//<Route path='/Create' element={<Create />} />
			//<Route path='/Edit/:id' element={<Edit />} />

			{/* La pagina no existe */}
			<Route path="*">
				<NoPage/>
			</Route>
		</Switch>
	)
}

export default MyRoutes
