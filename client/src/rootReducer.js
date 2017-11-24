import { ADD_NEW, FETCH_STOCK } from "./types";
export default function rootReducer(state=[],action={}) {
    switch (action.type) {
        case FETCH_STOCK:
            return action.data;
        case ADD_NEW: 
            return action.data;
            default:
       return state;

    }
    
}