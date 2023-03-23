import React from 'react'
import './home.css'
import Header from '../../components/Header/Header'
import Posts from '../../components/posts/Posts'
import Sidebar from '../../components/sidebar/Sidebar'
import Rightbar from '../../components/rightbar/rightbar'

export default function home() {
  return (
    <>
        <div className='home'>
        <Sidebar />
        <Posts />
        <Rightbar/>
            
        </div>
    </>
  )
}
