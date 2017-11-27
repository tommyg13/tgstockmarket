import React from 'react';
import Proptypes from "prop-types";
import { connect } from "react-redux";
import { removeStock } from "../actions/stock";

class Stocks extends React.Component {
    handleRemove= (id) => {
        this.props.removeStock(id)
            .then(res=>res);
    }
    
    render() {
        const names=this.props.data.map((stock,i)=>{
            return <div className="stockItem" key={i}><span>{stock.code}</span><p className="stockName">{stock.stockName}</p><span className="close" onClick={()=>this.handleRemove(stock._id)}>X</span></div>;
        });
            return[names];
    }
}

Stocks.Proptypes= {
    data: Proptypes.array,
    removeStock: Proptypes.func
};

export default connect(null,{ removeStock} )(Stocks);

