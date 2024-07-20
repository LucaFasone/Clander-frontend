import { hc } from 'hono/client'
import { queryOptions } from "@tanstack/react-query"
import {type ApiRoutes} from "../../../index"

const client = hc<ApiRoutes>('/')
const api = client.api

const getUserProfile = async () => {
    const res = await api.me.$get()
    if (!res.ok) {
        throw new Error("Server Error")
    }
    const data = await res.json()
    return data
}
const getEventForUser = async () => {
    const res = await api.calendar.$get()
    if (!res.ok) {
        throw new Error("Server Error")
    }
    const data = await res.json()
    return data
}


export const userQueryOptions = queryOptions({
    queryKey: ["get-user-profile"],
    queryFn: getUserProfile,
    staleTime: Infinity,
  })
  export const eventQueryOptions = queryOptions({
    queryKey: ["get-events-user"],
    queryFn: getEventForUser,
    staleTime: Infinity,
  })