import { getEventFromMonth } from "@/lib/api";
import { keepPreviousData, useQuery, useQueryClient } from "@tanstack/react-query";
import { compareAsc } from "date-fns";
import { useState } from "react";

export const usePagination = (monthNumber: number) => {
    const [page, setPage] = useState(0)
    const queryClient = useQueryClient()
    const { data, isPending } = useQuery({
        queryKey: ['event', page, monthNumber],
        queryFn: () => getEventFromMonth(page, monthNumber),
        placeholderData: keepPreviousData,
    })
  
    async function getEventPage(selectedDay: Date | undefined) {
        if (selectedDay === undefined) {
            return -1
        }
        const batchSize = 10;  //Parallelization?? dont know if this is optimal or not 
        let page = 0;
        while (true) {
            const queries = Array.from({ length: batchSize }, (_, i) => {
                return queryClient.fetchQuery({
                    queryKey: ['Paginatedevents', page + i, monthNumber],
                    queryFn: () => getEventFromMonth(page + i, monthNumber),
                    gcTime: 0,
                    staleTime: 0,
                });
            });
            const results = await Promise.all(queries);
            for (let i = 0; i < results.length; i++) {

                const { events } = results[i];
                const eventFound = events.find((e) => new Date(e.date).getTime() === selectedDay?.getTime());
                if (eventFound) {
                    return page + i
                }
                const shouldInsertBefore = events.find(e => compareAsc(new Date(e.date), selectedDay!) > 0);
                if (shouldInsertBefore) {
                    return page + i
                }
                if (events.length < 5) {
                    return page + i
                }
            }
            page += batchSize;
        }
    }
    const paginatedEvent = data?.events;

    return { paginatedEvent, getEventPage, page, setPage }
}