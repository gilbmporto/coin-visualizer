import "./App.css"
import Coin from "./components/Coin"
import CoinClass from "./components/CoinClass"

function App() {
	return (
		<div className="App">
			<header className="App-header">
				<h1>Coin Exchange</h1>
				<table>
					<thead>
						<tr>
							<th>Name</th>
							<th>Symbol</th>
							<th>Price</th>
						</tr>
					</thead>
					<tbody>
						<CoinClass name="Bitcoin" symbol="BTC" price={24000} />
					</tbody>
				</table>
			</header>
		</div>
	)
}

export default App
