import { Route,Routes as Routers } from "react-router-dom"
import Login from "./components/login/Login"
import Signup from "./components/signup/Signup"
import OrderList from "./components/OrderList"
import AddOrder from "./components/AddOrder"



function Routes() {
  return (
    <Routers>
        <Route path="/" element={<Login/>}/>
        <Route path="/add-user" element={<Signup/>}/>
        <Route path="/order-list" element={<OrderList/>}/>
        <Route path="/add-order" element={<AddOrder/>}/>
    </Routers>
  )
}

export default Routes
