import "./App.css"
// import Coin from "./components/Coin"
import CoinClass from "./components/CoinClass"
import AccountBalance from "./components/AccountBalance"
import logo from "./Assets/logo.png"
import React from "react"

class App extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			balance: 10000,
			coinData: [
				{
					name: "Bitcoin",
					symbol: "BTC",
					price: 24000,
				},
				{
					name: "Ethereum",
					symbol: "ETH",
					price: 1500,
				},
				{
					name: "Litecoin",
					symbol: "LTC",
					price: 70,
				},
				{
					name: "USDTether",
					symbol: "USDT",
					price: 1,
				},
			],
		}
	}

	render() {
		return (
			<div className="App">
				<header className="App-header">
					<img src={logo} className="App-logo" alt="logo" />
					<h1>Coin Exchange</h1>
					<hr />
				</header>
				<div className="main-container">
					<AccountBalance balance={this.state.balance} />
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
								<CoinClass
									name={this.state.coinData[0].name}
									symbol={this.state.coinData[0].symbol}
									price={this.state.coinData[0].price}
								/>
								<CoinClass
									name={this.state.coinData[1].name}
									symbol={this.state.coinData[1].symbol}
									price={this.state.coinData[1].price}
								/>
								<CoinClass
									name={this.state.coinData[2].name}
									symbol={this.state.coinData[2].symbol}
									price={this.state.coinData[2].price}
								/>
								<CoinClass
									name={this.state.coinData[3].name}
									symbol={this.state.coinData[3].symbol}
									price={this.state.coinData[3].price}
								/>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		)
	}
}

export default App
