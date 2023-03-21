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
	const [balance, setBalance] = useState(150000)
	const [showBalance, setShowBalance] = useState(true)
	const [userLoggedIn, setUserLoggedIn] = useState(false)
	const [coinData, setCoinData] = useState([
		{
			name: "Loading...",
			logo: "Loading...",
			symbol: "Loading...",
			price: "Loading...",
		},
	])

	useEffect(() => {
		if (coinData.length <= 1) {
			componentDidMount()
		}
	}, [])

	useEffect(() => {
		if (userLoggedIn) {
			addBalanceAndActions()
		}
	}, [userLoggedIn])

	const addBalanceAndActions = async () => {
		let completeCoinData = coinData.map((coin) => {
			if (coin.balance === 0 || coin.balance === undefined) {
				return {
					...coin,
					balance: 0,
					actions: {
						buy: handleBuy,
						sell: handleSell,
					},
				}
			} else if (coin.balance > 0) {
				return {
					...coin,
					actions: {
						buy: handleBuy,
						sell: handleSell,
					},
				}
			}
		})
		setCoinData(completeCoinData)
	}

	const componentDidMount = async () => {
		console.time("Fetch Coin Data")
		axios
			.get("https://api.coinpaprika.com/v1/coins")
			.then(async (res) => {
				let newCoinData = res.data.slice(0, COIN_DATA).map((coin) => {
					return {
						id: coin.id,
						name: coin.name,
						rank: coin.rank,
						symbol: coin.symbol,
						price: 0,
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
					let logoImage = `https://static.coinpaprika.com/coin/${coin.id}/logo.png`
					lastInfo[coin.rank - 1].logo = logoImage
				}
				setCoinData(lastInfo)
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
	}

	const handleRefresh = async () => {
		axios
			.get(`https://api.coinpaprika.com/v1/tickers`)
			.then((res) => {
				let bitcoinPrice = coinData[0].price
				let coinDataUpdatedPrices = coinData.map((coin) => {
					let newPrice = coin.price
					for (let ticker of res.data) {
						if (ticker.id === coin.id) {
							newPrice = ticker.quotes.USD.price
						}
					}
					return {
						...coin,
						price: newPrice,
					}
				})
				if (coinDataUpdatedPrices[0].price == bitcoinPrice) {
					alert("You are already at the latest price until now!")
				}
				return coinDataUpdatedPrices
			})
			.then((info) => setCoinData(info))
			.catch((err) => console.log(`${err.name}: ${err.message}`))
	}

	const handleIncreaseBalance = async () => {
		let newBalance = parseFloat(balance)
		newBalance += 2500
		setBalance(newBalance.toFixed(2))
	}

	const handleAccess = async (loginStatus) => {
		setUserLoggedIn(loginStatus)
	}

	const handleBuy = (id) => {
		let newCoinData = coinData.map((coin) => {
			let newCoinBalance = coin.balance
			// console.log(`${coin.symbol} balance before: ` + newCoinBalance)
			let newBalance = balance
			if (coin.id === id) {
				if (balance >= coin.price) {
					newCoinBalance++
					newBalance -= coin.price
					setBalance(newBalance.toFixed(2))
				} else {
					alert("Not enough funds!")
				}
			}
			// console.log(`${coin.symbol} balance then: ` + newCoinBalance)
			return {
				...coin,
				balance: Number(newCoinBalance),
			}
		})
		// console.log(newCoinData)
		setCoinData(newCoinData)
	}

	const handleSell = async (id) => {
		let newCoinData = coinData.map((coin) => {
			let newCoinBalance = parseInt(coin.balance)
			// console.log("balance now: " + balance)
			let newBalance = parseFloat(balance)
			if (coin.id === id) {
				if (coin.balance > 0) {
					newCoinBalance--
					newBalance = parseFloat(newBalance + parseFloat(coin.price)).toFixed(
						2
					)
					// console.log("New balance: " + newBalance)
					setBalance(newBalance)
				} else {
					alert("Not enough tokens!")
				}
			}
			return {
				...coin,
				balance: Number(newCoinBalance),
			}
		})
		// console.log(newCoinData)
		setCoinData(newCoinData)
	}

	return (
		<Div>
			<MainContainer>
				<Header userLoggedIn={userLoggedIn} handleAccess={handleAccess} />
				{userLoggedIn ? (
					<AccountBalance
						balance={balance}
						setBalance={setBalance}
						showBalance={showBalance}
						updateShowBalance={updateShowBalance}
						handleIncreaseBalance={handleIncreaseBalance}
					/>
				) : null}
				<RefreshButton onClick={handleRefresh}>🌀 Refresh Prices</RefreshButton>
				<CoinList
					coinData={coinData}
					userLoggedIn={userLoggedIn}
					handleBuy={handleBuy}
					handleSell={handleSell}
					showBalance={showBalance}
				/>
			</MainContainer>
		</Div>
	)
}

export default App
