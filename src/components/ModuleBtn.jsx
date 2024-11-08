import React from 'react'
import { Link } from 'react-router-dom'

const ModuleBtn = ({name, icon, url}) => {
  return (
    <Link to={url} className='flex flex-col h-full gap-3 justify-between bg-blue-600 text-white items-center p-5 rounded-lg'>
        {icon} 
        
        {name}
    </Link>
  )
}

export default ModuleBtn