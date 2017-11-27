import React from "react";
import { addStock } from "../actions/stock";
import Proptypes from "prop-types";
import { connect } from "react-redux";

class Search extends React.Component {
    
    state={
        data:"",
        error: "",
        disabled: true
    }
    
    handleChange = e => {
        this.setState({data:e.target.value,error:"",disabled:false});
    }
    
    handleSubmit = e => {
        e.preventDefault();
        const { data }= this.state;
        //don't send the request if the input is empty
        this.setState({disabled:true,error:""});
        return !data.trim() ? this.setState({error:"Can't be blank",disabled:false}) :
        // send request for adding new stock
        this.props.addStock(data)
            .then(res=>{
                this.setState({disabled:false,data:""});
                return res;
            })
            .catch(err=>this.setState({error:err.response.data.error,disabled:false}));
    }
    
    render() {
        const { data, error, disabled } = this.state;
            return(
                <div className="stockItem add">
                    <form onSubmit={this.handleSubmit}>
                    <div className="messages">
                            { error && <span>{error}</span> }                    
                    </div>
                        <div>
                            <input name="stock" id="stock" onChange={this.handleChange} value={data} placeholder="Add new stock"/>
                        </div>
                        <div><button type="submit" disabled={disabled}>Add</button></div>
                    </form>
                </div>
            );
    }
}

Search.Proptypes= {
    addStock: Proptypes.func.isRequired
}

export default connect(null,{ addStock })(Search);