import { Routes, Route, Link } from 'react-router-dom'

import Layout from './components/Layout'
import Home from './pages/Home'
import Details from './pages/Details'

const App = () => {
	return (
		<Routes>
			<Route path="/" element={<Layout />}>
				<Route index element={<Home />} />

				<Route path=":id" element={<Details />} />
			</Route>
		</Routes>
	)
}

export default App
