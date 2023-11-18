import { Link } from "react-router-dom"

export default function ViewActiveOrders() {
    return(
        <>
        <h3>Incomplete Orders</h3>
        <Link to="/viewAllOrders">
            <p>View All Orders</p>
        </Link>
        </>
    )
}