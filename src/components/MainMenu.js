import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Link } from 'react-router-dom'

export default function MainMenu() {
    return(
        <>
        <h2>Main Menu</h2>
        <Link to="/newOrder">
            <button>New Order</button>
        </Link>
        <br/>
        <Link to="/viewOrders">
            <button>View Orders</button>
        </Link>
        <br/>
        <Link to="/employeeMenu/viewEmployees">
            <button>View Employees</button>
        </Link>
        </>
    )
}