import React, { Component } from 'react';
import openSocket from 'socket.io-client';
import Search from "./components/Search";
import Stocks from "./components/Stocks";
import { connect } from "react-redux";
import Chart from "./components/Chart";

// const  socket = openSocket("https://tgstockmarket-gkazikas.c9users.io");
const  socket = openSocket();
class App extends Component {
    constructor(props) {
        super(props);
          this.state= {
            dataset: [],
            text: "loading"
          };
}
    componentWillReceiveProps(nextProps) {
        this.setState({dataset:nextProps.stocks,text:""});
           socket.on("stocks",res=>{
               "true"
             this.setState({
               dataset:res
             });
           });
    }

  render() {
      const { text, dataset } = this.state;
    return (
      <div className="App">
      {text ? <div className="loading">
            <span id="bubblingG_1">
        	</span>
        	<span id="bubblingG_2">
        	</span>
        	<span id="bubblingG_3">
        	</span>      
      </div>:
        <div className="stocksCont">
            {dataset.length > 0 &&<Chart dataset={dataset}/>}
          <div className="stocks">
          <Search />
          <Stocks data={dataset}/>
          </div>
        </div>
      }
      </div>
    );
  }
}

function mapStateToProps(state) {
    return {
        stocks: state
    };
}

export default connect(mapStateToProps)(App);