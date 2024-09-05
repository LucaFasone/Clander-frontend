import { addToSharedEvent, api, deleteNotify, getEventById } from "@/lib/api"
import { useQueryClient } from "@tanstack/react-query"
import { useEvents } from "./useEvents"
import { ws } from '@/lib/api'

export const useNotifications = (userId: string) => {
    const queryClient = useQueryClient()
    const rejectNotify = async (Id: number) => {
        try {
            await deleteNotify(Id)
            queryClient.invalidateQueries({ queryKey: ['get-notification'] })
        } catch (err) {
            alert('Error')
            queryClient.invalidateQueries({ queryKey: ['get-notification'] })
        }
    }
    const acceptNotify = async (Id: number) => {
        try {
            const { idEvent, success } = await addToSharedEvent(Id)
            if (!success) {
                alert("Error sharing event")
                queryClient.invalidateQueries({ queryKey: ['get-notification'] })
            }
            const data = await getEventById(idEvent)
            if ('error' in data) {
                queryClient.invalidateQueries({ queryKey: ['get-notification'] })
                alert(data.error)
                return 'error'
            }
            queryClient.invalidateQueries({ queryKey: ['get-notification'] })
            const wsMessage = JSON.stringify({
                type: 'join',
                eventId: idEvent,
                userId: userId,
            })
            ws.send(wsMessage)

        } catch (err) {
            alert(err)
            queryClient.invalidateQueries({ queryKey: ['get-notification'] })

        }

    }

    return { rejectNotify, acceptNotify }
}