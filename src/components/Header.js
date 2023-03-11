import React, { Component } from "react"
import logo from "../Assets/logo.png"
import styled from "styled-components"

const AppHeader = styled.header`
	background-color: #282c34;
	min-height: 20vh;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	font-size: 2rem;
	color: white;
`

const Img = styled.img`
	width: 200px;
	padding: 10px;
`

const Hr = styled.hr`
	margin-top: 20px;
	color: white;
	width: 30rem;
`

export default class Header extends Component {
	render() {
		return (
			<AppHeader>
				<Img src={logo} className="App-logo" alt="logo" />
				<h1>Gil's Coin Exchange</h1>
				<Hr />
			</AppHeader>
		)
	}
}
