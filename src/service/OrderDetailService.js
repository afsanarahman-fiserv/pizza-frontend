import React from "react";
import axios from 'axios';

const getAllOrdersUrl = "http://localhost:8080/api/orders";
const getOrderUrl = "http://localhost:8080/api/getOrder/";
const addOrderUrl = "http://localhost:8080/api/addOrder";
const updateOrderUrl = "http://localhost:8080/api/updateOrder";
const deleteOrderUrl = "http://localhost:8080/api/deleteOrder/";

class OrderDetailService {
    
    getAllOrderDetails() {
        return axios.get(getAllOrdersUrl);
    }

    findOrderDetail(id) {
        return axios.get(getOrderUrl + id);
    }

    addOrderDetail(detail) {
        return axios.post(addOrderUrl, detail);
    }

    updateOrderDetail(detail) {
        return axios.put(updateOrderUrl, detail)
    }

    deleteOrderDetail(id) {
        return axios.delete(deleteOrderUrl + id)
    }

}

export default new OrderDetailService();