import React from "react";
import axios from 'axios';

// DOUBLE CHECK IF URL IS CORRECT
const getAllCustomersUrl = "http://localhost:8080/api/customers";
const getCustomerUrl = "http://localhost:8080/api/customers/"
const addCustomerUrl = "http://localhost:8080/api/addCustomer";
const updateCustomerUrl = "http://localhost:8080/api/updateCustomer";
const deleteCustomerUrl = "http://localhost:8080/api/deleteCustomer/";


class CustomerService {
    
    getAllCustomers() {
        return axios.get(getAllCustomersUrl);
    }

    addCustomer(customer) {
        return axios.post(addCustomerUrl, customer);
    }
    findCustomer(phone_number){
        return axios.get(getCustomerUrl + phone_number);
    }
    updateCustomer(customer) {
        return axios.put(updateCustomerUrl, customer)
    }

    deleteCustomer(phone_number) {
        return axios.delete(deleteCustomerUrl + phone_number)
    }
}

export default new CustomerService();