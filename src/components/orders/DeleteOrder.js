import { useLocation, useNavigate } from "react-router";
import CustomerOrderService from "../../service/CustomerOrderService";

export default function DeleteOrder() {
    let navigate = useNavigate();
    let location = useLocation();
    CustomerOrderService.deleteOrder(location.state.order_id).then(()=>{
        alert("Order deleted");
        navigate("/")
    }, ()=>{
        alert(location.state.order_id);
        navigate("/");
    })
}