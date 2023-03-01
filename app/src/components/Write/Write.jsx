import React from 'react'
import './write.css'

export default function Write() {
  return (
    <div className='write'>
        <form className='writeForm'>
            <div className="writeFormGroup">
                <input type="text" placeholder='Title' className='writeInput' autoFocus={true}/>
            </div>
            <div className="writeFormGroup">
                <textarea placeholder='Description of job' type="text" className='writeInput writeText'></textarea>
            </div>
            <button className='writeSubmit'>Publish</button>
        </form>
    </div>
  )
}
