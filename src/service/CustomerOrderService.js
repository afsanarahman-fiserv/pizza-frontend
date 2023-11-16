import React from "react";
import axios from 'axios';

const getAllOrdersUrl = "http://localhost:8080/api/employees";
const addOrderUrl = "http://localhost:8080/api/addEmployee";
const updateOrderUrl = "http://localhost:8080/api/updateEmployee";
const deleteOrderUrl = "http://localhost:8080/api/updateEmployee";

class CustomerOrderService {
    
    getAllEmployees() {
        return axios.get(getAllOrdersUrl);
    }

    findEmployee(id) {
        return axios.get(getAllOrdersUrl + id);
    }

    addEmployee(order) {
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