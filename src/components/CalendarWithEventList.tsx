import { useCalendar } from "@/hooks/useCalendar";
import { useEvents } from "@/hooks/useEvents";
import { usePagination } from "@/hooks/usePagination";
import { isEqual } from "date-fns";
import React, { useEffect, useMemo } from "react";
import DialogWrapper from "./DialogWrapper";

import DeleteButton from "./DeleteButton";
import { Calendar } from "./ui/calendar";
import EventLIst from "./EventLIst";
import { Button } from "./ui/button";
import CalendarFooter from "./CalendarFooter";
import { DatabaseEvents } from "@/lib/types";

function CalendarWithEventList({ events }: { events: DatabaseEvents }) {

    const [month, setMonth] = React.useState(new Date().getMonth() + 1);
    const [currentPage, setCurrentPage] = React.useState<number>(0);
    const { selectedDay, handleDayClick, handleDayClickKeyUp, handleDayClickKeyDown, selectedRange, resetSelection } = useCalendar();
    const { getEventPage, page, setPage, paginatedEvent } = usePagination(month);
    const renderButtonMemo = useMemo(() => renderButton(), [selectedDay, currentPage, selectedRange])
    const [maxPage, setMaxPage] = React.useState<number>(Math.floor(0 || (events?.length ?? 0) / 4));

    const eventDays = events?.filter(d => d.dateEnd == null).map(d => new Date(d.date));
    const rangedEvents = events
        ?.filter(event => event.dateEnd !== null)
        .map(event => ({
            from: new Date(event.date),
            to: new Date(event.dateEnd!)
        })) || [];

    useEffect(() => {
        setMaxPage(Math.floor(0 || (events?.length ?? 0) / 4)) //remove??
    }, [events, page])



    function renderButton() {
        if (selectedDay || selectedRange?.to) {
            getEventPage(selectedDay || selectedRange!.from).then((event) => {
                setCurrentPage(event)

            }).catch((error) => {
                console.log(error);

            })
            const event = events?.find(e => (isEqual(e.date, selectedDay!) && e.dateEnd == null) || (isEqual(e.date, selectedRange?.from!) && isEqual(e.dateEnd!, selectedRange?.to!)));
            if (event) {
                setPage(currentPage)

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
        <div className="md:flex ">
            <Calendar className={'md:w-1/2 md:p-3 z-0 p-0 '}
                classNames={{
                    months: '',
                    head_row: '',
                    row: 'cursor-default',
                }}
                selected={eventDays}
                currentSelectedDay={selectedDay}
                currentSelectedRange={selectedRange}
                rangedEvents={rangedEvents}
                onDayClick={handleDayClick}
                onDayKeyDown={handleDayClickKeyDown}
                onDayKeyUp={handleDayClickKeyUp}
                isDisabled={false}
                footer={CalendarFooter(renderButtonMemo)}
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
                        resetSelection={resetSelection}
                        maxPage={maxPage}

                    />
                </div>
            </div>
        </div>
    )
}

export default CalendarWithEventList