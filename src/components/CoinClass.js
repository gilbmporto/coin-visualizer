import React, { Component } from "react"
import styled from "styled-components"

const Tr = styled.tr`
	border-top: 1px solid white;
`

const Td = styled.td`
	padding: 10px;
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

export default class CoinClass extends Component {
	constructor(props) {
		super(props)
		this.handleClick = this.handleClick.bind(this)
	}

	// componentDidMount() {
	// 	const callback = () => {
	// 		const randomPercent = 0.995 + Math.random() * 0.01
	// 		console.log(randomPercent)
	// 		this.setState((oldState) => {
	// 			return {
	// 				price: oldState.price * randomPercent,
	// 			}
	// 		})
	// 	}
	// 	setInterval(callback, 1000)
	// }

	handleClick(e) {
		e.preventDefault()
		this.props.handleRefresh(this.props.symbol)
	}

	render() {
		return (
			<Tr>
				<Td>{this.props.name}</Td>
				<Td>{this.props.symbol}</Td>
				<Td>US$ {this.props.price.toFixed(2)}</Td>
				<Td>
					<form action="#" method="POST">
						<Button onClick={this.handleClick}>Refresh</Button>
					</form>
				</Td>
			</Tr>
		)
	}
}
