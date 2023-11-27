import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import EmployeeService from "../../service/EmployeeService";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function SortByEmployee() {
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

    let navigate = useNavigate();
    let handleSelect = (employee_id) => {
        navigate("/viewAllOrders/byEmployee/selected", {state : {employee_id}});
    }

    return(
        <>
        <h3>Select an Employee</h3>
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
        <Link to="/viewAllOrders">
            <p>Back to All Orders</p>
        </Link>
        </>
    )
}