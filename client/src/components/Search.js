import React from "react";
import { addStock } from "../actions/stock";
import Proptypes from "prop-types";
import { connect } from "react-redux";

class Search extends React.Component {
    
    state={
        data:"",
        error: ""
    }
    
    handleChange = e => {
        this.setState({data:e.target.value});
    }
    
    handleSubmit = e => {
        e.preventDefault();
        const { data }= this.state;
        //don't send the request if the input is empty
        return !data ? this.setState({error:"Can't be blank"}) :
        // send request for adding new stock
        this.props.addStock(data)
            .then(res=>res)
            .catch(err=>this.setState({error:err.response.data.error}));
    }
    
    render() {
        const { data, error } = this.state;
            return(
                <div className="stockItem add">
                    <form onSubmit={this.handleSubmit}>
                        <div>
                            <label htmlFor="stock">Add new stock</label>
                            <input name="stock" id="stock" onChange={this.handleChange} value={data}/>
                            { error && <span>{error}</span> }
                        </div>
                        <button type="submit">Add</button>
                    </form>
                </div>
            );
    }
}

Search.Proptypes= {
    addStock: Proptypes.func.isRequired
}

export default connect(null,{ addStock })(Search);