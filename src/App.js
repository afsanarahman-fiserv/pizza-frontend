import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Router, Route, Routes } from 'react-router-dom'
import ViewEmployees from './components/ViewEmployees';
import AddEmployee from './components/ViewEmployees';
import DeleteEmployee from './components/ViewEmployees';
import UpdateEmployee from './components/ViewEmployees';

function App() {
  return (
    <>
    <h1>Main Menu</h1>
    <BrowserRouter>
    <Routes>
      <Route path={"/"} element={<ViewEmployees/>} exact={true}></Route>
      <Route path={"/addEmployee"} element={<AddEmployee/>} exact={true}></Route>
      <Route path={"/updateEmployee"} element={<UpdateEmployee/>} exact={true}></Route>
      <Route path={"/deleteEmployee"} element={<DeleteEmployee/>} exact={true}></Route>
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
