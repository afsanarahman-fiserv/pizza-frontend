import React, {useEffect, useState} from "react";
import CustomerOrderService from "../../service/CustomerOrderService"
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

    let navigate = useNavigate();

    let markComplete = (order_id, phone_number, employee_id) => {
        let new_order = {
            order_id : order_id,
            customer : {
                phone_number : phone_number
            }, 
            employee : {
                employee_id : employee_id
            },
            order_status : true
        }
        alert(new_order.data)
        CustomerOrderService.updateOrder(new_order).then(()=>{
            alert("Order marked complete");
        }, ()=>{
            alert("Order update failed");
        })
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
                if(order.order_status) {
                    return(
                        <header className="App-header4">
                        <div onClick={()=>{handleSelect(order.order_id)}}>
                            <h2>Order #{order.order_id} - COMPLETE</h2>
                            <GetDetails order_id={order.order_id}/>
                            <GetCustomer phone_number={order.customer.phone_number}/>
                            <GetEmployee employee_id={order.employee.employee_id}/>
                        </div>
                        </header>
                    )
                } else {
                    return(
                        <header className="App-header4">
                        <div onClick={()=>{handleSelect(order.order_id)}}>
                            <h4>Order #{order.order_id} - ACTIVE</h4>
                            <GetDetails order_id={order.order_id}/>
                            <GetCustomer phone_number={order.customer.phone_number}/>
                            <GetEmployee employee_id={order.employee.employee_id}/>
                            <button onClick={()=>{markComplete(order.order_id, order.customer.phone_number, order.employee.employee_id)}}>Mark Complete</button>
                            <button onClick={()=>{editOrder(order.order_id)}}>Edit Order</button>
                            <br/>
                        </div>
                        </header>
                    )
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