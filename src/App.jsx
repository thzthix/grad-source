import React from 'react';
import 'react-circular-progressbar/dist/styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css"
import 'bootstrap/dist/css/bootstrap.min.css';

import SidebarContext from  "./Contexts/SideBarContext"
import SideBar from './Components/SideBar';
import { useNavigate } from 'react-router-dom'; 
import { AuthProvider, useAuth } from './Contexts/AuthContext';
import Login from './Pages/Login'; 
import SignUp from './Pages/SignUp';
import {Route, createBrowserRouter, createRoutesFromElements, RouterProvider} from "react-router-dom"
import MainLayout from "./layouts/MainLayout"
import { useState } from 'react';
import PushUp from './Pages/Pushup';
import Squat from './Pages/Squat';
import Dashboard from './Pages/Dashboard';
import "./App.css"
import "./index.css"
const RequireAuth = ({ children }) => {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
    }
  }, [isLoggedIn, navigate]);

  return isLoggedIn ? children : null;
};


const  App=()=> {

  const [isSidebarOpen, setSidebarOpen] = useState(false); // 사이드바 상태
  const router=createBrowserRouter(createRoutesFromElements(
    <Route path='/' element={<MainLayout />}>
       <Route index element={<RequireAuth><Dashboard /></RequireAuth>} />
       {/* <Route index element={
               <RequireAuth>
               <Squat />
             </RequireAuth>
       } /> */}
      <Route path='/login' element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      {/* <Route path='*' element={<NotFoundPage/>}/> */}
  
    </Route>
    ))

return (
  <AuthProvider>
  <SidebarContext.Provider value={{ isSidebarOpen, setSidebarOpen }}>
 <RouterProvider router={router}/>
 </SidebarContext.Provider>
 </AuthProvider>
)

  // return (
    // <div className='container-fluid bg-secondary min-vh-100'>      
    //   <div className='row'>         
    //     {toggle && <div className='col-4 col-md-2 bg-white vh-100 position-fixed'>               
    //       <SideBar />           
    //     </div>}            
    //     <div className={`col ${toggle ? 'offset-4 offset-md-2' : ''}`}>                
    //       <Home Toggle={Toggle}/>           
    //     </div>      
    //   </div>   
    // </div>  
    
    // <>
        
    //  <Dashboard />
  
    {/* <PushUp /> */}
    // </>
  // );
}

export default App;

