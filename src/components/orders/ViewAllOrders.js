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

    let getNumDetails = (order_id) => {
        let order_details = detailsState.details.filter((detail) => detail.order_id === order_id);
        return order_details.length;
    }

    return(
        <>
        <h3>All Orders</h3>
        <button onClick={goToEmployees}>View By Employee</button>
        <button onClick={goToZips}>View By ZIP</button>
        <button>View By Week</button>
        {
            ordersState.orders.map((order) => {
                let num_details = getNumDetails(order.order_id);
                if(num_details != 0) {
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
                                <button onClick={()=>{markComplete(order.order_id, order.customer.phone_number, order.employee.employee_id)}}>Mark Complete</button>
                                <button onClick={()=>{editOrder(order.order_id)}}>Edit Order</button>
                            </div>
                        )
                    }
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