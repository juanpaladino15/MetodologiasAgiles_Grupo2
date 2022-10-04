import './App.css';
import { BrowserRouter } from "react-router-dom"
import MyRoutes from './MyRoutes.js'
import { Container } from '@mui/material';

function App() {
	return (
		<Container>
			<BrowserRouter>
				<MyRoutes />
			</BrowserRouter>
		</Container>
	)
}

export default App;
