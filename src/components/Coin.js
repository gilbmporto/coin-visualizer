import React from "react"
import styled from "styled-components"

const Tr = styled.tr`
	border-top: 1px solid white;
`

const Td = styled.td`
	padding: 8px;
	border: 1px solid white;
	font-size: 19px;
`

const Button = styled.button`
	padding: 10px;
	border: 1px solid white;
	border-radius: 10px;
	font-size: 19px;
	background-color: darkblue;
	color: white;
	cursor: pointer;
	&:hover {
		background-color: #3131e9;
	}
`

const Img = styled.img`
	width: 60px;
`

export default function Coin(props) {
	const handleClick = (e) => {
		e.preventDefault()
		props.handleRefresh(props.symbol)
	}

	return (
		<Tr>
			<Td>{props.name}</Td>
			<Td>{props.symbol}</Td>
			<Td>
				<Img src={props.logo} alt="token logo" />
			</Td>
			<Td>
				{typeof props.price === "number"
					? `US$ ${props.price.toFixed(2)}`
					: props.price}
			</Td>
			{/* <Td>{props.balance}</Td>
			<Td>
				<form action="#" method="POST">
					<Button onClick={handleClick}>Refresh</Button>
				</form>
			</Td> */}
		</Tr>
	)
}
