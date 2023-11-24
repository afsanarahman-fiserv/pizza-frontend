import { Link, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react";
import CustomerOrderService from "../../service/CustomerOrderService";
import CustomerService from "../../service/CustomerService";
import EmployeeService from "../../service/EmployeeService";
import GetCustomer from "../customer/GetCustomer";
import GetEmployee from "../employee/GetEmployee";

export default function ViewActiveOrders() {
    let [ordersState, setOrdersState] = useState({
        orders: []
    });

    useEffect(() => {
        CustomerOrderService.getAllOrders().then((response)=>{
            setOrdersState(()=>({
                orders : response.data
            }));
        }, ()=>{
            alert("Failed to find orders");
        });
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
        CustomerOrderService.updateOrder(new_order).then(()=>{
            alert("Order marked complete");
        }, ()=>{
            alert("Order update failed");
        })
    }
    let editOrder = (order_id) => {
        navigate("/viewOrders/editOrder", {state : {order_id}});
    }
    let deleteOrder = (order_id) => {
        navigate("/viewOrders/deleteOrder", {state : {order_id}});
    }

    return(
        <>
        <h3>Active Orders</h3>
        {
            ordersState.orders.map((order) => {
                if(!order.order_status) {
                    return(
                        <div>
                            <h4>Order #{order.order_id}</h4>
                            <GetCustomer phone_number={order.customer.phone_number}/>
                            <GetEmployee employee_id={order.employee.employee_id}/>
                            <button onClick={()=>{markComplete(order.order_id, order.customer.phone_number, order.employee.employee_id)}}>Mark Complete</button>
                            <button onClick={()=>{editOrder(order.order_id)}}>Edit Order</button>
                            <button onClick={()=>{deleteOrder(order.order_id)}}>Delete Order</button>
                        </div>
                    )
                }
            })
        }
        <Link to="/viewAllOrders">
            <p>View All Orders</p>
        </Link>
        <Link to="/">
            <p>Back to Main Menu</p>
        </Link>
        </>
    )
}