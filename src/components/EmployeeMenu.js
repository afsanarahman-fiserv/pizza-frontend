import { Link } from 'react-router-dom'

export default function EmployeeMenu() {
    return(
        <>
        <h2>Employee Menu</h2>
        <Link to="/employeeMenu/viewEmployees">
            <button>View Employees</button>
        </Link>
        <br/>
        <Link to="/employeeMenu/addEmployee">
            <button>Add Employee</button>
        </Link>
        <br/>
        <Link to="/employeeMenu/updateEmployee">
            <button>Edit Employee</button>
        </Link>
        <br/>
        <Link to="/employeeMenu/deactivateEmployee">
            <button>Deactivate Employee</button>
        </Link>
        <br/>
        <Link to="/">
            <p>Back to Main Menu</p>
        </Link>
        </>
    )
}