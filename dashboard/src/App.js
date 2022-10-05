import './App.css';
import { BrowserRouter as Router} from "react-router-dom"
import MyRoutes from './MyRoutes.js'
import { Container } from '@mui/material';

function App() {

  return (
	<Router>
		<MyRoutes />
	</Router>
  )

}

export default App;
