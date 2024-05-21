import { Calendar } from './ui/calendar'
import { CalendarEvent } from '@/components'
import React, { useEffect } from 'react'

function ClanderBox({ className }: { className: string }) {
  const [date, setDate] = React.useState<Date>(new Date())
  const [user, setUser] = React.useState([]) //use context

  useEffect(() => {

  }, [date])
  return (
    <div className="border-4 boxColorShadow ">
      <div className={`${className} items-center flex flex-col lg:flex-row` }>
        <Calendar
          mode="single"
          onSelect={(currentDate?: Date) => {if(user){
          }}}
          disableNavigation
          />
        <div className="flex  justify-center h-full flex-col py-3 ps-3 me-3">
          <div id="userNotLogged">
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
      </div>
    </div>
  )
}

export default ClanderBox 