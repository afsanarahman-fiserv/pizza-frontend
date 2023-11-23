import { useLocation } from "react-router";
import CustomerOrderService from "../../service/CustomerOrderService";

export default function DeleteOrder() {
    let location = useLocation();
    CustomerOrderService.deleteOrder(location.state.order_id).then(()=>{
        alert("Order deleted");
    }, ()=>{
        alert("Order deletion failed");
    })
}