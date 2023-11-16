import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Router, Route, Routes } from 'react-router-dom'
import ViewEmployees from './components/ViewEmployees';
import AddEmployee from './components/AddEmployee';
import DeactivateEmployee from './components/DeactivateEmployee';
import UpdateEmployee from './components/UpdateEmployee';
import MainMenu from './components/MainMenu';
import ViewCustomers from './components/ViewCustomers';
import ViewOrders from './components/ViewOrders';
import EmployeeMenu from './components/EmployeeMenu';
import AddCustomer from './components/AddCustomer';

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

      <Route path={"/employeeMenu"} element={<EmployeeMenu/>} exact={true}></Route>
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