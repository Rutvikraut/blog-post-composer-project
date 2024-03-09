import React,{useState} from 'react'
import { useLocation } from 'react-router-dom'
import Template1 from '../Templates/Template1'
import Template2 from '../Templates/Template2'
import Template3 from '../Templates/Template3'

const TemplateSelector = () => {
    const location=useLocation()
    const imgsrc=location.state.img
    const blog=location.state.text
    const [selectedTemplate, setSelectedTemplate] = useState('template1'); // Default template
  
    const renderTemplate = () => {
      switch (selectedTemplate) {
        case 'template1':
          return <Template1 date={getCurrentDate()} imgsrc={imgsrc} blog={blog} />;
        case 'template2':
          return <Template2 date={getCurrentDate()} imgsrc={imgsrc} blog={blog}/>;
        case 'template3':
            return <Template3 date={getCurrentDate()} imgsrc={imgsrc} blog={blog}/>;
        default:
          return null;
      }
    }
  
    const getCurrentDate = () => {
      const current = new Date();
      return `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`;
    }
  
    return (
      <div className='pt-20'>
        <div className="flex">
        {/* Side panel for template selection */}
        
            <div className="w-1/4 overflow-y-auto h-screen border-r-2 border-black py-5">
                <div>
                    <h2 className='text-xl font-semibold text-center'>Choose Template</h2>
                </div>
            <div className="flex flex-col gap-2 items-center justify-start p-4">
            <div
                className={`template-option ${selectedTemplate === 'template1' ? 'border-4 border-blue-500' : ''}`}
                onClick={() => setSelectedTemplate('template1')}
                >
                <img src="src\images\image1.jpg" alt="Template 1" className="w-full h-auto cursor-pointer" />
                </div>
                <div
                className={`template-option ${selectedTemplate === 'template2' ? 'border-4 border-blue-500' : ''}`}
                onClick={() => setSelectedTemplate('template2')}
                >
                <img src="src\images\image1.jpg" alt="Template 2" className="w-full h-auto cursor-pointer" />
                </div>
                <div
                className={`template-option ${selectedTemplate === 'template3' ? 'border-4 border-blue-500' : ''}`}
                onClick={() => setSelectedTemplate('template3')}
                >
                <img src="src\images\image1.jpg" alt="Template 3" className="w-full h-auto cursor-pointer" />
                </div>
                {/* Add more template options here */}
            </div>
            </div>
            {/* Main content */}
            <div className="w-3/4">
            {renderTemplate()}
            </div>
        </div>
      </div>
    );
}

export default TemplateSelector