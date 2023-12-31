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
        CustomerOrderService.getOrderByEmployee(location.state.employee_id).then((response)=>{
            console.log(response);
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
        navigate("/viewAllOrders/byDate/emp", {state : {week_strings : week_strings, employee_id : location.state.employee_id}});
    }

    let goBack = () => {
        navigate("/viewAllOrders/byEmployee");
    }

    return(
        <div className ="App">
            <h3>Employee #{location.state.employee_id}'s Orders</h3>
        <header className="App-header4">
        <br/>
        <h4>Enter a Date to View Week's Orders:</h4>
        <form onSubmit={handleDateSubmit}>
            <input id="date-input" type="date"/>
            <input type="submit" value="Search"/>
        </form>
        <h5 id="viewing">Viewing: All</h5>
        <br/>
        <button onClick={goBack}>Select Different Employee</button>
        <ListOrders orders={ordersState.orders}/>
        </header>
        </div>
    )
}