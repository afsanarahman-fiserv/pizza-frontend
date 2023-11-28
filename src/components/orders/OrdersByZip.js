import { useState, useEffect } from "react";
import CustomerOrderService from "../../service/CustomerOrderService";
import { useLocation, useNavigate } from "react-router-dom";
import GetCustomer from "../customer/GetCustomer";
import GetEmployee from "../employee/GetEmployee";
import GetDetails from "../details/GetDetails";

export default function OrdersByZip() {
    let location = useLocation();

    let [ordersState, setOrdersState] = useState({
        orders: []
    });

    useEffect(() => {
        CustomerOrderService.getOrderByZip(location.state.zip_code).then((response)=>{
            setOrdersState(()=>({
                orders : response.data
            }));
        }, ()=>{});
    }, []);

    let navigate = useNavigate();
    let goBack = () => {
        navigate("/viewAllOrders/byZip");
    }

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

    return(
        <div className ="App">
            <h3>All Orders</h3>
        <header className="App-header3">
        <button onClick={goBack}>Select Different Zip</button>
        </header>
        {
            ordersState.orders.map((order) => {
                if(order.order_status) {
                    return(
                        <header className="App-header4">
                        <div>
                            <h4>Order #{order.order_id} - COMPLETE</h4>
                            <GetDetails order_id={order.order_id}/>
                            <br/>
                                <h5>Time Placed:</h5>{order.createdAt}
                            <br/>
                            <GetCustomer phone_number={order.customer.phone_number}/>
                            <GetEmployee employee_id={order.employee.employee_id}/>
                        </div>
                        </header>
                    )
                } else {
                    return(
                        <header className="App-header4">
                        <div>
                            <h4>Order #{order.order_id} - ACTIVE</h4>
                            <GetDetails order_id={order.order_id}/>
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
        <header className="App-header4"></header>
        </div>
    );
}