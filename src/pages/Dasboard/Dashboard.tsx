import { useEffect } from 'react';
import style from './style.module.css'
import { Navbar } from '@/components'

function Dashboard() {
  
  function animate(){
    let docus: NodeListOf<HTMLElement> = document.querySelectorAll(".animate")
    docus.forEach((letter, index) => {
      //chiedere a oppy
      const translateYValue = (index *3.5);
      //const translateYValue = -30 * (index + 1);
      //const translateYValue = -(index *5);
      //const translateYValue = 30 * (index + 1);
      letter.style.animationName = 'bounce';
      letter.style.animationDuration = '2s';
      letter.style.animationIterationCount = 'infinite';
      letter.style.animationDirection = 'alternate';
      letter.style.animationTimingFunction = 'ease-in-out';
      letter.style.animationDelay = `${index * 0.1}s`;
      letter.style.transform = `translateY(${translateYValue}px)`;
    });  
  }

  useEffect(() =>{    
    animate()
  })
  return (
    <>
      <Navbar/>
      <div className="container m-auto my-10">
          <div className={style.TextLogo}>
            Create Your
          </div>

          <div className={style.TextLogo}>
            <div className="animate">C</div>
            <div className="animate">l</div>
            <div className="animate">a</div>
            <div className="animate">n</div>
            <div className="animate">d</div>
            <div className="animate">e</div>
            <div className="animate">r</div>
          </div>
        </div>
    </>
  )
}

export default Dashboard