import React,{useContext} from 'react'
import SidebarContext from  "../Contexts/SideBarContext"
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Outlet,useLocation } from 'react-router-dom';
import SideBar from '../Components/SideBar'
import "./MainLayout.css"
const MainLayout = () => {
  const { isSidebarOpen, setSidebarOpen } = useContext(SidebarContext);
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';

  return (
    <div className='main-layout'        style={{
       gridTemplateColumns: isSidebarOpen ? "250px auto" : '80px auto'
    }}>
      
      {!isAuthPage && <SideBar />} 
      {/* 로그인 또는 회원가입 페이지가 아닐 때만 사이드바를 렌더링 */}
     <div className="outlet-wrapper">
     <Outlet />
     </div>
    </div>
  
  )
}

export default MainLayout