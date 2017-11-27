import { ADD_NEW, FETCH_STOCK, REMOVE_STOCK } from "./types";

export default function rootReducer(state=[],action={}) {
    switch (action.type) {
        case FETCH_STOCK:
            return action.data;
        case ADD_NEW: 
            return [...state,action.data];
        case REMOVE_STOCK:
            return state.filter(stock => stock._id !== action.id);
            default:
       return state;

    }
    
}