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
                            <h4>Order #{order.order_id}</h4>
                            <GetDetails order_id={order.order_id}/>
                            <GetCustomer phone_number={order.customer.phone_number}/>
                            <GetEmployee employee_id={order.employee.employee_id}/>
                            <button onClick={()=>{markComplete(order.order_id, order.customer.phone_number, order.employee.employee_id)}}>Mark Complete</button>
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