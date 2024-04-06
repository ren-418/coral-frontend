import React from 'react'
import './Footer.scss'
import { BiSolidHome } from "react-icons/bi";
import { HiMiniNewspaper, HiUserCircle } from "react-icons/hi2";
import { FaSearch } from "react-icons/fa";
import { AiFillMessage } from "react-icons/ai";
import { IoAddCircle } from "react-icons/io5";

function Footer({selected, userType, setPage = ()=>{}}) {

  const routes = {
    home: 0,
    search: 1,
    add: 2,
    messages: 3,
    profile: 4,
    news: 5
  };
  
  return (
    <footer className='footer-buttons'>
      {userType === "InvestorUser" ?
      <>
        <div className={selected === routes.home ? "selected" : ""} onClick={()=>{setPage(routes.home)}}><BiSolidHome size={30}/></div>
        <div className={selected === routes.news ? "selected" : ""} onClick={()=>{setPage(routes.news)}}><HiMiniNewspaper size={30}/></div>
        <div className={selected === routes.search ? "selected" : ""} onClick={()=>{setPage(routes.search)}}><FaSearch size={28}/></div>
        <div className={selected === routes.messages ? "selected" : ""} onClick={()=>{setPage(routes.messages)}}><AiFillMessage size={30}/></div>
        <div className={selected === routes.profile ? "selected" : ""} onClick={()=>{setPage(routes.profile)}}><HiUserCircle size={33}/></div>
      </>
      :
      <>
        <div className={selected === routes.home ? "selected" : ""} onClick={()=>{setPage(routes.home)}}><BiSolidHome size={30}/></div>
        <div className={selected === routes.search ? "selected" : ""} onClick={()=>{setPage(routes.search)}}><FaSearch size={28}/></div>
        <div className={selected === routes.add ? "selected" : ""} onClick={()=>{setPage(routes.add)}}><IoAddCircle size={40}/></div>
        <div className={selected === routes.messages ? "selected" : ""} onClick={()=>{setPage(routes.messages)}}><AiFillMessage size={30}/></div>
        <div className={selected === routes.profile ? "selected" : ""} onClick={()=>{setPage(routes.profile)}}><HiUserCircle size={33}/></div>
      </>
      }
    </footer>
  )
}

export default Footer