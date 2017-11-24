import React, { Component } from 'react';
import './App.css';
import openSocket from 'socket.io-client';
import Search from "./components/Search";
import Stocks from "./components/Stocks";
import { fetcStocks } from "./actions/stock";
import { connect } from "react-redux";

// const  socket = openSocket("https://tgstockmarket-gkazikas.c9users.io");
const  socket = openSocket();
class App extends Component {
      state= {
        dataset: [],
        text: ""
      }
       
      componentDidMount() {
         this.setState({text:"loading"});
      this.props.fetcStocks().then(res=> {
          return this.setState({dataset:res.data,text:""});
      });
       socket.on("stocks",res=>{
         this.setState({
           dataset:res
         });
       });
    }
    
  render() {
    return (
      <div className="App">
        <div className="stocks">
        <p>{this.state.text}</p>
          <Search />
          <Stocks data={this.state.dataset}/>
        </div>
      </div>
    );
  }
}

export default connect(null,{fetcStocks})(App);