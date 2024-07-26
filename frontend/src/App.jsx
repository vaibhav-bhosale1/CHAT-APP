import toast, { Toaster } from 'react-hot-toast';
import { Routes,Route, Navigate } from 'react-router-dom';
import './App.css'
import Home from './pages/home/home';
import Login from './pages/login/login';
import Signup from './pages/signup/signup';
import { useAuthContext } from './context/authcontext.jsx';
function App() {

  const { authUser } = useAuthContext();
  return (
    <>
    <div className="p-4 h-screen flex items-center justify-center">
     <Routes>
      <Route path='/'element={authUser ? <Home /> : <Navigate to={"/login"} />}/>
      <Route path='/login'element={authUser ? <Navigate to='/login' /> : <Login />}/>
      <Route path='/signup' element={authUser ? <Navigate to='/login' /> : <Signup/>}/>

      
     </Routes>
     <div><Toaster/></div>

    </div>
    



      
    </>
  );
}

export default App
