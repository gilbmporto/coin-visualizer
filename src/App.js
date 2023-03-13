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
					balance: 1.7,
				},
				{
					name: "Ethereum",
					symbol: "ETH",
					price: 1500,
					balance: 42,
				},
				{
					name: "Litecoin",
					symbol: "LTC",
					price: 70,
					balance: 100,
				},
				{
					name: "USDTether",
					symbol: "USDT",
					price: 1,
					balance: 100000,
				},
			],
			showBalance: true,
		}
		this.handleRefresh = this.handleRefresh.bind(this)
		this.updateShowBalance = this.updateShowBalance.bind(this)
	}

	updateShowBalance(toggleBool) {
		let showBalanceBool = toggleBool
		showBalanceBool === true
			? (showBalanceBool = false)
			: (showBalanceBool = true)
		this.setState({ showBalance: showBalanceBool })

		let hiddenCoinData = this.state.coinData.map((coin) => {
			if (showBalanceBool === false) {
				return {
					...coin,
					hiddenBalance: coin.balance,
					balance: "-",
				}
			} else {
				return {
					...coin,
					balance: coin.hiddenBalance,
					hiddenBalance: "-",
				}
			}
		})

		this.setState({ coinData: hiddenCoinData })
	}

	handleRefresh(symbol) {
		const newCoinData = this.state.coinData.map((thisCoin) => {
			let newPrice = thisCoin.price
			if (thisCoin.symbol === symbol) {
				const randomPercent = 0.995 + Math.random() * 0.01
				newPrice = thisCoin.price * randomPercent
			}
			return {
				...thisCoin,
				price: newPrice,
			}
		})
		console.log(newCoinData)
		this.setState({ coinData: newCoinData })
	}

	render() {
		return (
			<Div>
				<Header />
				<MainContainer>
					<AccountBalance
						balance={this.state.balance}
						showBalance={this.state.showBalance}
						updateShowBalance={this.updateShowBalance}
					/>
					<CoinList
						coinData={this.state.coinData}
						handleRefresh={this.handleRefresh}
					/>
				</MainContainer>
			</Div>
		)
	}
}

export default App
