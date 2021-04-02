import React from "react";
import "./CryptoList.css";

function CryptoList(props) {
  let cryptoList = props.cryptoList;
  //   console.log(cryptoList);
  let liElements = cryptoList.map((cryptoObj) => {
    return (
      <li key={cryptoObj.currency}>
        <span className="crypto-label">Last rate: </span>
        <span className={`crypto-rate ${cryptoObj.cssClass}`}>
          {cryptoObj.lastRate} {cryptoObj.htmlArrow}
        </span>
        <span className="currency">{cryptoObj.currency}</span>
        <span className="currency-symbol">[{cryptoObj.symbol}]</span>
      </li>
    );
  });
  return (
    <div className="crypto-list">
      <ul className="the-list">{liElements}</ul>
    </div>
  );
}

export default CryptoList;
