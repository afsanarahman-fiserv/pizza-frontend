import React, {useEffect, useState} from "react";
import EmployeeService from "../../service/EmployeeService"
import { Link, useNavigate } from 'react-router-dom'
import { Table } from "react-bootstrap"; 

export default function ViewEmployees() {
    let [state, setState] = useState({
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
    let handleUpdate = (id) => {
        navigate('/employeeMenu/updateEmployee', {state : {id}})
    }

    let handleStatus = (id) => {
        navigate('/employeeMenu/deactivateEmployee', {state : {id}})
    }

    return(
        <>
        <h3>All Employees</h3>
        <div className= "table-wrapper">
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Role</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                {
                    state.employees.map((employee, i)=>{
                        return (
                            <tr>
                                <td>{employee.employee_id}</td>
                                <td>{employee.name}</td>
                                <td>{employee.employee_role}</td>
                                <td>{employee.employee_status}</td>
                                <td>
                                    <button onClick={()=>{handleUpdate(employee.employee_id)}}>Edit</button>
                                    <button onClick={()=>{handleStatus(employee.employee_id)}}>Change Status</button>
                                </td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </Table>
        <button>
            <Link to="/employeeMenu/addEmployee">Add New Employee</Link>
        </button>
        <Link to="/">
            <p>Back to Main Menu</p>
        </Link>
        </div>
        </>
    );
}