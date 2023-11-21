import { Link, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react";
import CustomerOrderService from "../../service/CustomerOrderService";
import CustomerService from "../../service/CustomerService";
import EmployeeService from "../../service/EmployeeService";

export default function ViewActiveOrders() {
    let [ordersState, setOrdersState] = useState({
        orders: []
    });

    let [customer, setCustState] = useState({
        phone_number : '',
        name : '',
        street_address : '',
        zip_code : ''
    });

    let [employee, setEmpState] = useState({
        employee_id : '',
        name : '',
        employee_role : '',
        employee_status : ''
    });

    useEffect(() => {
        CustomerOrderService.getAllCustomers().then((response)=>{
            setOrdersState(()=>({
                orders : response.data
            }));
        }, ()=>{});
    }, []);

    let getCustomerDetails = (phone_number) => {
        CustomerService.findCustomer(phone_number).then((response)=>{
            setCustState(response.data);
        }, ()=>{
            alert("Customer not found");
        });
    }

    let getEmployeeDetails = (employee_id) => {
        EmployeeService.findEmployee(employee_id).then((response)=>{
            setEmpState(response.data);
        }, ()=>{
            alert("Employee not found");
        });
    }

    let navigate = useNavigate();
    let handleSelect = (order_id) => {
        navigate('/newOrder/viewOrder', {state : {order_id}})
    }

    return(
        <>
        <h3>Active Orders</h3>
        {
            ordersState.orders.map((order) => {
                getCustomerDetails(order.phone_number);
                getEmployeeDetails(order.employee_id);
                return(
                    <div onClick={handleSelect(order.order_id)}>
                        <h4>Order Details</h4>
                        <h4>Customer</h4>
                        <p>Name: {customer.name}</p>
                        <p>Phone: {customer.phone_number}</p>
                        <p>Street Address: {customer.street_address}</p>
                        <p>ZIP: {customer.zip_code}</p>
                        <h4>Employee</h4>
                        <p>Name: {employee.name}</p>
                        <p>ID: {employee.employee_id}</p>
                    </div>
                )
            })
        }
        <Link to="/viewAllOrders">
            <p>View All Orders</p>
        </Link>
        </>
    )
}