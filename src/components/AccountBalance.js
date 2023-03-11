import React, { Component } from "react"
import styled from "styled-components"

const Div = styled.div`
	padding: 10px;
	margin-bottom: 20px;
	width: 20vw;
	font-size: 22px;
	display: flex;
	flex-direction: row;
	justify-content: center;
	border: 1px solid white;
	border-radius: 15px;
`

export default class AccountBalance extends Component {
	render() {
		return (
			<Div className="balance-div">
				Account Balance: US$ {this.props.balance}
			</Div>
		)
	}
}
