import React, { useEffect, useState } from 'react'
import { useAuth } from '../auth/AuthContext'
import {Button} from 'primereact/button'
import { Link } from 'react-router-dom';

import BoxSendMessage from './BoxSendMessage';
import { useSelector } from 'react-redux';
import appUrl from '../api/appUrl';
import MessageItem from './MessageItem';
function Header() {
  const [showAllMessages, setShowAllMessages] = useState(false);
  const [showMessages, setShowMessages] = useState(false);
  const {messages}=useSelector(state => state.signalrReducers);
  const [count,setCount]=useState(messages.filter(message => message.createdAt === message.updatedAt).length)
  useEffect(()=>{
    setCount(messages.filter(message => message.createdAt === message.updatedAt).length)
  },[messages])

  const {logoutContext}=useAuth()

  const handleLogout =()=>{
    logoutContext()
  }
  return (
   <nav className="main-header navbar navbar-expand navbar-white navbar-light">
  {/* Left navbar links */}
  <ul className="navbar-nav">
    <li className="nav-item">
      <a className="nav-link" data-widget="pushmenu" href="#" role="button"><i className="fas fa-bars" /></a>
    </li>
    <li className="nav-item d-none d-sm-inline-block">
      <Link to="/" className="nav-link">Trang chủ</Link>
    </li>
    <li className="nav-item d-none d-sm-inline-block mr-2">
      <Button severity='danger' text  onClick={handleLogout} className="nav-link">Đăng xuất</Button>
    </li>
    <BoxSendMessage/>
   
  </ul>
  {/* Right navbar links */}
  <ul className="navbar-nav ml-auto">
    {/* Navbar Search */}
    {/* <li className="nav-item">
      <a className="nav-link" data-widget="navbar-search" href="#" role="button">
        <i className="fas fa-search" />
      </a>
      <div className="navbar-search-block">
        <form className="form-inline">
          <div className="input-group input-group-sm">
            <input className="form-control form-control-navbar" type="search" placeholder="Search" aria-label="Search" />
            <div className="input-group-append">
              <button className="btn btn-navbar" type="submit">
                <i className="fas fa-search" />
              </button>
              <button className="btn btn-navbar" type="button" data-widget="navbar-search">
                <i className="fas fa-times" />
              </button>
            </div>
          </div>
        </form>
      </div>
    </li> */}
    {/* Messages Dropdown Menu */}
    <li className="nav-item dropdown">
      <a style={{ cursor:'pointer' }} className="nav-link" onClick={()=>setShowMessages(!showMessages)}>
        <i className="far fa-comments" />
        <span className="badge badge-danger navbar-badge">{ count}</span>
      </a>
      <div className={`dropdown-menu dropdown-menu-lg dropdown-menu-right ${showMessages ? 'show' : ''}`} style={{ maxHeight: "50vh", overflowY: 'auto' }}>
            {/* Display only 4 messages initially */}
            {!showAllMessages&&messages.slice(0, 4).map((item) => (
              <MessageItem key={item.id} item={item} />
            ))}
            {/* Display "Xem tất cả" button */}
            {!showAllMessages && (
              <a style={{ cursor:'pointer' }}  className="dropdown-item dropdown-footer" onClick={() => setShowAllMessages(true)}>
                Xem tất cả
              </a>
            )}
            {/* If "Xem tất cả" button is clicked, display all messages */}
            {showAllMessages && messages.map((item) => (
              <MessageItem key={item.id} item={item} />
            ))}
             {showAllMessages && (
              <a style={{ cursor:'pointer' }}  className="dropdown-item dropdown-footer" onClick={() => setShowAllMessages(false)}>
                Thu gọn
              </a>
            )}
          </div>
    </li>
    {/* Notifications Dropdown Menu */}
    {/* <li className="nav-item dropdown">
      <a className="nav-link" data-toggle="dropdown" href="#">
        <i className="far fa-bell" />
        <span className="badge badge-warning navbar-badge">15</span>
      </a>
      <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
        <span className="dropdown-item dropdown-header">15 Notifications</span>
        <div className="dropdown-divider" />
        <a href="#" className="dropdown-item">
          <i className="fas fa-envelope mr-2" /> 4 new messages
          <span className="float-right text-muted text-sm">3 mins</span>
        </a>
        <div className="dropdown-divider" />
        <a href="#" className="dropdown-item">
          <i className="fas fa-users mr-2" /> 8 friend requests
          <span className="float-right text-muted text-sm">12 hours</span>
        </a>
        <div className="dropdown-divider" />
        <a href="#" className="dropdown-item">
          <i className="fas fa-file mr-2" /> 3 new reports
          <span className="float-right text-muted text-sm">2 days</span>
        </a>
        <div className="dropdown-divider" />
        <a href="#" className="dropdown-item dropdown-footer">See All Notifications</a>
      </div>
    </li> */}
    <li className="nav-item">
      <a className="nav-link" data-widget="fullscreen" href="#" role="button">
        <i className="fas fa-expand-arrows-alt" />
      </a>
    </li>
    {/* <li className="nav-item">
      <a className="nav-link" data-widget="control-sidebar" data-controlsidebar-slide="true" href="#" role="button">
        <i className="fas fa-th-large" />
      </a>
    </li> */}
  </ul>
</nav>

  )
}

export default Header
