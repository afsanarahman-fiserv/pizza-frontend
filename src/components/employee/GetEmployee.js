import { useEffect } from "react";
import { useState } from "react";
import EmployeeService from "../../service/EmployeeService";

export default function GetEmployee({employee_id}) {
    let [employee, setEmpState] = useState({
        employee_id : '',
        name : '',
        employee_role : '',
        employee_status : ''
    });

    useEffect(()=>{
        EmployeeService.findEmployee(employee_id).then((response)=>{
            setEmpState(response.data);
        }, ()=>{});
    })

    return(
        <>
        <br/>
        <h5>Employee</h5>
            Name: {employee.name}<br/>
            ID: {employee.employee_id}<br/>
        </>
    )
}