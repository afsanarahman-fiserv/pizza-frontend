import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import GetDetails from "../../details/GetDetails";
import GetCustomer from "../../customer/GetCustomer";
import GetEmployee from "../../employee/GetEmployee";
import OrderDetailService from "../../../service/OrderDetailService";
import CustomerOrderService from "../../../service/CustomerOrderService";

export default function ListOrders({orders}) {
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

    let getNumDetails = (order_id) => {
        let order_details = detailsState.details.filter((detail) => detail.order_id === order_id);
        return order_details.length;
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
    let navigate = useNavigate();
    let editOrder = (order_id) => {
        navigate("/viewOrders/editOrder", {state : {order_id}});
    }

    if(Array.isArray(orders)) {
        return(
            orders.map((order) => {
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
        )      
    }
}