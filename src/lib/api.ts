import { hc } from 'hono/client'
import { keepPreviousData, queryOptions } from "@tanstack/react-query"
import { type ApiRoutes } from "../../../index"
import { Event } from '@/lib/types';

const client = hc<ApiRoutes>('/')
export const api = client.api

const getUserProfile = async () => {
    const res = await api.me.$get()
    if (res.status === 401) {
        throw new Error("Server Error")
    }
    const data = await res.json()
    return data

}
export async function getAllSingleDayEvent() {
    const res = await api.calendar.$get();
    if (!res.ok) {
        throw new Error("Server error");
    }
    const data = await res.json();
    return data;
}
export async function getPaginatedEvents(page = 0) {    
    const res = await api.calendar[':pageNumber'].$get({ param: { pageNumber: String(page) } });
    if (!res.ok) {
        throw new Error("Server error");
    }
    const data = await res.json();
    return data

}
export async function deleteEventById({ Id }: { Id: number }) {
    const res = await api.calendar.event[":id"].$delete({ param: { id: String(Id) } });
    if (!res.ok) {
        throw new Error('Errore nella cancellazione dell\'evento');
    }
    return res.json();
}


export async function getEventFromMonth( page = 0,MonthNumber: number) {
    const res = await api.calendar.month[':monthNumber'].page[':pageNumber'].$get({ param: { monthNumber: String(MonthNumber), pageNumber: String(page) } });
    if (!res.ok) {
        throw new Error("Server error");
    }
    const data = await res.json();
    return data;
    
}
export async function updateEvent({Id,Event} : {Id: number, Event: Event}) {
    const res = await api.modify.$put({json: {eventId: Id, title: Event.title, description: Event.description, date: Event.date, dateEnd: Event.dateEnd, activeReminder: Event.activeReminder}});
    if (!res.ok) {
        throw new Error("Server error");
    }
    const data = await res.json();
    return data

    
}

export const userQueryOptions = queryOptions({
    queryKey: ["get-user-profile"],
    queryFn: getUserProfile,
    staleTime: Infinity,
})

export const getAllEventQueryOptions = queryOptions({
    queryKey: ['get-all-single-day-event'],
    queryFn: getAllSingleDayEvent,
    staleTime: Infinity
})
