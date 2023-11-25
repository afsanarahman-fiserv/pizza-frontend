import { useLocation, useNavigate } from "react-router";
import { useState, useEffect } from "react";
import CustomerOrderService from "../../service/CustomerOrderService"
import GetCustomer from "../customer/GetCustomer";
import GetEmployee from "../employee/GetEmployee";
import GetDetails from "./GetDetails";

export default function ViewOrder() {
    let location  = useLocation();

    let [order, setOrder] = useState({
        order_id : '',
        customer : {
            phone_number : ''
        },
        employee : {
            employee_id : ''
        },
        order_status : '',
        timestamp : ''
    })

    useEffect(()=>{
        CustomerOrderService.findOrder(location.state.order_id).then((response)=>{
            setOrder(response.data);
        }, ()=>{
            alert("Failed to find order");
        });
    })

    let navigate = useNavigate();
    let markComplete = () => {
        let new_order = {
            order_id : order.order_id, 
            customer : {
                phone_number : order.customer.phone_number
            },
            employee : {
                employee_id : order.employee.employee_id
            },
            order_status : true
        }
        CustomerOrderService.updateOrder(new_order).then(()=>{
            alert("Order completed!");
        }, ()=>{
            alert("Order status update failed.")
        })
    }

    let editDetails = (order_id) => {
        navigate("/viewOrders/editOrder", {state : {order_id}});
    }

    if(order.order_status) {
        return(
            <>
            <div>
                <h3>Order Details</h3>
                <GetDetails order_id={order.order_id}/>
                <p>Time Completed: {order.timestamp}</p>
                <GetCustomer phone_number={order.customer.phone_number}/>
                <GetEmployee employee_id={order.employee.employee_id}/>
                <h3>STATUS: Complete</h3>
            </div>
            </>
        )
    } else {
        return(
            <>
            <div>
                <h3>Order Details</h3>
                <p>Time Placed: {order.timestamp}</p>
                <GetCustomer phone_number={order.customer.phone_number}/>
                <GetEmployee employee_id={order.employee.employee_id}/>
                <h3>STATUS: ACTIVE</h3>
                <button onClick={()=>{markComplete(order.order_id)}}>Mark Complete</button>
                <button onClick={()=>{editDetails(order.order_id)}}>Edit Order</button>
            </div>
            </>
        )
    }
        
}