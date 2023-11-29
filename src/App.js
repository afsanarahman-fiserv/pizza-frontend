import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Router, Route, Routes } from 'react-router-dom'
import ViewEmployees from './components/employee/ViewEmployees';
import AddEmployee from './components/employee/AddEmployee';
import DeactivateEmployee from './components/employee/DeactivateEmployee';
import UpdateEmployee from './components/employee/UpdateEmployee';
import MainMenu from './components/MainMenu';
import ViewCustomers from './components/customer/ViewCustomers';
import ViewActiveOrders from './components/orders/view/ViewActiveOrders';
import SelectEmployee from './components/employee/SelectEmployee';
import CreateOrder from './components/orders/CreateOrder';
import ViewAllOrders from './components/orders/view/ViewAllOrders';
import UpdateOrder from './components/orders/UpdateOrder';
import DeleteOrder from './components/orders/DeleteOrder';
import AddCustomer from './components//customer/AddCustomer';
import UpdateCustomer from './components/customer/UpdateCustomer';
import DeleteCustomer from './components/customer/DeleteCustomer';
import DeleteDetail from './components/details/DeleteDetail';
import SortByEmployee from './components/employee/SortByEmployee';
import OrdersByEmployee from './components/orders/view/OrdersByEmployee'
import SortByZip from './components/customer/SortByZip';
import OrdersByZip from './components/orders/view/OrdersByZip';
import OrdersByDate from './components/orders/view/OrdersByDate';
import OrdersByEmpDate from './components/orders/view/OrdersByEmpDate';
import OrdersByZipDate from './components/orders/view/OrdersByZipDate';


function App() {
  return (
    <div className ="App">
        <h1>S'AAA Pizza</h1>
        <BrowserRouter>
        <Routes>
          <Route path={"/"} element={<MainMenu/>} exact={true}></Route>

          <Route path={"/viewCustomers"} element={<ViewCustomers/>} exact={true}></Route>
          <Route path={"/viewCustomers/newCustomer"} element={<AddCustomer/>} exact={true}></Route>
          <Route path={"/viewCustomers/updateCustomer"} element={<UpdateCustomer/>} exact={true}></Route>
          <Route path={"/viewCustomers/deleteCustomer"} element={<DeleteCustomer/>} exact={true}></Route>
          <Route path={"/newOrder/selectEmployee"} element={<SelectEmployee/>} exact={true}></Route>
          <Route path={"/newOrder/createOrder"} element={<CreateOrder/>} exact={true}></Route>

          <Route path={"/viewActiveOrders"} element={<ViewActiveOrders/>} exact={true}></Route>
          <Route path={"/viewAllOrders"} element={<ViewAllOrders/>} exact={true}></Route>
          <Route path={"/viewOrders/editOrder"} element={<UpdateOrder/>} exact={true}></Route>
          <Route path={"/viewOrders/editOrder/deleteDetail"} element={<DeleteDetail/>} exact={true}></Route>
          <Route path={"/viewOrders/deleteOrder"} element={<DeleteOrder/>} exact={true}></Route>
          <Route path={"/viewAllOrders/byEmployee"} element={<SortByEmployee/>} exact={true}></Route>
          <Route path={"/viewAllOrders/byEmployee/selected"} element={<OrdersByEmployee/>} exact={true}></Route>
          <Route path={"/viewAllOrders/byZip"} element={<SortByZip/>} exact={true}></Route>
          <Route path={"/viewAllOrders/byZip/selected"} element={<OrdersByZip/>} exact={true}></Route>
          <Route path={"/viewAllOrders/byDate"} element={<OrdersByDate/>} exact={true}></Route>
          <Route path={"/viewAllOrders/byDate/emp"} element={<OrdersByEmpDate/>} exact={true}></Route>
          <Route path={"/viewAllOrders/byDate/zip"} element={<OrdersByZipDate/>} exact={true}></Route>


          <Route path={"/employeeMenu/viewEmployees"} element={<ViewEmployees/>} exact={true}></Route>
          <Route path={"/employeeMenu/addEmployee"} element={<AddEmployee/>} exact={true}></Route>
          <Route path={"/employeeMenu/updateEmployee"} element={<UpdateEmployee/>} exact={true}></Route>
          <Route path={"/employeeMenu/deactivateEmployee"} element={<DeactivateEmployee/>} exact={true}></Route>
        </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;