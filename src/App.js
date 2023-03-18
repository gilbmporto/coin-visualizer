import "./App.css"
import CoinList from "./components/CoinList"
import AccountBalance from "./components/AccountBalance"
import React from "react"
import Header from "./components/Header"
import styled from "styled-components"
import axios from "axios"

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
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`

const COIN_DATA = 30

class App extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			balance: 10000,
			coinData: [
				{
					name: "Loading...",
					logo: "Loading...",
					symbol: "Loading...",
					price: "Loading...",
					balance: " - ",
					action: "Loading...",
				},
			],
			showBalance: true,
		}
		this.handleRefresh = this.handleRefresh.bind(this)
		this.updateShowBalance = this.updateShowBalance.bind(this)
	}

	componentDidMount = () => {
		axios
			.get("https://api.coinpaprika.com/v1/coins")
			.then(async (res) => {
				let newCoinData = res.data.slice(0, COIN_DATA).map((coin) => {
					return {
						key: coin.id,
						name: coin.name,
						rank: coin.rank,
						symbol: coin.symbol,
						price: 0,
						balance: " - ",
					}
				})
				return newCoinData
			})
			.then(async (info) => {
				let response = await axios.get(
					`https://api.coinpaprika.com/v1/tickers/`
				)
				let coinsPrices = response.data.slice(0, COIN_DATA).map((coin) => {
					return coin.quotes.USD.price
				})
				let infoWithPrices = info.map((coin) => {
					return {
						...coin,
						price: coinsPrices[coin.rank - 1],
					}
				})
				return infoWithPrices
			})
			.then(async (lastInfo) => {
				for (let coin of lastInfo) {
					let logoImage = `https://static.coinpaprika.com/coin/${coin.key}/logo.png`
					lastInfo[coin.rank - 1].logo = logoImage
				}
				this.setState({ coinData: lastInfo })
			})
			.catch((err) => console.log(`${err.name}: ${err.message}`))
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

	handleRefresh = (symbol) => {
		axios
			.get(`https://api.coinpaprika.com/v1/tickers`)
			.then((res) => {
				let coinDataUpdatedPrices = this.state.coinData.map((coin) => {
					let newPrice = coin.price
					console.log(`${coin.name} price then:` + newPrice)
					if (coin.symbol === symbol) {
						for (let ticker of res.data) {
							if (ticker.id === coin.key) {
								newPrice = ticker.quotes.USD.price
							}
						}
					}
					console.log(`${coin.name} price now:` + newPrice)
					return {
						...coin,
						price: newPrice,
					}
				})
				return coinDataUpdatedPrices
			})
			.then((info) => this.setState({ coinData: info }))
	}

	render() {
		return (
			<Div>
				<MainContainer>
					<Header />
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
