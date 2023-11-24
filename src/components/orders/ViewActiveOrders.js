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
        navigate("/viewOrders/editOrder", {state : order_id});
    }
    let deleteOrder = (order_id) => {
        navigate("/viewOrders/deleteOrder", {state : order_id});
    }

    return(
        <>
        <h3>Active Orders</h3>
        {
            ordersState.orders.map((order) => {
                if(!order.order_status) {
                    CustomerService.findCustomer(order.customer.phone_number).then((response)=>{
                        setCustState(response.data);
                    }, ()=>{});
                    EmployeeService.findEmployee(order.employee.employee_id).then((response)=>{
                        setEmpState(response.data);
                    }, ()=>{});
                    return(
                        <div>
                            <h4>Order #{order.order_id}</h4>
                            <h4>Customer</h4>
                            <button>
                                Edit Customer
                            </button>
                            <p>Name: {customer.name}</p>
                            <p>Phone: {customer.phone_number}</p>
                            <p>Street Address: {customer.street_address}</p>
                            <p>ZIP: {customer.zip_code}</p>
                            <h4>Employee</h4>
                            <button>
                                Change Employee
                            </button>
                            <p>Name: {employee.name}</p>
                            <p>ID: {employee.employee_id}</p>
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
        </>
    )
}