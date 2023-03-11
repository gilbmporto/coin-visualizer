import React from "react"

function Coin({ name, symbol, price }) {
	return (
		<tr className="coin-row">
			<td>{name}</td>
			<td>{symbol}</td>
			<td>{price}</td>
		</tr>
	)
}

export default Coin
