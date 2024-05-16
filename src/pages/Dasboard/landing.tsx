import { Calendar } from '@/components/ui/calendar';
import style from './style.module.css';
import { Navbar, ClanderBox, TextSection} from '@/components';
import React from 'react';

function LandingPage() {
  const [date, setDate] = React.useState<Date>(new Date())
  return (
    <>
      <Navbar />
      <div className="container my-5">
        <div className={`${style.TextLogo}  text-center font-default hidden mainColorsShadow sm:flex sm:text-6xl`}>
          Create Your
        </div>
        <div className={`${style.TextLogo} mainColorsShadow font-default text-7xl tracking-wide mt-2`}>
          <div className={style.bounce_animation}>C</div>
          <div className={style.bounce_animation}>l</div>
          <div className={style.bounce_animation}>a</div>
          <div className={style.bounce_animation}>n</div>
          <div className={style.bounce_animation}>d</div>
          <div className={style.bounce_animation}>e</div>
          <div className={style.bounce_animation}>r</div>
        </div>
      </div>
      <div className="flex justify-center relative">
        <ClanderBox className='blur select-none'/>
        <button className='absolute select-text top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 blur-0  boxColorShadow rounded-md border-2 font-secondary text-[#5D3FD3] font-semibold px-5 py-2'>Login</button> 
      </div>
      <div className="flex w-full justify-center ">
        <span className='my-5 font-default mainColorsShadow text-6xl font-bold tracking-wider'>Customize</span>
      </div>
      <div className="block overflow-hidden">
        <div className="overflow-x-hidden animate-marquee ">
        <Calendar 
          today={new Date(date.getFullYear(), date.getMonth(), 5)}
          className='inline-block mx-10 border-2 calendarTheme1 rounded-md select-none'
          classNames={
            {
              day_today: 'bg-[#1A5276] text-white'
            }
          }/>
         <Calendar 
          today={new Date(date.getFullYear(), 6, 15)}
          className='inline-block mx-10 border-2 calendarTheme2 rounded-md select-none'
          classNames={
            {
              day_today: 'bg-[#FFFF99] text-gray '
            }
          }
          />
         <Calendar 
          today={new Date(date.getFullYear(), 3, 8)}
          className='inline-block mx-10 border-2 calendarTheme3 rounded-md select-none'
          classNames={
            {
              day_today: 'bg-[#8A2BE2] text-white '
            }
          }
          />
           <Calendar 
          today={new Date(date.getFullYear(), 7, 20)}
          className='inline-block mx-10 border-2 calendarTheme4 rounded-md select-none'
          classNames={
            {
              day_today: 'bg-[#F5F5F5] text-gray '
            }
          }/>
        </div>
      </div>
      <div className="">
        <TextSection/>
        <TextSection/>
      </div>
    </>

  );
}

export default LandingPage;
