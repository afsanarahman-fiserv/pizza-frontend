import { useLocation, useNavigate } from "react-router"
import { useState, useEffect } from "react";
import CustomerOrderService from "../../service/CustomerOrderService";
import UpdateDetails from "../details/UpdateDetails";
import GetCustomer from "../customer/GetCustomer";
import GetEmployee from "../employee/GetEmployee";

export default function UpdateOrder() {
    let location = useLocation();

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
    let editCustomer = (phone_number) => {
        navigate('/viewCustomers/updateCustomer', {state : {phone_number}});
    }
    
    return(
        <>
        <h3>Order Details</h3>
        <UpdateDetails order_id={location.state.order_id}/>
        <p>Time Placed: {order.timestamp}</p>
        <GetCustomer phone_number={order.customer.phone_number}/>
        <button onClick={()=>{editCustomer(order.customer.phone_number)}}>Edit Customer</button>
        <GetEmployee employee_id={order.employee.employee_id}/>
        </>
    )
}