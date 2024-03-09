import React from 'react'
import './Template.css'
const Template2 = ({date,imgsrc,blog}) => {
    return (
        <div className='p-5 flex justify-center'>
          <div className='w-2/4 p-5 flex flex-col gap-5'>
            <div>
              <img src={imgsrc} alt="" />
            </div>
            <div className='flex flex-col gap-3'>
              <h1 className='text-left font-bold text-4xl'>{blog.title}</h1>
              <p>Author : Your Name Date : {date}</p>
            </div>
            <div>
                <div dangerouslySetInnerHTML={{__html:blog.content}} className='blog-content'>
                </div>
            </div>
          </div>
        </div>
    )
}

export default Template2