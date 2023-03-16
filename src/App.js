import "./App.css"
// import Coin from "./components/Coin"
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
`

const COIN_DATA = 10

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
				console.log(coinsPrices)
				let infoWithPrices = info.map((coin) => {
					return {
						...coin,
						price: coinsPrices[coin.rank - 1],
					}
				})
				console.log(infoWithPrices)
				this.setState({ coinData: infoWithPrices })
			})
			// .then(async (lastInfo) => {
			// 	for (let coin of lastInfo) {
			// 		let response = await axios.get(
			// 			`https://api.coinpaprika.com/v1/coins/${coin.key}`
			// 		)
			// 		let thisCoinLogo = response.data.logo
			// 		lastInfo[coin.rank - 1].logo = thisCoinLogo
			// 	}
			// 	this.setState({ coinData: lastInfo })
			// })
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
		axios.get(`https://api.coinpaprika.com/v1/tickers`).then((res) => {
			console.log(res.data)
			let coinDataUpdatedPrices = this.state.coinData.map((coin) => {
				let newPrice = coin.price
				if (coin.symbol === symbol) {
					for (let ticker of res.data) {
						if (ticker.id === coin.key) {
							newPrice = ticker.quotes.USD.price
						}
					}
				}
				return {
					...coin,
					price: newPrice,
				}
			})
			console.log(coinDataUpdatedPrices)
			return coinDataUpdatedPrices
		})
		//.then((info) => this.setState({ coinData: info }))

		// const newCoinData = this.state.coinData.map(async (thisCoin) => {
		// 	let newPrice = thisCoin.price
		// 	if (thisCoin.symbol === symbol) {
		// 		let response = await axios.get(
		// 			`https://api.coinpaprika.com/v1/tickers/${thisCoin.key}`
		// 		)
		// 		let thisCoinPrice = await response.data.quotes.USD.price
		// 		newPrice = thisCoinPrice
		// 		return {
		// 			...thisCoin,
		// 			price: newPrice,
		// 		}
		// 	}
		// })
		// console.log(newCoinData)
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
