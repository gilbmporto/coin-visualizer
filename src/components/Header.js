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
	@media screen and (max-width: 500px) {
		width: 100%;
		min-width: 300px;
		text-align: center;
	}
`

const Img = styled.img`
	width: 200px;
	padding: 10px;
`

const Hr = styled.hr`
	margin-top: 20px;
	color: white;
	width: 30%;
	min-width: 300px;
	margin-bottom: 10px;
`

const LoginButton = styled.button`
	background-color: #674ea7;
	color: white;
	border: 2px solid white;
	border-radius: 10px;
	padding: 10px;
	font-size: 19px;
	margin: 20px auto;
	&:hover {
		background-color: #8e7cc3;
	}
`

export default function Header({ userLoggedIn, handleAccess }) {
	const handleThisClick = () => {
		let loginStatus = !userLoggedIn
		console.log(loginStatus)
		handleAccess(loginStatus)
	}

	return (
		<AppHeader>
			<Img src={logo} className="App-logo" alt="logo" />
			<h1>Gil's Coin Exchange</h1>
			<Hr />
			<LoginButton onClick={handleThisClick}>
				{userLoggedIn ? `Log out` : `Log in`}
			</LoginButton>
		</AppHeader>
	)
}
