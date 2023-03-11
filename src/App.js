import "./App.css"
// import Coin from "./components/Coin"
import CoinClass from "./components/CoinClass"
import AccountBalance from "./components/AccountBalance"
import logo from "./Assets/logo.png"

function App() {
	return (
		<div className="App">
			<header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
				<h1>Coin Exchange</h1>
				<hr />
			</header>
			<div className="main-container">
				<AccountBalance balance={10000} />
				<div className="table-container">
					<table>
						<thead>
							<tr>
								<th>Name</th>
								<th>Symbol</th>
								<th>Price</th>
								<th>Status</th>
							</tr>
						</thead>
						<tbody>
							<CoinClass name="Bitcoin" symbol="BTC" price={24000} />
						</tbody>
					</table>
				</div>
			</div>
		</div>
	)
}

export default App
