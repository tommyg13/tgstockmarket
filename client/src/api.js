import axios from "axios";

const host = window.location.hostname;
export default {
    addNew: stock=>
          axios.post(`https://${host}/addNew`, { stock }).then(res => res.data.data),
    fetch: () =>
            axios.post(`https://${host}/fetcStocks`).then(res => res.data.stocks),
    deleteStock: id =>
            axios.delete(`https://tgstockmarket-gkazikas.c9users.io/remove/${ id }`).then(res => res.data)             
};
