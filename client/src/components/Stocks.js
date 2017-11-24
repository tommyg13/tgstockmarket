import React from 'react';
import Proptypes from "prop-types";

export default class Stocks extends React.Component {
    render() {
        const names=this.props.data.map((stock,i)=>{
            return <li key={i}>{stock.stockID}</li>;
        });
            return(
                <div className="stockItem">
                <ol>{names}</ol>
                </div>
            );
    }
}

Stocks.Proptypes= {
    data: Proptypes.array
};