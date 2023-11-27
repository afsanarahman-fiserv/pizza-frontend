import { Link, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react";
import CustomerOrderService from "../../service/CustomerOrderService";
import OrderDetailService from "../../service/OrderDetailService";
import GetCustomer from "../customer/GetCustomer";
import GetEmployee from "../employee/GetEmployee";
import GetDetails from "../details/GetDetails";

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
    }
    let editOrder = (order_id) => {
        navigate("/viewOrders/editOrder", {state : {order_id}});
    }

    let getNumDetails = (order_id) => {
        let order_details = detailsState.details.filter((detail) => detail.order_id === order_id);
        return order_details.length;
    }

    return(
        <>
        <h3>Active Orders</h3>
        {
            ordersState.orders.map((order) => {
                let num_details = getNumDetails(order.order_id);
                if(num_details != 0) {
                    if(!order.order_status) {
                        return(
                            <div>
                                <h4>Order #{order.order_id}</h4>
                                <GetDetails order_id={order.order_id}/>
                                <GetCustomer phone_number={order.customer.phone_number}/>
                                <GetEmployee employee_id={order.employee.employee_id}/>
                                <button onClick={()=>{markComplete(order)}}>Mark Complete</button>
                                <button onClick={()=>{editOrder(order.order_id)}}>Edit Order</button>
                            </div>
                        )
                    }
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