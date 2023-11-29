import { useState, useEffect } from "react";
import CustomerOrderService from "../../../service/CustomerOrderService";
import { useLocation, useNavigate } from "react-router-dom";
import ListOrders from "./ListOrders";

export default function OrdersByZip() {
    let location = useLocation();

    let [ordersState, setOrdersState] = useState({
        orders: []
    });

    useEffect(() => {
        CustomerOrderService.getOrderByZip(location.state.zip_code).then((response)=>{
            setOrdersState(()=>({
                orders : response.data
            }));
        }, ()=>{});
    }, []);

    let navigate = useNavigate();
    let handleDateSubmit = (e) => {
        e.preventDefault();
        let txt = document.getElementById("date-input").value;
        let tokens = txt.split("-");
        let start = new Date(parseInt(tokens[0]), (parseInt(tokens[1]) - 1), parseInt(tokens[2]));
        let week_strings = [];
        for(let i = 0; i <= 7; i++) {
            let day = new Date(start.getFullYear(), start.getMonth(), start.getDate()+i);
            week_strings[i] = day.getFullYear() + "-" + (day.getMonth() + 1) + "-" + day.getDate();
        }
        navigate("/viewAllOrders/byDate/zip", {state : {week_strings : week_strings, zip_code : location.state.zip_code}});
    }
    let goBack = () => {
        navigate("/viewAllOrders/byZip");
    }

    return(
        <div className ="App">
            <h3>ZIP: {location.state.zip_code} Orders</h3>
        <header className="App-header4">
        <br/>
        <h4>Enter a Date to View Week's Orders:</h4>
        <form onSubmit={handleDateSubmit}>
            <input id="date-input" type="date"/>
            <input type="submit" value="Search"/>
        </form>
        <h5 id="viewing">Viewing: All</h5>
        <br/>
        <button onClick={goBack}>Select Different Zip</button>
        <ListOrders orders={ordersState.orders}/>
        </header>
        </div>
    );
}