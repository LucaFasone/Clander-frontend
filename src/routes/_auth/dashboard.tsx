import { createFileRoute } from '@tanstack/react-router'
import { useState } from "react"
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
import { format, parse, startOfMonth, endOfMonth, isWithinInterval, addMonths, subMonths } from "date-fns"
import { it } from "date-fns/locale"
import { useEvents } from '@/hooks/useEvents'
import { usePagination } from '@/hooks/usePagination'

export const Route = createFileRoute('/_auth/dashboard')({
  component: Dashboard
})

function Dashboard() {
  const [date, setDate] = useState<{ from: Date; to: Date }>()
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [currentPage, setCurrentPage] = useState(1)
  const eventsPerPage = 6
  const events = useEvents(currentMonth.getMonth()+1).query.data?.events;



  const filteredEvents = events?.filter(event => {
    const eventStartDate = event.date
    const eventEndDate = event.dateEnd || eventStartDate

    return isWithinInterval(eventStartDate, {
      start: startOfMonth(currentMonth),
      end: endOfMonth(currentMonth)
    }) || isWithinInterval(eventEndDate, {
      start: startOfMonth(currentMonth),
      end: endOfMonth(currentMonth)
    })
  })

  const indexOfLastEvent = currentPage * eventsPerPage
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage
  const currentEvents = filteredEvents?.slice(indexOfFirstEvent, indexOfLastEvent)
  const totalPages = Math.ceil((filteredEvents?.length ?? 0) / eventsPerPage)


  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1))
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1))



  return (
    <main className="flex-1">
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex justify-between items-center mb-8">
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
          {currentEvents && currentEvents.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {currentEvents.map((event) => (
                <Card key={event.id} className={""}>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      {event.title}
                    </CardTitle>
                    <CardDescription>{new Date(event.date).toLocaleDateString()}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>{event.description}</p>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" size="sm" onClick={() => (console.log(event))}>
                      <Edit className="w-4 h-4 mr-2" />
                      Modifica
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => (console.log(event))}>
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
          
          

          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-8">
            {"Crea Nuovo Evento"} 
          </h2>
          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Titolo Evento</Label>
              <Input id="title" placeholder="Inserisci il titolo dell'evento" />
            </div>
            <div className="space-y-2">
              <Label>Intervallo Date Evento</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="date"
                    variant={"outline"}
                    className={`w-full justify-start text-left font-normal ${!date && "text-muted-foreground"}`}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date?.from ? (
                      date.to ? (
                        <>
                          {format(date.from, "d MMMM yyyy", { locale: it })} - {format(date.to, "d MMMM yyyy", { locale: it })}
                        </>
                      ) : (
                        format(date.from, "d MMMM yyyy", { locale: it })
                      )
                    ) : (
                      <span>Seleziona una data</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    initialFocus
                    mode="range"
                    defaultMonth={currentMonth}
                    selected={date}
                    onSelect={setDate}
                    numberOfMonths={2}
                    locale={it}
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Descrizione Evento</Label>
              <Textarea id="description" placeholder="Inserisci la descrizione dell'evento" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="sharedWith">Condividi con (email)</Label>
              <Input
                id="sharedWith"
                type="email"
                placeholder="Inserisci l'email con cui condividere"
              />
            </div>
            <Button type="submit" className="w-full">
              <PlusCircle className="w-4 h-4 mr-2" />
              {"Crea Evento"}
            </Button>
          </form>
        </div>
      </section>
    </main>
  )
}

