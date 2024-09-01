import { queryOptions, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api, deleteEventById, getAllSingleDayEvent, updateEvent } from '@/lib/api';
import { Event } from '@/lib/types';
export function useEvents(month: number) {

  const queryClient = useQueryClient();
  const getAllEventQueryOptions = queryOptions({
    queryKey: ['get-all-single-day-event', month],
    queryFn: () => getAllSingleDayEvent(month),
    staleTime: Infinity
  })

  const sortEventsByDate = (events: any[]) => {
    return events.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  };

  const query = useQuery(getAllEventQueryOptions)
  const getAllEventQueryKey = getAllEventQueryOptions.queryKey;

  //in all of this code is intedent to not use queryClient.invalidateQuery/refetchQueries bc i just wanted to update the chace and not refetch the data from the server
  //this should be faster but the code is more verbose and harder to read/maintain

  const mutation = useMutation({
    mutationFn: updateEvent,
    onSuccess: (data, variables) => {
      const updatedMonth = variables.Event.date.getMonth();
      queryClient.setQueryData(['get-all-single-day-event', month], (oldData: any) => {
        if (!oldData) return oldData;
        const currentMonth = new Date(oldData.events[0]?.date).getMonth();
        if (updatedMonth !== currentMonth) {
          const updatedEvents = oldData.events.filter((event: any) => event.id !== variables.Id);
          return {
            ...oldData,
            events: sortEventsByDate(updatedEvents)
          };
        }
        const updatedEvents = oldData.events.map((event: any) => {
          if (event.id === variables.Id) {
            return {
              ...event,
              date: variables.Event.date,
              dateEnd: variables.Event.dateEnd ?? null,
              title: variables.Event.title,
              activeReminder: variables.Event.activeReminder,
              description: variables.Event.description,
            };
          }
          return event;
        })
        return {
          ...oldData,
          events: sortEventsByDate(updatedEvents)
        }
      });

      if (updatedMonth !== month) {
        queryClient.setQueryData(['get-all-single-day-event', updatedMonth], (oldNewMonthData: any) => {
          if (!oldNewMonthData) return oldNewMonthData;
          return {
            ...oldNewMonthData,
            events: sortEventsByDate([
              ...oldNewMonthData.events,
              {
                id: variables.Id,
                date: variables.Event.date,
                dateEnd: variables.Event.dateEnd ?? null,
                title: variables.Event.title,
                activeReminder: variables.Event.activeReminder,
                description: variables.Event.description,
              },
            ]),
          };
        });
      }
    },
    onError: (error) => {
      console.error("Failed to update event:", error);
      alert("Errore durante l'aggiornamento dell'evento. Riprova.");
    },
  });


  const addEvent = async (event: Event) => {
    const res = await api.calendar.event.$post({ json: event });
    if (!res.ok) {
      throw new Error('Evento non aggiunto');
    }
    const existingEvent = await queryClient.ensureQueryData(queryOptions({
      queryKey: ['get-all-single-day-event', event.date.getMonth()],
      queryFn: () => getAllSingleDayEvent(event.date.getMonth()),
      staleTime: Infinity
    }));

    queryClient.setQueryData(['get-all-single-day-event', event.date.getMonth()], ({
      ...existingEvent,
      events: [...existingEvent.events, await res.json()].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    }));

  };

  const updateEventAndRefreshData = (Id: number, Event: Event) => {
    mutation.mutate({ Id, Event });

  };

  return { query, addEvent, getAllEventQueryKey, updateEventAndRefreshData };
}
