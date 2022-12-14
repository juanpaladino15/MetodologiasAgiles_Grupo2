import { Route, Switch } from "react-router-dom"
import WhereIAm from './sections/WhereIAm.js'
import ThereAreParking from './sections/ThereAreParking2.js'
import Calificar from './sections/Calificar'
//import SearchParking from './sections/SearchParking.js'
import SearchParking from './sections/SearchParking2.js'
import Parking from './sections/Parking.js'
import Login from './sections/Login.js'
import NoPage from './NoPage.js'

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

			<Route path='/searchparking'>
			 	<SearchParking/>
			</Route>
			<Route path='/parking'>
				<Parking/>
			</Route>

			<Route path="/calificar/:calle/:entre1/:entre2"
            render={(props) => (
               <Calificar
						calle={props.match.params.calle}
						entre1={props.match.params.entre1}
						entre2={props.match.params.entre2}
               />
            )}
         />

			{/* La pagina no existe */}
			<Route path="*">
				<NoPage/>
			</Route>
		</Switch>
	)
}

export default MyRoutes
