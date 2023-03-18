import React from "react"
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
	width: 100%;
	text-align: center;
	margin: 0 auto;
`

const Img = styled.img`
	width: 200px;
	padding: 10px;
`

const Hr = styled.hr`
	margin-top: 20px;
	color: white;
	width: 30rem;
	margin-bottom: 30px;
`

export default function Header() {
	return (
		<AppHeader>
			<Img src={logo} className="App-logo" alt="logo" />
			<h1>Gil's Coin Exchange</h1>
			<Hr />
		</AppHeader>
	)
}
