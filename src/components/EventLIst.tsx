import CalendarEvent from "./CalendarEvent"
import PaginationWrapper from "./PaginationWrapper"

function EventLIst({ page, month, setPage, paginatedEvent }: { page: number, month: number, setPage: any, paginatedEvent: any }) {
    return (
        <div>
            {paginatedEvent?.map((event: any) => (
                <div key={event.id} className="">
                    <CalendarEvent
                        id={event.id} name={event.title} date={new Date(event.date)}
                        dateEndCalendar={event.dateEnd ? new Date(event.dateEnd) : undefined}
                    />
                </div>
            ))}
            <PaginationWrapper
                page={page}
                setPageNext={() => setPage((page: number) => page == 0 ? page : page -= 1)}
                setPagePrev={() => setPage((page: number) => {
                    if (paginatedEvent?.length! < 5) {
                        return page
                    }
                    return page += 1
                })}
            />
        </div>
    )
}

export default EventLIst