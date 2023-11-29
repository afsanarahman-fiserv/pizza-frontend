import React, {useEffect, useState} from "react";
import CustomerOrderService from "../../../service/CustomerOrderService"
import { Link, useLocation, useNavigate } from 'react-router-dom'
import ListOrders from "./ListOrders";

export default function ViewAllOrders() {
    let [ordersState, setOrdersState] = useState({
        orders: []
    });

    useEffect(() => {
        CustomerOrderService.getAllOrders().then((response)=>{
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
        navigate("/viewAllOrders/byDate", {state : {week_strings}});
    }

    let goToEmployees = () => {
        navigate("/viewAllOrders/byEmployee");
    }

    let goToZips = () => {
        navigate("/viewAllOrders/byZip");
    }

    return(
        <div className ="App">
            <h3>All Orders</h3>

        <p>Enter a Date to View Week's Orders:</p>
        <form onSubmit={handleDateSubmit}>
            <input id="date-input" type="date"/>
            <input type="submit" value="Search"/>
        </form>
        <p id="viewing">Viewing: All</p>

        <header className="App-header4">
        <br/>
        <button onClick={goToEmployees}>View By Employee</button>
        <button onClick={goToZips}>View By ZIP</button>
        <br/>
        <div id="orders">
        <ListOrders orders={ordersState.orders}/>
        </div>
        <Link className="edit-link2" to="/viewActiveOrders">
            <button>View Active Orders</button>
        </Link>
        <br/>
        <Link className="edit-link3" to="/">
            <button>Back to Main Menu</button>
        </Link>
        </header>
        </div>
    );
}