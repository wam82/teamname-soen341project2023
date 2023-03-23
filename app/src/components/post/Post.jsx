import React from 'react'
import { Link } from 'react-router-dom'
import './post.css'

export default function post() {
  return (
    <div className='post'>
        <div className="postInfo">
            <span className="postTitle"><Link to="/post/id" style={{textDecoration:"none", color:"black"}}>Title</Link></span>
            <hr />
            <span className="postDate">Date</span>
            <p className='postDescription'>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis accusantium saepe inventore, recusandae ab in hic repudiandae! 
                Dolor, mollitia iste. Pariatur numquam, quas vitae qui velit quod hic ipsa magnam.Lorem, ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis accusantium saepe inventore, recusandae ab in hic repudiandae! 
                Dolor, mollitia iste. Pariatur numquam, quas vitae qui velit quod hic ipsa magnam.Lorem, ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis accusantium saepe inventore, recusandae ab in hic repudiandae! 
                Dolor, mollitia iste. Pariatur numquam, quas vitae qui velit quod hic ipsa magnam.Lorem, ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis accusantium saepe inventore, recusandae ab in hic repudiandae! 
                Dolor, mollitia iste. Pariatur numquam, quas vitae qui velit quod hic ipsa magnam.Lorem, ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis accusantium saepe inventore, recusandae ab in hic repudiandae! 
                Dolor, mollitia iste. Pariatur numquam, quas vitae qui velit quod hic ipsa magnam.</p>
        </div>
    </div>
  )
}
