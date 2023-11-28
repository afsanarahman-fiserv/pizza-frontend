import { Link, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react";
import CustomerOrderService from "../../service/CustomerOrderService";
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
    let deleteOrder = (order_id) => {
        navigate("/viewOrders/deleteOrder", {state : {order_id}});
    }

    return(
        <div className ="App">
            <h3>Active Orders</h3>
        {
            ordersState.orders.map((order) => {
                if(!order.order_status) {
                    return(
                        <header className="App-header4">
                        <div>
                            <br/>
                            <h4>Order #{order.order_id}</h4>
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
            })
        }
        <header className="App-header4">
        <Link className="edit-link4" to="/viewAllOrders">
            <button>View All Orders</button>
        </Link>
        <br/>
        <Link className="edit-link3" to="/">
            <button>Back to Main Menu</button>
        </Link>
        </header>
        </div>
    )
}