import React, { useEffect, useState } from 'react';
import { FaArrowUp } from "react-icons/fa";


const QuickBtn = () => {
    const [visible, setVisible]=useState(false)
    const scrollTop=()=>{
        window.scrollTo({top:0, behavior:"smooth"})
    }

    useEffect(() =>{
        const handleScroll = () =>{
            setVisible(window.scrollY>500)
        }
        window.addEventListener('scroll', handleScroll)
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])
    return visible&& (
        <div className='quickBtn'>
            <button className="top" onClick={scrollTop}>
                <FaArrowUp />
            </button>
        </div>
    );
};

export default QuickBtn;