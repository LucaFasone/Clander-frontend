import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "./ui/button";
import { deleteEventById } from "@/lib/api";
import { useEvents } from "@/hooks/useEvents";
import { useToast } from "@/hooks/use-toast";

//TODO: Put this in useEvents
export default function DeleteButton({ Id, currentMonth,resetSelection }: { Id: number, resetSelection: () => void, currentMonth: number }) {
    const queryClient = useQueryClient();
    const { toast } = useToast()
    const { getAllEventQueryKey } = useEvents(currentMonth);
    const mutation = useMutation({
        mutationFn: deleteEventById,
        onSuccess: () => {
            queryClient.setQueryData(getAllEventQueryKey,
                (event) => ({
                    ...event,
                    events: event!.events?.filter((e) => e.id !== Id),
                }))
                resetSelection()
                toast({
                    title: "Deleted Event successfully",
                })
        },
        onError: () => {
            alert("Errore durante l'eliminazione dell'evento")
            resetSelection()
        }
    })
    return (
        <Button
            variant="destructive"
            onClick={() => mutation.mutate({ Id })}
            disabled={mutation.isPending}
        >Elimina Evento
        </Button>

    )

}