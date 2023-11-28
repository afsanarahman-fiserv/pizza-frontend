import CustomerOrderService from "../../service/CustomerOrderService";
import EmployeeService from "../../service/EmployeeService";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Table } from "react-bootstrap"; 

export default function SelectEmployee() {
    let location  = useLocation();
    let customer = location.state.phone_number;

    let [empState, setState] = useState({
        employees: []
    });
    useEffect(() => {
        EmployeeService.getAllEmployees().then((response)=>{
            setState(()=>({
                employees : response.data
            }));
        }, ()=>{});
    }, []);

    let [orderState, setOrderState] = useState({
        orders : []
    });
    useEffect(() => {
        CustomerOrderService.getAllOrders().then((response)=>{
            setOrderState(()=>({
                orders : response.data
            }));
        }, ()=>{});
    }, []);
    let num = 1;
    if(orderState.orders.length != 0) {
        num = orderState.orders[orderState.orders.length-1].order_id + 1;
    }

    let navigate = useNavigate();
    let handleSelect = (employee_id) => {
        let order = {
            employee : {
                employee_id : employee_id
            },
            customer : {
                phone_number : customer
            }
        }
        CustomerOrderService.addOrder(order).then(()=>{
            navigate('/newOrder/createOrder', {state : {num}})
        }, (response)=>{
            alert(JSON.stringify(order));
            navigate('/newOrder/createOrder', {state : {num}});
        })
    }

    return(
        <div className ="App">
            <h3>Select an Employee</h3>
        <header className="App-header3">
        <div className= "table-wrapper">
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th></th>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Role</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                {
                    empState.employees.map((employee, i)=>{
                        return (
                            <tr>
                                <td>
                                    <button onClick={()=>{handleSelect(employee.employee_id)}}>Select</button>
                                </td>
                                <td>{employee.employee_id}</td>
                                <td>{employee.name}</td>
                                <td>{employee.employee_role}</td>
                                <td>{employee.employee_status}</td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </Table>
        </div>
        </header>
        <header className="App-header4">
        <Link className="edit-link2" to="/">
            <button>Back to Main Menu</button>
        </Link>
        <br/>
        </header>
        </div>
    );
}