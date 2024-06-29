import { Calendar } from '@/components/ui/calendar';
import style from './style.module.css';
import { Navbar, ClanderBox, TextSection, CalendarEvent } from '@/components';
import React from 'react';
import { addDays } from 'date-fns';

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
      <div className="flex justify-center relative ">
        <div className="flex border-4 boxColorShadow ">
          <Calendar className=' w-1/2' />
          <div className=" py-3 w-1/2 ">
            <div className="">
              <CalendarEvent
                id={1}
                nome={"Viaggio a OppyLand"}
                status={"progress"}
                isClander={true}
                date={new Date('2024/05/02')}
                dateEndClander={new Date("2024/05/18")}
              />
              <CalendarEvent
                id={2}
                nome={"Wash car"}
                status={"complete"}
                isClander={false}
                date={new Date('2024/05/21')}
              />
              <CalendarEvent
                id={3}
                nome={"Oppy Lecture"}
                status={"complete"}
                isClander={false}
                date={new Date('2024/02/16')}
              />
              <CalendarEvent
                id={4}
                nome={"Oppy Exam"}
                status={""}
                isClander={false}
                date={new Date('2024/06/20')}
              />
              <CalendarEvent
                id={4}
                nome={"Go out with friend"}
                status={"complete"}
                isClander={false}
                date={new Date('2024/12/1')}
              />
            </div>
          </div>
          <button className='absolute select-text top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 blur-0  boxColorShadow rounded-md border-2 font-secondary text-[#5D3FD3] font-semibold px-5 py-2'>Login</button>
          </div>
        </div>
        </>
      );
}

      export default LandingPage;
