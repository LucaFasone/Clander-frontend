import { hc } from 'hono/client'
import { keepPreviousData, queryOptions } from "@tanstack/react-query"
import { wstype, type ApiRoutes } from "../../../index"
import { Event } from '@/lib/types';

const client = hc<ApiRoutes>('/')
export const api = client.api
const clientws = hc<wstype>('http://localhost:3000')
export const ws = clientws.ws.$ws(0)

//closure??
const getUserProfile = async () => {
    const res = await api.me.$get()
    if (res.status === 401) {
        throw new Error("Server Error")
    }
    const data = await res.json()
    return data

}
export async function getAllSingleDayEvent(month: number) {
    const res = await api.calendar[':month'].$get({ param: { month: String(month) } });
    if (!res.ok) {
        throw new Error("Server error");
    }
    const data = await res.json();
    return data;
}
export async function deleteEventById({ Id, currentMonth }: { Id: number, currentMonth: number }) {
    const res = await api.calendar.event[":id"].$delete({ param: { id: String(Id) } });
    if (!res.ok) {
        throw new Error('Errore nella cancellazione dell\'evento');
    }
    const wsMessage = JSON.stringify({
        type: 'delete',
        eventId: Id,
        month: currentMonth

    })
    
    ws.send(wsMessage)
    return res.json();
}


export async function getEventFromMonth(page = 0, MonthNumber: number) {
    const res = await api.calendar.month[':monthNumber'].page[':pageNumber'].$get({ param: { monthNumber: String(MonthNumber), pageNumber: String(page) } });
    if (!res.ok) {
        throw new Error("Server error");
    }
    const data = await res.json();
    return data;

}
export async function updateEvent({ Id, Event }: { Id: number, Event: Event }) {
    const res = await api.modify.$put({ json: { eventId: Id, title: Event.title, description: Event.description, date: Event.date, dateEnd: Event.dateEnd, activeReminder: Event.activeReminder } });
    if (!res.ok) {
        throw new Error("Server error");
    }
    const data = await res.json();        
   
    return data

}

export async function sendNotifyForShare(Id: number, email: string, permissions: string) {
    const res = await api.notifications.notifications.$post({ json: { Id, email, permissions } })
    if (!res.ok) {
        const { error } = await res.json();
        throw new Error(error);
    }
    const data = await res.json();
    const wsMessage = JSON.stringify({
        type: 'join',
        eventId: Id
    })
    ws.send(wsMessage)
    return data
}

async function getNotify() {
    const res = await api.notifications.notifications.$get()
    if (!res.ok) {
        throw new Error("Server error");
    }
    const data = await res.json();
    return data
}
export async function deleteNotify(Id: number) {
    const res = await api.notifications.notifications.$delete({ json: { id: Id } })
    if (!res.ok) {
        throw new Error("Server error")
    }
}
export async function addToSharedEvent(Id: number, userId: string) {
    const res = await api.calendar.sharedTo.$post({ json: { notificationId: Id } })
    if (!res.ok) {
        const { error } = await res.json();
        throw new Error(error);
    }
    const data = await res.json();
    const wsMessage = JSON.stringify({
        type: 'join',
        eventId: Number(data.idEvent),
        userId: userId,
        month: data.month,
        action: 'add'
    })
    ws.send(wsMessage)
    return data

}

export async function getEventById(Id: number) {
    const res = await api.calendar.getEvent.$post({ json: { idEvent: Id } })
    if (!res.ok) {
        throw new Error("Server error");
    }
    const data = await res.json();
    return data;
}

export const userQueryOptions = queryOptions({
    queryKey: ["get-user-profile"],
    queryFn: getUserProfile,
    staleTime: Infinity,
})

export const getNotifyOptions = queryOptions({
    queryKey: ["get-notification"],
    queryFn: getNotify,
    staleTime: Infinity,
    refetchInterval: 15000,
    refetchOnReconnect: true,
    refetchIntervalInBackground: true,
    refetchOnWindowFocus: true,
})

