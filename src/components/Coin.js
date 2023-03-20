import React from "react"
import styled from "styled-components"

const Tr = styled.tr`
	border-top: 1px solid white;
`

const Td = styled.td`
	padding: 8px;
	border: 1px solid white;
	font-size: 19px;
	/* display: flex;
	flex-direction: row;
	justify-content: center; */
`

const BuyButton = styled.button`
	font-size: 14px;
	padding: 10px 15px;
	margin: 10px 5px;
	border: 1px solid white;
	border-radius: 10px;
	font-size: 12px;
	background-color: darkgreen;
	color: white;
	cursor: pointer;
	&:hover {
		background-color: #8fce00;
	}
`

const SellButton = styled.button`
	font-size: 14px;
	padding: 10px 15px;
	margin: 10px 5px;
	border: 1px solid white;
	border-radius: 10px;
	font-size: 12px;
	background-color: darkred;
	color: white;
	cursor: pointer;
	&:hover {
		background-color: #f44336;
	}
`

const DivBSBtns = styled.div`
	padding: 5px;
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
`

const Img = styled.img`
	width: 60px;
`

const A = styled.a`
	text-decoration: none;
	color: white;
	&:visited {
		color: #e023ec;
	}
	&:hover {
		text-decoration: underline;
	}
`

export default function Coin(props) {
	// const handleClick = (e) => {
	// 	e.preventDefault()
	// 	props.handleRefresh(props.symbol)
	// }

	const handleBuyClick = (e) => {
		e.preventDefault()
		console.log(props.id)
		props.handleBuy(props.id)
	}

	const handleSellClick = (e) => {
		e.preventDefault()
		console.log(props.id)
		props.handleSell(props.id)
	}

	return (
		<Tr>
			<Td>
				<A
					href={`https://coinmarketcap.com/currencies/${props.name
						.toLowerCase()
						.replace(" ", "-")
						.replace(" ", "-")}`}
					target="_blank"
				>
					{props.name}
				</A>
			</Td>
			<Td>{props.symbol}</Td>
			<Td>
				<Img src={props.logo} alt="token logo" />
			</Td>
			<Td>
				{typeof props.price === "number"
					? `US$ ${props.price.toFixed(2)}`
					: props.price}
			</Td>
			{props.userLoggedIn ? <Td>{props?.balance?.toString()}</Td> : null}
			{props.userLoggedIn && props.actions ? (
				<Td>
					<DivBSBtns>
						<BuyButton onClick={handleBuyClick}>Buy</BuyButton>
						<SellButton onClick={handleSellClick}>Sell</SellButton>
					</DivBSBtns>
				</Td>
			) : null}
			{/* <Td>{props.balance}</Td>
			<Td>
				<form action="#" method="POST">
					<Button onClick={handleClick}>Refresh</Button>
				</form>
			</Td> */}
		</Tr>
	)
}
