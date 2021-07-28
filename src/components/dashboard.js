import React from "react";
import { CRYPTO_COMPARE } from "../keys";
import { TradingViewEmbed, widgetType } from "react-tradingview-embed";

class Dashboard extends React.Component {

  state = {
    times: [],
    high: [],
    low: [],
    chartData: [],
    query: "BTC",
    leaderboard: [],
    addressData: "",
    symbol: ""
  };

  componentDidMount() {
    this.loadChartData();
  }

  loadChartData = async () => {
    const response = await fetch(
      `https://min-api.cryptocompare.com/data/blockchain/histo/day?fsym=${this.state.query}&api_key=${CRYPTO_COMPARE}&limit=30`
    );
    const data = await response.json();
    const bulkData = data.Data.Data;
    const dataArray = [];
  
    bulkData.map((y) =>
      dataArray.push({
        x: y.time * 1000,
        y: y.transaction_count * y.average_transaction_value
      })
    );
  
    this.setState({ chartData: dataArray });
    this.setState({ symbol: this.state.query });
  };

  handleInputChange = () => {
    this.setState({
      query: this.search.value
    });
  };
  render() {
    const { query } = this.state;

    return (
      <div>
        <div className="charty">
          {query.length > 2 ? (
            <TradingViewEmbed
              widgetType={widgetType.ADVANCED_CHART}
              widgetConfig={{
                interval: "1D",
                colorTheme: "dark",
                width: "100%",
                height: "900px",
                symbol: query + "USD",
                studies: [
                  "MACD@tv-basicstudies",
                ],
                autosize: false,
              }}
            />
          ) : (
            "BTCUSD"
          )}
        </div>
      </div>
    );
  }
}

export default Dashboard;
