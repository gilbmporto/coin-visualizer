import React, { Component } from "react"
import CoinClass from "./CoinClass"
import styled from "styled-components"

const TableContainer = styled.div`
	margin: 20px auto;
	display: flex;
	flex-direction: column;
	align-items: center;
`

const Table = styled.table`
	padding: 10px;
	border: 2px solid white;
	border-collapse: collapse;
	border-radius: 10px;
`

const TableHead = styled.thead`
	padding: 10px;
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

export default class CoinList extends Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<TableContainer>
				<Table>
					<TableHead>
						<Tr>
							<Th>Name</Th>
							<Th>Symbol</Th>
							<Th>Price</Th>
							<Th>Balance</Th>
							<Th>Action</Th>
						</Tr>
					</TableHead>
					<tbody>
						{this.props.coinData.map((coin, index) => (
							<CoinClass
								key={index}
								{...coin} // Wow, that I didn't know. So simple like that, eh? Awesome Zsolt knows everything.
								handleRefresh={this.props.handleRefresh} // In order to explain what happens above, the spread operator alone creates the props with each key-value pair. Simple like that.
							/>
						))}
					</tbody>
				</Table>
			</TableContainer>
		)
	}
}
