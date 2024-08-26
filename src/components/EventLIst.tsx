import { useEffect, useMemo } from "react";
import CalendarEvent from "./CalendarEvent"
import PaginationWrapper from "./PaginationWrapper"

function EventLIst({ page, month, setPage, paginatedEvent, resetSelection,maxPage }: { page: number, month: number, setPage: any, paginatedEvent: any, resetSelection: any, maxPage: number }){
      // Usa useMemo per calcolare se siamo sull'ultima pagina
  
    return (
        <div>
            {paginatedEvent?.map((event: any) => (
                <div key={event.id} className="">
                    <CalendarEvent
                        id={event.id} name={event.title} date={new Date(event.date)}
                        dateEndCalendar={event.dateEnd ? new Date(event.dateEnd) : undefined}
                        resetSelection={resetSelection}
                    

                    />
                </div>
            ))}
            <PaginationWrapper
                page={page}
                setPagePrev={() => setPage((page: number) => page == 0 ? page : page -= 1)}
                setPageNext={() => setPage((page: number) => {
                    if (page == maxPage) {
                        return page
                    }
                    return page += 1
                })}
            />
        </div>
    )
}

export default EventLIst