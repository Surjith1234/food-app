import { useState } from 'react'
import './App.css'
import { Navbar } from './components/Navbar'
import {BrowserRouter, Route,  Routes} from 'react-router-dom'
import { Home } from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import ProtectedRoute from './pages/ProtectedRoute'
import VerifyOtp from './pages/VerifyOtp'
import Addfood from './pages/admin/Addfood'
import Menu from './pages/Menu'
import FoodPage from './pages/FoodPage'
import Profile from './pages/Profile'
import Viewcart from './pages/Viewcart'
import Success from './pages/Success'
import Cancel from './pages/Cancel'
import Order from './pages/Order'
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import MyOrder from './pages/MyOrder'


function App() {
  const [count, setCount] = useState(0)
  const stripePromise=loadStripe("pk_test_51OvKrFSDpWicrwdaj3V23Nard5U4M5DvIkCC66WoXGrkZpGCW0PVeDap0kfX59ul1VWYnnUzhXVkxN12jyFtGMqC00FdKNbeA6");
  return (
  <BrowserRouter>
      <Navbar/>
     <Routes>
      <Route path='/' element={<ProtectedRoute><Home/></ProtectedRoute>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/verifyOtp' element={<VerifyOtp/>}/>
      <Route path='/addfood' element={<ProtectedRoute><Addfood/></ProtectedRoute>}/>
      <Route path='/menu' element={<ProtectedRoute><Menu/></ProtectedRoute>}/>
      <Route path='/profile' element={<ProtectedRoute><Profile/></ProtectedRoute>}/>
      <Route path='/fooddetails/:id' element={<ProtectedRoute><FoodPage/></ProtectedRoute>}/>
      <Route path='/viewcart' element={<ProtectedRoute><Viewcart/></ProtectedRoute>}/>
      <Route path='/success' element={<ProtectedRoute><Success/></ProtectedRoute>}/>
      <Route path='/cancel' element={<ProtectedRoute><Cancel/></ProtectedRoute>}/>
      <Route path='/myorder' element={<ProtectedRoute><MyOrder/></ProtectedRoute>}/>
      <Route path='/order' element={
      <ProtectedRoute>
        <Elements stripe={stripePromise}>
           <Order/>
        </Elements>
      </ProtectedRoute>
      }/>
    </Routes>
  </BrowserRouter>
  )
}
export default App
