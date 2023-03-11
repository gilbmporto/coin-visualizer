import React, { Component } from "react"

export default class CoinClass extends Component {
	constructor(props) {
		super(props)
		this.state = {
			price: this.props.price,
		}
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
		this.setState((oldState) => {
			return {
				price: oldState.price * 0.995,
			}
		})
	}

	render() {
		return (
			<tr className="coin-row">
				<td>{this.props.name}</td>
				<td>{this.props.symbol}</td>
				<td>US$ {this.state.price.toFixed(2)}</td>
				<td>
					<form action="#" method="POST">
						<button onClick={this.handleClick}>Refresh</button>
					</form>
				</td>
			</tr>
		)
	}
}
