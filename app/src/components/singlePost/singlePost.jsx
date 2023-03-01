import React from 'react'
import './singlePost.css'

export default function singlePost() {
  return (
    <div className='singlePost'>
        <div className="singlePostWrapper">
            <h1 className='singlePostTitle'>Title
            <div className="singlePostEdit">
                <i className="singlePostIcon fa-solid fa-pen-to-square"></i>
                <i className="singlePostIcon fa-solid fa-trash"></i>
            </div>
            </h1>
            <div className="singlePostInfo">
                <span className='singlePostEmployer'>Employer: <b>  John</b></span>
                <span className='singlePostDate'>Date</span>
            </div>
            <p className='singlePostDescription'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Amet omnis, cum soluta neque minima dolor. 
                Ullam sapiente tempora quis repellendus asperiores delectus explicabo facilis? Doloremque eligendi ullam in optio. Libero.
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Amet omnis, cum soluta neque minima dolor. 
                Ullam sapiente tempora quis repellendus asperiores delectus explicabo facilis? Doloremque eligendi ullam in optio. Libero.
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Amet omnis, cum soluta neque minima dolor. 
                Ullam sapiente tempora quis repellendus asperiores delectus explicabo facilis? Doloremque eligendi ullam in optio. Libero.
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Amet omnis, cum soluta neque minima dolor. 
                Ullam sapiente tempora quis repellendus asperiores delectus explicabo facilis? Doloremque eligendi ullam in optio. Libero.
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Amet omnis, cum soluta neque minima dolor. 
                Ullam sapiente tempora quis repellendus asperiores delectus explicabo facilis? Doloremque eligendi ullam in optio. Libero.</p>
        </div>
    </div>
  )
}
