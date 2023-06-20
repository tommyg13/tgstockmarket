import React from "react";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";

export default class Chart extends React.Component {
  render() {
    let seriesOptions = [];
    this.props.dataset.map((stocks) => {
      stocks.stockData = stocks.stockData.map((stock) => {
        stock[0] = new Date(stock[0]).getTime();
        return stock;
      });
      let options = { name: stocks.code, data: stocks.stockData.sort() };
      seriesOptions.push(options);
      return seriesOptions;
    });

    var config = {
      title: {
        text: "Stocks",
      },
      series: seriesOptions,
      yAxis: {
        labels: {
          formatter: function () {
            return (this.value > 0 ? " + " : "") + this.value + "%";
          },
        },
        plotLines: [
          {
            value: 0,
            width: 2,
            color: "silver",
          },
        ],
      },
      chart: {
        animation: {
          duration: 1000,
          easing: "easeOutBounce",
        },
        backgroundColor: {
          linearGradient: [0, 0, 250, 500],
          stops: [
            [0, "rgb(48, 96, 48)"],
            [1, "rgb(0, 0, 0)"],
          ],
        },
        borderColor: "#000000",
        borderWidth: 2,
        className: "dark-container",
        plotBackgroundColor: "rgba(255, 255, 255, .1)",
        plotBorderColor: "#CCCCCC",
        plotBorderWidth: 1,
      },
      colors: [
        "#DDDF0D",
        "#55BF3B",
        "#DF5353",
        "#7798BF",
        "#aaeeee",
        "#ff0066",
        "#eeaaee",
        "#55BF3B",
        "#DF5353",
        "#7798BF",
        "#aaeeee",
      ],
      subtitle: {
        style: {
          color: "#ece1e1",
          font: 'bold 12px "Trebuchet MS", Verdana, sans-serif',
        },
      },
    };

    return <HighchartsReact config={config}></HighchartsReact>;
  }
}
