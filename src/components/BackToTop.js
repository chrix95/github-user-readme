import React, { useState } from 'react'

const BackToTop = () => {
    const [isVisible, setIsVisible] = useState(false)

    const toggleVisible = () => {
        const scrolled = document.documentElement.scrollTop;
        if (scrolled > 100){
          setIsVisible(true)
        } else {
          setIsVisible(false)
        }
    };
    const scrollToTop = () =>{
        window.scrollTo({
          top: 0, 
          behavior: 'smooth'
        });
    };
      
    window.addEventListener('scroll', toggleVisible);

    return (
        <>
            {
                isVisible ?
                (
                    <div className="position-fixed back-top-holder" onClick={scrollToTop}>
                        <p className="back-top-text">Back to Top &nbsp; <i className="fa fa-arrow-right"></i></p>
                    </div>
                ) : ''
            }
        </>
    )
}

export default BackToTop;
