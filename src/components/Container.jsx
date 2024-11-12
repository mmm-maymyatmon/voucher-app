import React from 'react'

export const Container = ({ children, className }) => {
    return (
        <div className={`w-full mx-auto ${className} sm:max-w-lg md:max-w-2xl lg:max-w-4xl`}>
        {children}
      </div>
        
    )
};

export default Container;