import React from "react";
import { Link } from 'react-router-dom'

export default function MainMenu() {
    return(
        <div className ="App">
            <header className="App-header">
            <Link className="edit-link" to="/viewCustomers">
                <button>Start New Order</button>
            </Link>
            <br/>
            <Link className="edit-link" to="/viewActiveOrders">
                <button>View Orders</button>
            </Link>
            <br/>
            <Link className="edit-link" to="/employeeMenu/viewEmployees">
                <button>View Employees</button>
            </Link>
            <br/>
            </header>
        </div>
    )
}