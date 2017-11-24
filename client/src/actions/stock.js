import { ADD_NEW, FETCH_STOCK } from "../types";
import api from "../api";

export const add_new = data =>({
   type:ADD_NEW,
   data
});
export const fetchData = data =>({
   type:FETCH_STOCK,
   data
});

export const addStock = stock => dispatch =>
    api.addNew(stock).then(data => dispatch(add_new(data)));
    
export const fetcStocks = () => dispatch =>
    api.fetch().then(data => dispatch(fetchData(data)));    