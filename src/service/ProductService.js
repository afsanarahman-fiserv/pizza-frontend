import axios from 'axios';

const getAllProductsUrl = "http://localhost:8080/api/getAllProducts";
const getProductUrl = "http://localhost:8080/api/products/";

class ProductService {
    
    getAllProducts() {
        return axios.get(getAllProductsUrl);
    }

    getProduct(id) {
        return axios.get(getProductUrl + id);
    }

}

export default new ProductService();