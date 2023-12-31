import React, { useEffect, useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import EmployeeService from "../../service/EmployeeService";

export default function UpdateEmployee() {
    let location = useLocation();
    let [employee, setEmployee] = useState({
        employee_id : '',
        name: '',
        employee_role: '',
        employee_status: ''
    })

    useEffect(()=>{
        EmployeeService.findEmployee(location.state.id).then((response)=>{
            setEmployee(response.data);
        }, ()=>{
            // alert("Failed to find user");
        });
    })

    let [employee_id, setID] = useState('');
    let [employee_status, setStatus] = useState('');
    let [name, setName] = useState('');
    let [employee_role, setRole] = useState('');
    let handleID = (e) => { setID(e.target.value) }
    let handleStatus = (e) => { setStatus(e.target.value) }
    let handleName = (e) => { setName(e.target.value) }
    let handleRole = (e) => { setRole(e.target.value) }

    let navigate = useNavigate();
    let handleSubmit = (e) => {
        e.preventDefault();
        let new_employee = {employee_id : employee.employee_id, name : name, employee_role : employee_role, employee_status : employee.employee_status}
        if(new_employee.name.length == 0) {
            new_employee.name = employee.name;
        }
        if(new_employee.employee_role.length == 0) {
            new_employee.employee_role = employee.employee_role;
        }
        EmployeeService.updateEmployee(new_employee).then(()=>{
            alert("Employee updated successfully")
            navigate("/employeeMenu/viewEmployees");
        }, ()=>{
            alert("Employee update failed")
        });
    }

    return(
        <>
        <h3>Editing Employee</h3>
        <form onSubmit={handleSubmit}>
            <label>
                ID: <input onChange={handleID} type="text" value={employee_id} placeholder={employee.employee_id} disabled/>
            </label>
            <br/>
            <label>
                Status: <input onChange={handleStatus} type="text" value={employee_status} placeholder={employee.employee_status} disabled/>
            </label>
            <br/>
            <label>
                Name: <input onChange={handleName} type="text" value={name} placeholder={employee.name}/>
            </label>
            <br/>
            <label>
                Role: <input onChange={handleRole} type="text" value={employee_role} placeholder={employee.employee_role}/>
            </label>
            <br/>
            <input type="submit" value="Submit"/>
        </form>
        <Link to="/employeeMenu/viewEmployees">Back to Employee List</Link>
        </>
    );
}