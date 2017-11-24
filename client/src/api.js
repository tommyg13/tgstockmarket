import axios from "axios";

export default {
    addNew: stock=>
           axios.post("https://tgstockmarket-gkazikas.c9users.io/addNew", { stock }).then(res => res.data.data),
    fetch: () =>
            axios.post("https://tgstockmarket-gkazikas.c9users.io/fetcStocks").then(res => res.data.stocks)
};