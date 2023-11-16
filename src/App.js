import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Router, Route, Routes } from 'react-router-dom'
import ViewEmployees from './components/employee/ViewEmployees';
import AddEmployee from './components/employee/AddEmployee';
import DeactivateEmployee from './components/employee/DeactivateEmployee';
import UpdateEmployee from './components/employee/UpdateEmployee';
import MainMenu from './components/MainMenu';
import ViewCustomers from './components/customer/ViewCustomers';
import ViewOrders from './components/ViewOrders';
import AddCustomer from './components//customer/AddCustomer';

function App() {
  return (
    <>
    <h1>Our Pizza Shop</h1>
    <BrowserRouter>
    <Routes>
      <Route path={"/"} element={<MainMenu/>} exact={true}></Route>

      <Route path={"/newOrder"} element={<ViewCustomers/>} exact={true}></Route>
      <Route path={"/newOrder/newCustomer"} element={<AddCustomer/>} exact={true}></Route>
      <Route path={"/viewOrders"} element={<ViewOrders/>} exact={true}></Route>
      
      <Route path={"/employeeMenu/viewEmployees"} element={<ViewEmployees/>} exact={true}></Route>
      <Route path={"/employeeMenu/addEmployee"} element={<AddEmployee/>} exact={true}></Route>
      <Route path={"/employeeMenu/updateEmployee"} element={<UpdateEmployee/>} exact={true}></Route>
      <Route path={"/employeeMenu/deactivateEmployee"} element={<DeactivateEmployee/>} exact={true}></Route>
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;