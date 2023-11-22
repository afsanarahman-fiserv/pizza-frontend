import { useLocation, useNavigate } from "react-router";
import { useState, useEffect } from "react";
import CustomerService from "../../service/CustomerService"
import CustomerOrderService from "../../service/CustomerOrderService"
import EmployeeService from "../../service/EmployeeService";

export default function ViewOrder() {
    let location  = useLocation();

    let [order, setOrder] = useState({
        order_id : '',
        phone_number : '',
        employee_id : '',
        order_status : '',
        timestamp : ''
    })

    useEffect(()=>{
        CustomerOrderService.findOrder(location.state.order_id).then((response)=>{
            setOrder(response.data);
        }, ()=>{
            // alert("Failed to find user");
        });
    })

    let [details, setDetailsState] = useState({
        details: []
    });

    let [customer, setCustomer] = useState({
        phone_number : '',
        name : '',
        street_address : '',
        zip_code : ''
    });

    useEffect(()=>{
        CustomerService.findCustomer(order.phone_number).then((response)=>{
            setCustomer(response.data);
        }, ()=>{
            // alert("Failed to find user");
        });
    })

    let [employee, setEmployee] = useState({
        employee_id : '',
        name : '',
        employee_role : '',
        employee_status : ''
    });

    useEffect(()=>{
        EmployeeService.findEmployee(order.employee_id).then((response)=>{
            setEmployee(response.data);
        }, ()=>{
            // alert("Failed to find user");
        });
    })

    let navigate = useNavigate();
    let markComplete = () => {
        let new_order = {
            order_id : order.order_id, 
            phone_number : order.phone_number, 
            employee_id : order.employee_id,
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
                <p>Time Completed: {order.timestamp}</p>
                <h3>Customer Info</h3>
                <p>Name: {customer.name}</p>
                <p>Phone: {customer.phone_number}</p>
                <p>Address: {customer.street_address}</p>
                <p>ZIP: {customer.zip_code}</p>
                <h3>Employee</h3>
                <p>ID: {employee.employee_id}</p>
                <p>Name: {employee.name}</p>
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
                <h3>Customer Info</h3>
                <p>Name: {customer.name}</p>
                <p>Phone: {customer.phone_number}</p>
                <p>Address: {customer.street_address}</p>
                <p>ZIP: {customer.zip_code}</p>
                <h3>Employee</h3>
                <p>ID: {employee.employee_id}</p>
                <p>Name: {employee.name}</p>
                <h3>STATUS: ACTIVE</h3>
                <button onClick={markComplete(order.order_id)}>Mark Complete</button>
                <button onClick={editDetails(order.order_id)}>Edit Order</button>
            </div>
            </>
        )
    }
        
}