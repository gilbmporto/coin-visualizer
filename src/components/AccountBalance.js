import React, { Component } from "react"
import styled from "styled-components"

const Div = styled.div`
	padding: 10px;
	margin-bottom: 20px;
	width: 20vw;
	min-width: 280px;
	font-size: 22px;
	display: flex;
	flex-direction: row;
	justify-content: center;
	border: 1px solid white;
	border-radius: 15px;
`

export default class AccountBalance extends Component {
	render() {
		return <Div>Account Balance: US$ {this.props.balance}</Div>
	}
}
