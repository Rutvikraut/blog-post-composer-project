import React,{useState} from 'react';
import './Template.css'
import { Button } from '@material-tailwind/react';
import html2canvas from "html2canvas";

const Template1 = ({date,author,imgsrc,title,content}) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleBlogDownload = async () => {
    if (!imageLoaded) return;

    const element = document.getElementById('print');
    const canvas = await html2canvas(element);
    const data = canvas.toDataURL('image/jpeg');
    const link = document.createElement('a');

    link.href = data;
    link.download = 'screenimage.jpg';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleRegenerate=async()=>{

  };

  return (
    <div className='p-5 flex flex-col justify-center'>
      <div className='p-5 flex flex-col gap-5 blog'id='print'>
        <div className='flex flex-col gap-3'>
          <h1 className='text-left font-bold text-4xl'>{title}</h1>
          <div className='flex gap-3'>
            <p><span className='font-semibold'>Author :</span> {author}</p>
            <p><span className='font-semibold'>Date :</span> {date}</p>
          </div>
        </div>
        <div className='w-1/2 image'>
          <img src={`data:image/jpeg;base64,${imgsrc}`} alt="" onLoad={handleImageLoad}/>
        </div>
        <div>
          <div dangerouslySetInnerHTML={{__html:content}} className='blog-content'>
          </div>
        </div>
      </div>
      <div className='p-5 flex gap-4'>
        <Button onClick={handleBlogDownload}>Download Blog</Button>
        {/* <Button onClick={handleRegenerate}>Regenerate</Button> */}
      </div>
    </div>
  )
}

export default Template1;