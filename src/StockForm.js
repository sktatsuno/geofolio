import React, { useState } from "react";

export default function StockForm(props) {
  const [symbol, setSymbol] = useState("");
  const [shares, setShares] = useState("");
  
  const handleSubmit = (evt) => {
      evt.preventDefault();
      alert(`Adding symbol ${symbol}`)
      alert(`Adding shares ${shares}`)
  }
  return (
    <form id="stockForm" onSubmit={handleSubmit}>
      <label>
        Symbol:
        <input
          type="text"
          value={symbol}
          onChange={e => setSymbol(e.target.value)}
        />
      </label>
      <label>
        Shares:
        <input
          type="text"
          value={shares}
          onChange={e => setShares(e.target.value)}
        />
      </label>
      <input type="submit" value="Submit" />
    </form>
  );
}