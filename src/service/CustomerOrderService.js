import React from "react";
import axios from 'axios';

const getAllOrdersUrl = "http://localhost:8080/api/customerOrder";
const addOrderUrl = "http://localhost:8080/api/addCustomerOrder";
const updateOrderUrl = "http://localhost:8080/api/updateCustomerOrder";
const deleteOrderUrl = "http://localhost:8080/api/deleteCustomerOrder";

class CustomerOrderService {
    
    getAllOrders() {
        return axios.get(getAllOrdersUrl);
    }

    findOrder(id) {
        return axios.get(getAllOrdersUrl + id);
    }

    addOrder(order) {
        return axios.post(addOrderUrl, order);
    }

    updateOrder(order) {
        return axios.put(updateOrderUrl, order)
    }

    deleteOrder(order) {
        return axios.delete(deleteOrderUrl, order)
    }

}

export default new CustomerOrderService();