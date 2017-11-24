// import axios from "axios";

// export default {
//     addNew: stock=>
//           axios.post("https://cors-anywhere.herokuapp.com/https://tgstockmarket-gkazikas.c9users.io/addNew", { stock }).then(res => res.data.data),
//     fetch: () =>
//             axios.post("https://cors-anywhere.herokuapp.com/https://tgstockmarket-gkazikas.c9users.io/fetcStocks").then(res => res.data.stocks)
// };

import axios from "axios";
const host = window.location.hostname;
export default {
    addNew: stock=>
          axios.post(`https://${host}/addNew`, { stock }).then(res => res.data.data),
    fetch: () =>
            axios.post(`https://${host}/fetcStocks`).then(res => res.data.stocks)
};