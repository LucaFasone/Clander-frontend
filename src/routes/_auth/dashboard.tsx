import { Calendar } from '@/components/ui/calendar'
import { useCalendar } from '@/hooks/useCalendar';
import { createFileRoute } from '@tanstack/react-router'
import DialogWrapper from '@/components/DialogWrapper';
import CalendarEvent from '@/components/CalendarEvent';
import { Button } from '@/components/ui/button';
import { getYear, isEqual } from 'date-fns';
import { useEvents } from '@/hooks/useEvents';
import DeleteButton from '@/components/DeleteButton';
import { usePagination } from '@/hooks/usePagination';
import PaginationWrapper from '@/components/PaginationWrapper';
import React, { useEffect, useMemo } from 'react';
import EventLIst from '@/components/EventLIst';

export const Route = createFileRoute('/_auth/dashboard')({
  component: Dashboard
})

function Dashboard() {
  const [month, setMonth] = React.useState(new Date().getMonth() + 1);
  const [currentPage, setCurrentPage] = React.useState<number | null>(null);
  const { user } = Route.useRouteContext()
  const { selectedDay, handleDayClick, handleDayClickKeyUp, handleDayClickKeyDown, selectedRange, resetSelection } = useCalendar();
  const { query } = useEvents();
  //current selected Day page
  const { getEventPage, page, setPage, paginatedEvent } = usePagination(month);
  const { isPending, error, data } = query
  const memo =  useMemo(() => renderButton(),[selectedDay])

  const eventDays = data?.events.filter(d => d.dateEnd == null).map(d => new Date(d.date));
  const rangedEvents = data?.events
    .filter(event => event.dateEnd !== null)
    .map(event => ({
      from: new Date(event.date),
      to: new Date(event.dateEnd!) 
    })) || [];

function renderButton() {
    if (selectedDay || selectedRange?.to) {
      getEventPage(selectedDay).then((event) =>{
        setPage(event)
        setCurrentPage(event)
        
      }).catch((error) =>{
        console.log(error);
        
      })
      const event = data?.events.find(e => (isEqual(e.date, selectedDay!) && e.dateEnd == null) || (isEqual(e.date, selectedRange?.from!) && isEqual(e.dateEnd!, selectedRange?.to!)));
      if (event) {        
        return (
          <>
            <Button className='mr-3'>Modifica Evento</Button>
            <DeleteButton Id={event.id}
              resetSelection={resetSelection}
              currentPage={currentPage ? currentPage : -1}
              currentMonth={month}
            />
          </>
        );
      }
      return (
        <DialogWrapper
          selectedDay={selectedDay! || selectedRange?.from}
          selectedEndDay={selectedRange?.to}
        />
      );

    }
  }

  return (
    <div className='container flex flex-col items-center'>
      <h1 className='mt-2 text-3xl'>Dashboard</h1>
      <div className="">
        <h2>{user!.family_name}</h2>
        <h2>{user!.email}</h2>
        <h2>{user!.given_name}</h2>
      </div>
      <div className="!max-w-3xl min-[375px]:container mt-16 border-4 boxColorShadow p-0 relative ">
        <div className="md:flex ">
          <Calendar className={'md:w-1/2 md:p-3 z-0 p-0 '}
            classNames={{
              months: '',
              head_row: '',
              row: 'cursor-default',
            }}
            selected={eventDays}
            onDayClick={handleDayClick}
            onDayKeyDown={handleDayClickKeyDown}
            onDayKeyUp={handleDayClickKeyUp}
            isDisabled={false}
            modifiers={{
              fullRange: rangedEvents!,
              from: rangedEvents.filter(range => range.from !== undefined).map(range => range.from!),
              to: rangedEvents.filter(range => range.to !== undefined).map(range => range.to!),
              currentDaySelected: selectedDay!,
              selectedRange: selectedRange!
            }}
            modifiersClassNames={{
              selected: '!bg-blue-400',
              from: '!rounded-l-full',
              to: "!rounded-r-full",
              fullRange: 'bg-gray-400 !w-[47px] !rounded-none',
              selectedRange: '!bg-blue-400 !w-[47px] !rounded-none',
              completed: '!bg-green-400',
              late: '!bg-red-400',
              currentDaySelected: '!bg-[#46b59bbd] text-white',
            }}
            footer={
              <>
                <div className="flex justify-center">
                  <span className='text-sm text-slate-500'>Press shift if you want to select a range of days </span>
                </div>
                <div className="">
                  <div className="mt-4 flex justify-start w-1/2">
                    {memo}
                  </div>
                </div>
              </>
            }
            onMonthChange={(selectedMonth) => {
              setMonth(selectedMonth.getMonth() + 1);
              resetSelection()
            }}
          />
          <div className="md:w-1/2 p-3">
            <h2 className="text-2xl flex justify-center mb-5">All your event on {new Date(new Date().getFullYear(), month - 1, new Date().getDay()).toLocaleString('default', { month: 'long' })}</h2>
            <div className="mt-4">
              <EventLIst
                page={page}
                setPage={setPage}
                month={month}
                paginatedEvent={paginatedEvent}
              />
            </div>
          </div>
        </div>
      </div>
    </div>

  );

}

