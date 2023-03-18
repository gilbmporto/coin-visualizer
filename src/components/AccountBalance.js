import React from "react"
import styled from "styled-components"

const Div = styled.div`
	padding: 10px;
	margin-bottom: 20px;
	width: 35vw;
	max-width: 500px;
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
	padding: 12px;
	width: 200px;
	text-align: center;
	cursor: pointer;
	&:hover {
		background-color: #3131e9;
	}
`

export default function AccountBalance(props) {
	const toggleBalance = (e) => {
		e.preventDefault()
		props.updateShowBalance(props.showBalance)
	}

	let buttonText = props.showBalance === true ? "Hide Balance" : "Show Balance"

	return (
		<Div>
			Account Balance: US$
			{props.showBalance === true ? props.balance : " - "}
			<BalanceButton onClick={toggleBalance}>{buttonText}</BalanceButton>
		</Div>
	)
}
