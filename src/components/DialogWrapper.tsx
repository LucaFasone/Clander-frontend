import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
  import From from '@/components/From';
import { Button } from "@/components/ui/button";
  
function DialogWrapper({selectedDay, selectedEndDay}: {selectedDay: Date, selectedEndDay: Date | undefined}) {
  return (
    <Dialog>
    <DialogTrigger asChild>
      <Button>Aggingi Evento</Button>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{selectedEndDay == undefined ?'Aggiungi un evento per il giorno ' + selectedDay.toLocaleDateString(): 'Aggiungi un evento per i giorni ' + selectedDay.toLocaleDateString() + ' - ' + selectedEndDay.toLocaleDateString() }</DialogTitle>
        <DialogDescription>
        <From 
          date={selectedDay}
          dateEnd={selectedEndDay}
        />
        </DialogDescription>
      </DialogHeader>
    </DialogContent>
  </Dialog>
  )
}

export default DialogWrapper