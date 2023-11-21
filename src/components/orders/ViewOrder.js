import { useLocation } from "react-router";
import { useState } from "react";

export default function ViewOrder() {
    let location  = useLocation();
    let order_id = location.state.order_id;

    let [order, setOrder] = useState({
        phone_number : '',
        employee_id : '',
        order_status : ''
    })

    useEffect(()=>{
        CustomerOrderService.findOrder(location.state.id).then((response)=>{
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

    return(
        <>
        <div>
            <h3>Order Details</h3>
            <h3>Customer Info</h3>
            <p>Name: {customer.name}</p>
            <p>Phone: {customer.phone_number}</p>
            <p>Address: {customer.street_address}</p>
            <p>ZIP: {customer.zip_code}</p>
            <h3>Employee</h3>
            <p>ID: {employee.employee_id}</p>
            <p>Name: {employee.name}</p>
        </div>
        </>
    )
}