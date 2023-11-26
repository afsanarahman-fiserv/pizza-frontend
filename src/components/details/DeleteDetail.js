import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import OrderDetailService from "../../service/OrderDetailService";

export default function DeleteDetail() {
    let location = useLocation();
    let navigate = useNavigate();
    useEffect(() =>{
        OrderDetailService.deleteOrderDetail(location.state.detail_id).then(()=>{
            alert("Item removed");
            navigate("/viewActiveOrders")
        }, ()=>{});
    })
}