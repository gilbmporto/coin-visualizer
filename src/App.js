import "./App.css"
import CoinList from "./components/CoinList"
import AccountBalance from "./components/AccountBalance"
import React, { useState, useEffect } from "react"
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
	/* @media screen and (max-width: 500px) {
		max-width: 435px;
		width: 414px;
		min-width: 288px;
		margin: 20px auto;
		background-color: #282c34;
		padding: 10px;
		color: white;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	} */
`

const Div = styled.div`
	text-align: center;
`

const RefreshButton = styled.button`
	margin: 10px auto;
	padding: 12px;
	border: 2px solid white;
	border-radius: 15px;
	font-size: 22px;
	background-color: darkblue;
	color: white;
	cursor: pointer;
	&:hover {
		background-color: #3131e9;
	}
`

const COIN_DATA = 45

function App(props) {
	const [balance, setBalance] = useState(10000)
	const [showBalance, setShowBalance] = useState(true)
	const [coinData, setCoinData] = useState([
		{
			name: "Loading...",
			logo: "Loading...",
			symbol: "Loading...",
			price: "Loading...",
			balance: " - ",
			action: "Loading...",
		},
	])

	useEffect(() => {
		console.log(coinData)
		if (coinData.length <= 1) {
			componentDidMount()
		}
	}, [])

	const componentDidMount = async () => {
		console.time("Fetch Coin Data")
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
						// balance: " - ",
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
				setCoinData(lastInfo)
				console.log(lastInfo)
				console.log(coinData)
				console.timeEnd("Fetch Coin Data")
			})
			.catch((err) => console.log(`${err.name}: ${err.message}`))
	}

	const updateShowBalance = (toggleBool) => {
		let showBalanceBool = toggleBool
		showBalanceBool === true
			? (showBalanceBool = false)
			: (showBalanceBool = true)
		setShowBalance(showBalanceBool)

		// let hiddenCoinData = coinData.map((coin) => {
		// 	if (showBalance === false) {
		// 		return {
		// 			...coin,
		// 			hiddenBalance: coin.balance,
		// 			balance: "-",
		// 		}
		// 	} else {
		// 		return {
		// 			...coin,
		// 			balance: coin.hiddenBalance,
		// 			hiddenBalance: "-",
		// 		}
		// 	}
		// })

		// setCoinData(hiddenCoinData)
	}

	const handleRefresh = async () => {
		axios
			.get(`https://api.coinpaprika.com/v1/tickers`)
			.then((res) => {
				let coinDataUpdatedPrices = coinData.map((coin) => {
					console.log(coin)
					let newPrice = coin.price
					console.log(`${coin.symbol} price then: ` + newPrice)
					for (let ticker of res.data) {
						if (ticker.id === coin.key) {
							newPrice = ticker.quotes.USD.price
							console.log(`${coin.symbol} price now: ` + newPrice)
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
			.then((info) => setCoinData(info))
			.catch((err) => console.log(`${err.name}: ${err.message}`))
	}

	return (
		<Div>
			<MainContainer>
				<Header />
				<AccountBalance
					balance={balance}
					setBalance={setBalance}
					showBalance={showBalance}
					updateShowBalance={updateShowBalance}
				/>
				<RefreshButton onClick={handleRefresh}>🌀 Refresh Prices</RefreshButton>
				<CoinList coinData={coinData} />
			</MainContainer>
		</Div>
	)
}

export default App
