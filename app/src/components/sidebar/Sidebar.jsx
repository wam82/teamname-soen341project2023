import { Link } from 'react-router-dom'
import './sidebar.css'

export default function Sidebar() {
  return (
    <div className='sidebar'>
        <div className="sidebarItem">
            <span className="sidebarTitle">My Profile</span>
            <img src="https://static.wikia.nocookie.net/disney/images/a/a8/Profile_-_Stitch.jpeg" alt="" />
            <span className='sidebarText'>Student in Software Engineering</span>
        </div>
        <div className="sidebarItem">
          <span className='sidebarEdit'><Link to="./ManageProfile" style={{textDecoration:"none", color:"black"}}><a>Edit Profile</a></Link></span>
        </div>
    </div>
  )
}
