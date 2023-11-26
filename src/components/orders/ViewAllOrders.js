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
    let handleSelect = (order_id) => {
        navigate('/viewOrders/viewOrder', {state : {order_id}})
    }

    return(
        <>
        <h3>All Orders</h3>
        {
            ordersState.orders.map((order) => {
                if(order.order_status) {
                    return(
                        <div onClick={()=>{handleSelect(order.order_id)}}>
                            <h4>Order #{order.order_id} - COMPLETE</h4>
                            <GetDetails order_id={order.order_id}/>
                            <GetCustomer phone_number={order.customer.phone_number}/>
                            <GetEmployee employee_id={order.employee.employee_id}/>
                        </div>
                    )
                } else {
                    return(
                        <div onClick={()=>{handleSelect(order.order_id)}}>
                            <h4>Order #{order.order_id} - ACTIVE</h4>
                            <GetDetails order_id={order.order_id}/>
                            <GetCustomer phone_number={order.customer.phone_number}/>
                            <GetEmployee employee_id={order.employee.employee_id}/>
                        </div>
                    )
                }
                
            })
        }
        <Link to="/viewActiveOrders">
            <p>View Active Orders</p>
        </Link>
        <Link to="/">
            <p>Back to Main Menu</p>
        </Link>
        </>
    );
}