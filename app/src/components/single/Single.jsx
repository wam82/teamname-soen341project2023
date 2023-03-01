import React from 'react'
import Sidebar from '../sidebar/Sidebar'
import SinglePost from '../singlePost/singlePost'
import Rightbar from '../rightbar/rightbar'
import './single.css'

export default function Single() {
  return (
    <div className='single'>
        <Sidebar/>
        <SinglePost/>
        <Rightbar/>
    </div>
  )
}
