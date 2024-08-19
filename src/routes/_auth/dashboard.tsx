import { Calendar } from '@/components/ui/calendar'
import { useCalendar } from '@/hooks/useCalendar';
import { createFileRoute } from '@tanstack/react-router'
import DialogWrapper from '@/components/DialogWrapper';
import { Button } from '@/components/ui/button';
import { isEqual } from 'date-fns';
import { useEvents } from '@/hooks/useEvents';
import DeleteButton from '@/components/DeleteButton';
import { usePagination } from '@/hooks/usePagination';
import React, { useMemo } from 'react';
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
  const { getEventPage, page, setPage, paginatedEvent } = usePagination(month);
  const { isPending, error, data } = query
  const renderButtonMemo = useMemo(() => renderButton(), [selectedDay, currentPage, selectedRange])

  const eventDays = data?.events.filter(d => d.dateEnd == null).map(d => new Date(d.date));
  const rangedEvents = data?.events
    .filter(event => event.dateEnd !== null)
    .map(event => ({
      from: new Date(event.date),
      to: new Date(event.dateEnd!)
    })) || [];

  function renderButton() {
    if (selectedDay || selectedRange?.to) {
      getEventPage(selectedDay || selectedRange!.from).then((event) => {
        setPage(event)
        setCurrentPage(event)
      }).catch((error) => {
        console.log(error);

      })
      const event = data?.events.find(e => (isEqual(e.date, selectedDay!) && e.dateEnd == null) || (isEqual(e.date, selectedRange?.from!) && isEqual(e.dateEnd!, selectedRange?.to!)));
      if (event) {
        return (
          <>
            <DialogWrapper
              JsxButton={<Button className='mr-3'>Modifica evento</Button>}
              eventId={event.id}
              date={new Date(event.date)}
              dateEnd={event.dateEnd ? new Date(event.dateEnd) : undefined}
              description={event.description || undefined}
              title={event.title}
              activeReminder={event.activeReminder!}
              currentMonth={month}
              currentPage={currentPage}
              resetSelection={resetSelection}

            />
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
          JsxButton={<Button>Aggiungi Evento</Button>}
          date={selectedDay! || selectedRange?.from}
          dateEnd={selectedRange?.to}
          currentMonth={month}
          currentPage={currentPage ? currentPage : -1}
          resetSelection={resetSelection}
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
            footer={
              <>
                <div className="flex justify-center">
                  <span className='text-sm text-slate-500'>Press shift if you want to select a range of days </span>
                </div>
                <div className="">
                  <div className="mt-4 flex justify-start w-1/2">
                    {renderButtonMemo}
                  </div>
                </div>
              </>
            }
            onMonthChange={(selectedMonth) => {
              setMonth(selectedMonth.getMonth() + 1);
              setPage(0);
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

