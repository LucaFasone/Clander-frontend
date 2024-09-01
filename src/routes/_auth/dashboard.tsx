import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { CalendarIcon, ChevronLeft, ChevronRight, PlusCircle, Share2, Edit, Trash2, Users } from "lucide-react"
import { format, parse, startOfMonth, endOfMonth, isWithinInterval, addMonths, subMonths, parseISO } from "date-fns"
import { useEvents } from '@/hooks/useEvents'
import { usePagination } from '@/hooks/usePagination'
import From from '@/components/From';
import { formType } from '../../../../sharedTypes'
import { DatabaseEvents } from '@/lib/types'
import { X } from 'lucide-react';
import { Skeleton } from "@/components/ui/skeleton"
import DeleteButton from '@/components/DeleteButton'

export const Route = createFileRoute('/_auth/dashboard')({
  component: Dashboard
})

function Dashboard() {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [currentPage, setCurrentPage] = useState(1)
  const [editingEvent, setEditingEvent] = useState<DatabaseEvents>(undefined)
  const eventsPerPage = 6
  const { query } = useEvents(currentMonth.getMonth());
  const { data, error, isPending } = query
  const events = data?.events


  const indexOfLastEvent = currentPage * eventsPerPage
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage
  const currentEvents = events?.slice(indexOfFirstEvent, indexOfLastEvent)

  const totalPages = Math.ceil((events?.length ?? 0) / eventsPerPage)
  const nextMonth = () => { setCurrentMonth(addMonths(currentMonth, 1)); setCurrentPage(1); }
  const prevMonth = () => { setCurrentMonth(subMonths(currentMonth, 1)); setCurrentPage(1) }


  return (
    <main className="flex-1">
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Eventi di {new Date(currentMonth).toLocaleString('default', { month: 'long', year: 'numeric' })}</h2>
            <div className="flex items-center space-x-2">
              <Button onClick={prevMonth} variant="outline" size="icon">
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">Mese precedente</span>
              </Button>
              <Button onClick={nextMonth} variant="outline" size="icon">
                <ChevronRight className="h-4 w-4" />
                <span className="sr-only">Mese successivo</span>
              </Button>
            </div>
          </div>
          <div className="">
            <Button className='mb-4' onClick={() => setCurrentMonth(new Date())}>Go To Today</Button>

          </div>
          {isPending &&
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card className="w-full max-w-md">
                <CardHeader className="pb-2">
                  <Skeleton className="h-6 w-2/3" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-4 w-1/3" />
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Skeleton className="h-9 w-[30%]" />
                  <Skeleton className="h-9 w-[30%]" />
                  <Skeleton className="h-9 w-[30%]" />
                </CardFooter>
              </Card>
              <Card className="w-full max-w-md">
                <CardHeader className="pb-2">
                  <Skeleton className="h-6 w-2/3" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-4 w-1/3" />
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Skeleton className="h-9 w-[30%]" />
                  <Skeleton className="h-9 w-[30%]" />
                  <Skeleton className="h-9 w-[30%]" />
                </CardFooter>
              </Card>
              <Card className="w-full max-w-md">
                <CardHeader className="pb-2">
                  <Skeleton className="h-6 w-2/3" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-4 w-1/3" />
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Skeleton className="h-9 w-[30%]" />
                  <Skeleton className="h-9 w-[30%]" />
                  <Skeleton className="h-9 w-[30%]" />
                </CardFooter>
              </Card>

            </div>}
          {currentEvents && currentEvents.length > 0 ? (
            //componente a parte!!!!!
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {currentEvents.map((event) => (
                <Card key={event.id} className={""}>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between ">
                      <div className='break-all'>
                        {event.title}
                      </div>
                    </CardTitle>
                    <CardDescription>{event.dateEnd ? new Date(event.date).toLocaleDateString() + " - " + new Date(event.dateEnd).toLocaleDateString() : new Date(event.date).toLocaleDateString()}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className='break-all'>{event.description}</p>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" size="sm" onClick={() => setEditingEvent(event)}>
                      <Edit className="w-4 h-4 mr-2" />
                      Modifica
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => console.log("s")}>
                      <Share2 className="w-4 h-4 mr-2" />
                      Condividi
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => { console.log(event) }}>
                      <Trash2 className="w-4 h-4 mr-2" />
                      Elimina
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            isPending ? null
              :
              <p className="text-center text-gray-500">Nessun evento in questo mese.</p>

          )}
          {totalPages > 1 && (
            <div className="flex justify-center mt-8 space-x-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <Button
                  key={page}
                  variant={currentPage === page ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </Button>
              ))}
            </div>
          )}
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
        <div className="container px-4 md:px-6">
          {/*Usare i pulsanti per aggiornare lo stato e aggiungere isSharing e il controllo per la modifica usare chiamare il componente form da qua */}
          {/*assegnare a modify l evento selezionato e controllare l esistenza tramite l id (come in passato) */}
          {/*usare il dialog per la conferma dell eliminazione e di default deve aggiungere un evento */}
          <div className="flex items-end mb-8 ">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl  ">{editingEvent ? "Modifica Evento" : "Crea Nuovo Evento"}</h2>
            {editingEvent &&
              <div className='mx-4'>
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full border-red-200 text-red-500 hover:bg-red-50 hover:text-red-600 hover:border-red-300 transition-colors"
                  onClick={() => setEditingEvent(undefined)}
                >
                  <X className="h-4 w-4" />
                  <span className="sr-only">Chiudi</span>
                </Button>
              </div>}
          </div>
          <From
            key={editingEvent?.id}
            date={editingEvent ? new Date(editingEvent.date) : undefined}
            dateEnd={editingEvent?.dateEnd ? new Date(editingEvent.dateEnd) : undefined}
            title={editingEvent?.title}
            description={editingEvent?.description || undefined}
            eventId={editingEvent?.id || undefined}
            currentMonth={ editingEvent ? new Date(editingEvent.date).getMonth() : undefined}
            reset={editingEvent ? () => setEditingEvent(undefined) : undefined}
          />
        </div>
      </section>
    
    </main>

  )
}

