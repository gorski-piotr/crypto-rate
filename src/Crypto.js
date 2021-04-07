import React, { Component } from "react";
import "./Crypto.css";
import axios from "axios";
import CryptoList from "./CryptoList";

export default class Crypto extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cryptoList: [],
      filteredCryptoList: [],
    };
  }

  componentDidMount() {
    this.getCryptoData();
    // console.log(this.state.cryptoList);

    this.timerID = setInterval(() => {
      this.getCryptoData();
    }, 5000);
  }
  componentDidUpdate() {
    console.log(this.state.cryptoList);
  }
  componentWillUnmount() {
    clearInterval(this.timerID);
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
          //   console.log(ticker, CryptoRate);
          //   console.log(newCryptoObj);
          newCryptoList.push(newCryptoObj);
          //   console.log(newCryptoList);

          let lastCryptoObj = state.cryptoList.find((cryptoObj) => {
            return cryptoObj.currency === ticker;
          });

          if (lastCryptoObj !== undefined) {
            if (lastCryptoObj.lastRate > newCryptoObj.lastRate) {
              newCryptoObj.cssClass = "red";
              newCryptoObj.htmlArrow = String.fromCharCode(8595);
            } else if (lastCryptoObj.lastRate < newCryptoObj.lastRate) {
              newCryptoObj.cssClass = "green";
              newCryptoObj.htmlArrow = String.fromCharCode(8593);
            } else {
              newCryptoObj.cssClass = "blue";
              newCryptoObj.htmlArrow = String.fromCharCode(8596);
            }
          } else {
            newCryptoObj.cssClass = "blue";
            newCryptoObj.htmlArrow = String.fromCharCode(8596);
          }

          //   console.log(lastCryptoObj);
        }

        return {
          cryptoList: newCryptoList,
        };
      });
      this.filterCryptoList();
    });
  };

  filterCryptoList = () => {
    this._inputFilter.value = this._inputFilter.value
      .trim()
      .toLocaleUpperCase();

    this.setState((state) => {
      let newFilteredCryptoList = state.cryptoList.filter((cryptoObj) => {
        return cryptoObj.currency.includes(this._inputFilter.value);
      });

      return {
        filteredCryptoList: newFilteredCryptoList,
      };
    });

    console.log(this._inputFilter.value);
  };

  render() {
    return (
      <div className="crypto">
        <input
          ref={(element) => {
            this._inputFilter = element;
          }}
          onChange={this.filterCryptoList}
          type="text"
          placeholder="Filter"
        />
        <CryptoList cryptoList={this.state.filteredCryptoList} />
      </div>
    );
  }
}
