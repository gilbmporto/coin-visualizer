import React, { Component } from "react"
import Coin from "./Coin"
import styled from "styled-components"

const TableContainer = styled.div`
	margin: 20px auto;
	min-width: 300px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	text-align: center;
`

const Table = styled.table`
	padding: 10px;
	border: 2px solid white;
	border-collapse: collapse;
	border-radius: 10px;
	text-align: center;
	margin: 0 auto;
`

const TableHead = styled.thead`
	padding: 8px;
	border: 1px solid white;
	font-size: 19px;
`

const Tr = styled.tr`
	border-top: 1px solid white;
`

const Th = styled.th`
	padding: 10px;
	border: 1px solid white;
	font-size: 19px;
`

export default function CoinList(props) {
	return (
		<TableContainer>
			<Table>
				<TableHead>
					<Tr>
						<Th>Name</Th>
						<Th>Symbol</Th>
						<Th>Logo</Th>
						<Th>Price</Th>
						{props.userLoggedIn ? (
							<>
								<Th>Balance</Th>
								<Th>Actions</Th>
							</>
						) : null}
					</Tr>
				</TableHead>
				<tbody>
					{props.coinData.map((coin, index) => (
						<Coin
							key={index}
							{...coin} // Wow, that I didn't know. So simple like that, eh? Awesome Zsolt knows everything.
							handleRefresh={props.handleRefresh} // In order to explain what happens above, the spread operator alone creates the props with each key-value pair. Simple like that.
							userLoggedIn={props.userLoggedIn}
							handleBuy={props.handleBuy}
							handleSell={props.handleSell}
							showBalance={props.showBalance}
						/>
					))}
				</tbody>
			</Table>
		</TableContainer>
	)
}
