import { getPaginatedEvents } from "@/lib/api";
import { keepPreviousData, useQuery, useQueryClient } from "@tanstack/react-query";
import { compareAsc } from "date-fns";
import { useState } from "react";

export const usePagination = () => {
    const [page, setPage] = useState(0)
    const queryClient = useQueryClient()

    const {data,isPending} = useQuery({
        queryKey: ['event', page],
        queryFn: () => getPaginatedEvents(page),
        placeholderData: keepPreviousData,
    })

    async function getEventPage(selectedDay: Date | undefined) {
        if (selectedDay === undefined) {
            return -1
        }
        const batchSize = 4;  //Parallelization?? dont know if this is optimal or not 
        let page = 0;
        while (true) {
            const queries = Array.from({ length: batchSize }, (_, i) => {
                return queryClient.fetchQuery({
                    queryKey: ['Paginatedevents', page + i],
                    queryFn: () => getPaginatedEvents(page + i),
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