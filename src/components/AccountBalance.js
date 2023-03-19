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
	@media screen and (max-width: 500px) {
		width: 35vw;
		min-width: 300px;
		text-align: center;
	}
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

	let buttonText =
		props.showBalance === true ? "🤫 Hide Balance" : "👀 Show Balance"

	return (
		<Div>
			{props.showBalance === true
				? `Account Balance: US$ ${props.balance}`
				: `Account Balance: US$ -`}
			<BalanceButton onClick={toggleBalance}>{buttonText}</BalanceButton>
		</Div>
	)
}
