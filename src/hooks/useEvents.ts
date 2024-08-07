import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api, deleteEventById, getAllEventQueryOptions } from '@/lib/api';

type Event = {
  title: string;
  description: string;
  date: Date;
  dateEnd: Date | undefined;
  activeReminder: boolean;
};
export function useEvents() {
  const queryClient = useQueryClient();
  const query = useQuery(getAllEventQueryOptions);
  const getAllEventQueryKey = getAllEventQueryOptions.queryKey 

  const addEvent = async (event: Event) => {
    const res = await api.calendar.event.$post({ json: event });
    if (!res.ok) {
      throw new Error('Evento non aggiunto');
    }
    const existingEvent = await queryClient.ensureQueryData(getAllEventQueryOptions);
    queryClient.setQueryData(getAllEventQueryKey, ({
      ...existingEvent,
      events: [...existingEvent.events, await res.json()]
    }))
  }

  return { query, addEvent, getAllEventQueryKey };
}
