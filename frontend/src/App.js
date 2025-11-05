import {Routes,Route} from "react-router-dom"
import Login from './pages/Login/index.js'
import Register from './pages/Register/index.js'
import Home from './pages/Home/index.js'
import Shops from "./pages/Shops/index.js"
import ProtectedRoute from "./pages/ProtectedRoute/index.js"
import './App.css';

function App() {
  return (
    <Routes>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/' element={<ProtectedRoute><Home/></ProtectedRoute>}/>
      <Route path='/saloon/:id' element={<ProtectedRoute><Shops/></ProtectedRoute>}/>
    </Routes>
  );
}

export default App;
