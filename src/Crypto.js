import React, { Component } from "react";
import "./Crypto.css";
import axios from "axios";
import CryptoList from "./CryptoList";

export default class Crypto extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cryptoList: [],
    };
  }

  componentDidMount() {
    this.getCryptoData();
  }

  getCryptoData = () => {
    axios.get("https://blockchain.info/pl/ticker").then((res) => {
      //   console.log(res.data);

      const tickers = res.data;

      this.setState((state) => {
        let newCryptoList = [];

        for (const [ticker, CryptoRate] of Object.entries(tickers)) {
          let newCryptoObj = {
            currency: ticker,
            symbol: CryptoRate.symbol,
            lastRate: CryptoRate.last,
          };

          newCryptoList.push(newCryptoObj);
        }

        return {
          cryptoList: newCryptoList,
        };
      });
    });
  };

  render() {
    return (
      <div className="crypto">
        <CryptoList cryptoList={this.state.cryptoList} />
      </div>
    );
  }
}
