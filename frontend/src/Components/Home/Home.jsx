import React from 'react'
import axios from 'axios'
import {useState} from 'react'
import {useNavigate} from 'react-router-dom';
import {Input,Button} from '@material-tailwind/react'
import BarLoader from "react-spinners/BarLoader";
function Home() {
  const navigate=useNavigate()
  const [prompt,setprompt]=useState("")
  const [open,setopen]=useState(false)
  const [img,setimg]=useState("")
  const [loading,setloading]=useState(false)
  const clickHandler=async ()=>{
    
    try {
        if(prompt===""){
            setopen(true)
            return
        }
        
        console.log({prompt})
        const imgapi="http://localhost:8200/generateimg"
        const textapi="http://localhost:8200/generatetext"
        const data={prompt};
        setloading(true)
        const [imgresponse,textresponse]=await Promise.all([
          axios.post(imgapi,data),
          axios.post(textapi,data)
        ])
        // const response=await axios.post(imgapi,data)
        const imgsrc=imgresponse.data.src;
        console.log(imgsrc)
        const textdata=textresponse.data
        setimg(imgsrc)
        navigate("/selecttemplate",{ state: {img:imgsrc,text:textdata} })
      } catch (error) {
        setopen(true);
        return
      } finally{
        setloading(false)
      }
}
  return (
    <div className='h-screen bg-slate-500 flex justify-center'>
      {
        loading?
        <div className='pt-52'>
          <BarLoader color={"#2b303b"} loading={loading} size={100} aria-label="Loading Spinner" data-testid="loader"/>
        </div>
        :
        <div className='w-2/4 h-1/5 pt-40 flex flex-col gap-6 '>
            <div>
                <h1 className='text-5xl text-center font-semibold'>Blog Post Composer</h1>
            </div>
            <div className="w-85">
                <Input size="lg" variant='outlined' label="Prompt" placeholder='Prompt' value={prompt} onChange={(e)=>{setprompt(e.target.value)}} />
            </div>
            <div className='flex justify-center'>
              <Button onClick={clickHandler}>Generate</Button>
            </div>
        </div>
      }
    </div>
  )
}

export default Home