import { Calendar } from '@/components/ui/calendar';
import style from './style.module.css';
import { Navbar, CalendarEvent } from '@/components';

function LandingPage() { 
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
      <div className="!max-w-3xl min-[375px]:container mt-16 border-4 boxColorShadow p-0 ">
        <div className="lg:flex ">
          <div className="">
            <Calendar
              classNames={{
                months: '',
                head_row: '',
                row: '',
              }}
              defaultMonth={new Date(2024, 5)}
              disableNavigation
            />
          </div>
        </div>

        {/*<button className='absolute select-text top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 blur-0  boxColorShadow rounded-md border-2 font-secondary text-[#5D3FD3] font-semibold px-5 py-2'>Login</button>*/}

      </div>
    </>
  );
}

export default LandingPage;
