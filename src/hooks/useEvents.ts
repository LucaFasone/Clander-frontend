import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api, getAllEventQueryOptions, updateEvent } from '@/lib/api';
import { Event } from '@/lib/types';

export function useEvents() {
  const queryClient = useQueryClient();
  // TODO: get all events from the CURRENT MONTH NOT ALL EVENT!!!
  const query = useQuery(getAllEventQueryOptions);
  const getAllEventQueryKey = getAllEventQueryOptions.queryKey;

  const mutation = useMutation({
    mutationFn: updateEvent,
    onSuccess: (data, variables) => {
      queryClient.setQueryData(getAllEventQueryKey, (oldData: any) => {
        if (!oldData) return oldData;

        return {
          ...oldData,
          events: oldData.events.map((event: any) => {
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
          }),
        };
      });
    },
  });

  const addEvent = async (event: Event, page: number | null, month: number | undefined) => {
    const res = await api.calendar.event.$post({ json: event });
    if (!res.ok) {
      throw new Error('Evento non aggiunto');
    }
    const existingEvent = await queryClient.ensureQueryData(getAllEventQueryOptions);
    queryClient.setQueryData(getAllEventQueryKey, ({
      ...existingEvent,
      events: [...existingEvent.events, await res.json()].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    }));
    queryClient.invalidateQueries({ queryKey: ['event', page, month] });
  };

  const updateEventAndRefreshData = (Id: number, Event: Event, page: number | null, month: number | undefined) => {
    queryClient.invalidateQueries({ queryKey: ['event', page, month] });
    mutation.mutate({ Id, Event });

  };

  return { query, addEvent, getAllEventQueryKey, updateEventAndRefreshData };
}
