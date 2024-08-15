import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "./ui/button";
import { deleteEventById } from "@/lib/api";
import { useEvents } from "@/hooks/useEvents";
export default function DeleteButton({ Id, resetSelection, currentPage, currentMonth}: { Id: number, resetSelection: () => void, currentPage: number, currentMonth: number}) {
    
    const queryClient = useQueryClient();
    console.log(currentPage);
    
    const { getAllEventQueryKey } = useEvents();
    const mutation = useMutation({
        mutationFn: deleteEventById,
        onSuccess: () => {
            queryClient.setQueryData(getAllEventQueryKey,
                (event) => ({
                    ...event,
                    events: event!.events?.filter((e) => e.id !== Id),
                }))
           resetSelection()
           queryClient.invalidateQueries({queryKey:['event', currentPage, currentMonth]});
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