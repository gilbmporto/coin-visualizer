import React, { Component } from "react"
import styled from "styled-components"

const Div = styled.div`
	padding: 10px;
	margin-bottom: 20px;
	width: 28vw;
	min-width: 280px;
	font-size: 22px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	border: 1px solid white;
	border-radius: 15px;
`

const BalanceButton = styled.button`
	margin-top: 10px;
	font-size: 22px;
	background-color: darkblue;
	color: white;
	border: 2px solid white;
	border-radius: 15px;
	padding: 10px;
	width: 200px;
	text-align: center;
	cursor: pointer;
	&:hover {
		background-color: #3131e9;
	}
`

export default class AccountBalance extends Component {
	constructor(props) {
		super(props)
		this.toggleBalance = this.toggleBalance.bind(this)
	}

	toggleBalance(e) {
		e.preventDefault()
		this.props.updateShowBalance(this.props.showBalance)
	}

	render() {
		let buttonText =
			this.props.showBalance === true ? "Hide Balance" : "Show Balance"

		return (
			<Div>
				Account Balance: US$
				{this.props.showBalance === true ? this.props.balance : " - "}
				<BalanceButton onClick={this.toggleBalance}>{buttonText}</BalanceButton>
			</Div>
		)
	}
}
