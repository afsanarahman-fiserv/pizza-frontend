import React, {useEffect, useState} from "react";
import CustomerOrderService from "../../service/CustomerOrderService"
import OrderDetailService from "../../service/OrderDetailService";
import { Link, useNavigate } from 'react-router-dom'
import GetEmployee from "../employee/GetEmployee";
import GetCustomer from "../customer/GetCustomer";
import GetDetails from "../details/GetDetails";

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

    let [detailsState, setDetails] = useState({
        details : []
    })

    useEffect(() => {
        OrderDetailService.getAllOrderDetails().then((response)=>{
            setDetails(()=>({
                details : response.data
            }));
        }, ()=>{});
    }, []);

    let navigate = useNavigate();

    let markComplete = (order) => {
        order.order_status = true;
        CustomerOrderService.updateOrder(order).then(()=>{
            alert("Order marked complete");
        }, ()=>{
            alert("Order update failed");
        })
        window.location.reload()
    }
    let editOrder = (order_id) => {
        navigate("/viewOrders/editOrder", {state : {order_id}});
    }

    let handleSelect = (order_id) => {
        navigate('/viewOrders/viewOrder', {state : {order_id}})
    }

    let goToEmployees = () => {
        navigate("/viewAllOrders/byEmployee");
    }

    let goToZips = () => {
        navigate("/viewAllOrders/byZip");
    }

    let getNumDetails = (order_id) => {
        let order_details = detailsState.details.filter((detail) => detail.order_id === order_id);
        return order_details.length;
    }

    return(
        <div className ="App">
            <h3>All Orders</h3>
        <header className="App-header3">
        <button onClick={goToEmployees}>View By Employee</button>
        <button onClick={goToZips}>View By ZIP</button>
        <button>View By Week</button>
        </header>
        {
            ordersState.orders.map((order) => {
                let num_details = getNumDetails(order.order_id);
                if(num_details != 0) {
                    if(order.order_status) {
                        return(
                        <header className="App-header4">
                        <div>
                            <h4>Order #{order.order_id} - COMPLETE</h4>
                            <GetDetails order_id={order.order_id}/>
                            <br/>
                                <h5>Time Completed:</h5>{order.createdAt}
                            <br/>
                            <GetCustomer phone_number={order.customer.phone_number}/>
                            <GetEmployee employee_id={order.employee.employee_id}/>
                            <br/>
                        </div>
                        </header>
                        )
                    } else {
                        return(
                        <header className="App-header4">
                        <div>
                            <h4>Order #{order.order_id} - ACTIVE</h4>
                            <GetDetails order_id={order.order_id}/>
                            <br/>
                                <h5>Time Placed:</h5>{order.createdAt}
                            <br/>
                            <GetCustomer phone_number={order.customer.phone_number}/>
                            <GetEmployee employee_id={order.employee.employee_id}/>
                            <button onClick={()=>{markComplete(order)}}>Mark Complete</button>
                            <button onClick={()=>{editOrder(order.order_id)}}>Edit Order</button>
                        </div>
                        </header>
                        )
                    }
                }
            })
        }
        <header className="App-header4">
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