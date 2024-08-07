import { createFileRoute, redirect } from '@tanstack/react-router'
import { Calendar } from '@/components/ui/calendar';
import style from './style.module.css';
import { CalendarEvent, Navbar } from '@/components';
import Marquee from "@/components/ui/marquee.tsx";


export const Route = createFileRoute('/LandingPage')({
 async beforeLoad({context}) {
    const {user} = await context.authentication;
    if (user) {
      throw redirect({to: '/'})
    }

  },
  component: LandingPage
})

function LandingPage() {

    const slectedRange: ({ from: Date; to: Date, name: string, status: string })[] = [{
      from: new Date(2024, 5, 10),
      to: new Date(2024, 5, 13),
      name: "Event 1",
      status: "complete"
    },
    {
      from: new Date(2024, 5, 17),
      to: new Date(2024, 5, 18),
      name: "Event 2",
      status: "progress"
    }]
  
    return <>
  
      {/*TODO: create a component for texts*/}
      
      <Navbar children={undefined}/>
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
  
      <div className="!max-w-3xl min-[375px]:container mt-16 border-4 boxColorShadow p-0 relative ">
        <div className="md:flex blur select-none">
          <Calendar className={'md:w-1/2  z-0'}
            classNames={{
              months: '',
              head_row: '',
              row: 'cursor-default',
            }}
            defaultMonth={new Date(2024, 5)}
            disableNavigation
            modifiers={
              {
                progress: [new Date(2024, 5, 30), ...slectedRange.filter(range => range.status === "progress")],
                completed: [new Date(2024, 5, 7), ...slectedRange.filter(range => range.status === "complete")],
                late: [new Date(2024, 5, 26), ...slectedRange.filter(range => range.status === "late")],
                fullRange: slectedRange,
                from: slectedRange.map(range => range.from!),
                to: slectedRange.map(range => range.to!)
              }
            }
            isDisabled={true}
          />
          <div className='w-1/2 pt-3 mt-[40px]'>
            <CalendarEvent id={0}
              name={'Travel to Mars'}
              date={new Date(2024, 5, 7)}
              
            />
            <CalendarEvent id={1} name={'Go to watch oppy film'} date={new Date(2024, 5, 26)} 

              
            />
            <CalendarEvent id={2} name={'Event 1'} date={new Date(2024, 5, 30)} 
              
            />

            {slectedRange.map((range, index) => {
              return <CalendarEvent key={index} id={index} name={range.name} date={range.from} 
               dateEndCalendar={range.to}
              />;
            })}
          </div>
        </div>
        <button
          className='absolute select-text top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 blur-0 boxColorShadow rounded-md border-2 font-secondary text-[#5D3FD3] font-semibold px-5 py-2'  onClick={(e) => {
            e.preventDefault();
            window.location.href='/api/login';
            }}>Login
        </button>
      </div>
  
      <div className={`${style.TextLogo}  text-center font-default  mt-10 mainColorsShadow sm:flex sm:text-6xl`}>
        Customize
      </div>
      <div className="overflow-hidden mt-4">
        <Marquee>
          <Calendar
            disableNavigation={true}
            defaultMonth={new Date(2024, 11)}
            today={undefined}
            classNames={{
              cell: 'w-9 text-center'
            }}
            className={"calendarTheme1 border-2 rounded-md "}
            isDisabled={true}
            showOutsideDays={true}
          />
          <Calendar
            disableNavigation={true}
            defaultMonth={new Date(2024, 6)}
            today={undefined}
            classNames={{ cell: 'w-9 text-center' }}
            className={"calendarTheme2 border-2 rounded-md "}
            isDisabled={true}
            showOutsideDays={true}
          />
          <Calendar
            disableNavigation={true}
            defaultMonth={new Date(2024, 3)}
            today={undefined}
            classNames={{ cell: 'w-9 text-center' }}
            className={"calendarTheme3 border-2 rounded-md "}
            isDisabled={true}
            showOutsideDays={true}
          />
          <Calendar
            disableNavigation={true}
            defaultMonth={new Date(2024, 2)}
            today={undefined}
            classNames={{ cell: 'w-9 text-center' }}
            className={"calendarTheme4 border-2 rounded-md "}
            isDisabled={true}
            showOutsideDays={true}
          />
        </Marquee>
  
      </div>
    </>;
  }
  

  