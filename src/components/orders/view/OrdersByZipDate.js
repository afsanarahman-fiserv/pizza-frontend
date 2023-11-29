import { useState, useEffect } from "react";
import CustomerOrderService from "../../../service/CustomerOrderService";
import { useLocation, useNavigate } from "react-router-dom";
import ListOrders from "./ListOrders";

export default function OrdersByEmployee() {
    let location = useLocation();

    let [ordersState, setOrdersState] = useState({
        orders: []
    });

    useEffect(() => {
        CustomerOrderService.getOrderByZip(location.state.zip_code).then((response)=>{
            console.log(response);
            setOrdersState(()=>({
                orders : response.data
            }));
        }, ()=>{});
    }, []);

    let viewing = "Viewing: " + location.state.week_strings[0] + "  =>  " + location.state.week_strings[7];
    let filtered_orders = [];
    for(let i = 0; i < ordersState.orders.length; i++) {
        let order = ordersState.orders[i];
        let index = order.createdAt.indexOf("T");
        let time = order.createdAt.substring(0, index);
        if(location.state.week_strings.includes(time)) {
            filtered_orders.push(order);
        }
    }

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

        <p>Enter a Date to View Week's Orders:</p>
        <form onSubmit={handleDateSubmit}>
            <input id="date-input" type="date"/>
            <input type="submit" value="Search"/>
        </form>
        <p id="viewing">{viewing}</p>

        <header className="App-header3">
        <button onClick={goBack}>Select Different Zip Code</button>
        </header>
        <ListOrders orders={filtered_orders}/>
        <header className="App-header4"></header>
        </div>
    )
}