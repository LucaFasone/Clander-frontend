import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "./ui/button";
import { deleteEventById } from "@/lib/api";
import { useEvents } from "@/hooks/useEvents";
import { useCalendar } from "@/hooks/useCalendar";
//setSelectedDay: React.Dispatch<React.SetStateAction<Date | undefined>>, setSelectedRange: React.Dispatch<React.SetStateAction<DateRange | undefined>>
export default function DeleteButton({ Id, /*setSelectedDay setSelectedRange*/ }: { Id: number,  }) {
    const queryClient = useQueryClient();
    const { getAllEventQueryKey } = useEvents();
    const {resetSelection} = useCalendar();
    const mutation = useMutation({
        mutationFn: deleteEventById,
        onSuccess: () => {
            queryClient.setQueryData(getAllEventQueryKey,
                (event) => ({
                    ...event,
                    events: event!.events?.filter((e) => e.id !== Id),
                }))

            //setSelectedDay(undefined);
            //setSelectedRange(undefined);
            resetSelection();
        }
    })
    return (
        <Button
            className='bg-red-500'
            onClick={() => mutation.mutate({ Id })}
            disabled={mutation.isPending}
        >Elimina Evento
        </Button>

    )

}