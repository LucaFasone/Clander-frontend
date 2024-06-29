import { Calendar } from './ui/calendar'
import { CalendarEvent } from '@/components'
import React, { useEffect } from 'react'

function ClanderBox({ className }: { className: string }) {
  const [date, setDate] = React.useState<Date>(new Date())
  const user = {
    islogged: false,
  }

  useEffect(() => {

  }, [date])

  return (
    <div className="border-4 boxColorShadow ">
      <div className={`${className} items-center flex flex-col lg:flex-row` }>
        <Calendar
          mode="single"
          onSelect={(currentDate?: Date) => {if(user.islogged) {
          }}}
          disableNavigation
          />
      </div>
    </div>
  )
}

export default ClanderBox 