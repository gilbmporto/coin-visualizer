import "./App.css"
// import Coin from "./components/Coin"
import CoinList from "./components/CoinList"
import AccountBalance from "./components/AccountBalance"
import React from "react"
import Header from "./components/Header"
import styled from "styled-components"

const MainContainer = styled.div`
	margin: 20px auto;
	background-color: #282c34;
	padding: 10px;
	color: white;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`

const Div = styled.div`
	text-align: center;
`

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
			<Div>
				<Header />
				<MainContainer>
					<AccountBalance balance={this.state.balance} />
					<CoinList coinData={this.state.coinData} />
				</MainContainer>
			</Div>
		)
	}
}

export default App
