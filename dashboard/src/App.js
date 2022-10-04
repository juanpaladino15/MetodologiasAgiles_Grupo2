import './App.css';
import { BrowserRouter } from "react-router-dom"
import MyRoutes from './MyRoutes.js'
import Show from './components/Show';

function App() {
  return (
	<BrowserRouter>
		<MyRoutes />		
	</BrowserRouter>
  )
}

export default App;
