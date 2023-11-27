import React from "react";
import axios from 'axios';

const getAllOrdersUrl = "http://localhost:8080/api/customerOrder";
const getOrderUrl = "http://localhost:8080/api/customerOrder/";
const addOrderUrl = "http://localhost:8080/api/addNewOrder";
const updateOrderUrl = "http://localhost:8080/api/updateCustomerOrder";
const deleteOrderUrl = "http://localhost:8080/api/deleteCustomerOrder/";

const ordersByEmployeeUrl = "http://localhost:8080/api/getOrderByEmployeeId/"
const ordersByZipUrl = "http://localhost:8080/api/getOrderByZipCode/";

class CustomerOrderService {
    
    getAllOrders() {
        return axios.get(getAllOrdersUrl);
    }

    findOrder(id) {
        return axios.get(getOrderUrl + id);
    }

    addOrder(order) {
        return axios.post(addOrderUrl, order);
    }

    updateOrder(order) {
        return axios.put(updateOrderUrl, order)
    }

    deleteOrder(id) {
        return axios.delete(deleteOrderUrl + id)
    }

    getOrderByEmployee(employee_id) {
        return axios.get(ordersByEmployeeUrl + employee_id);
    }

    getOrderByZip(zip_code) {
        return axios.get(ordersByZipUrl + zip_code);
    }

}

export default new CustomerOrderService();