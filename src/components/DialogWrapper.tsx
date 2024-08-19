import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import From from '@/components/From';
import { formType } from "../../../sharedTypes";
import { useState } from "react";
import { CalendarForm } from "./ui/test";



type DialogWrapperProps = formType & {
  JsxButton: JSX.Element;
  resetSelection: () => void;
};
function DialogWrapper({ date, dateEnd, currentMonth, currentPage, title, description, eventId, activeReminder, JsxButton, resetSelection }: DialogWrapperProps) {
  function renderDialogTitle() {
    if (eventId) {
      return <DialogTitle>{dateEnd == undefined ? 'Modifica l evento per il giorno ' + date.toLocaleDateString() : 'Modifica l evento per i giorni ' + date.toLocaleDateString() + ' - ' + dateEnd.toLocaleDateString()}</DialogTitle>
    } else {
      return <DialogTitle>{dateEnd == undefined ? 'Aggiungi un evento per il giorno ' + date.toLocaleDateString() : 'Aggiungi un evento per i giorni ' + date.toLocaleDateString() + ' - ' + dateEnd.toLocaleDateString()}</DialogTitle>
    }
  }
  return (
    <Dialog >
      <DialogTrigger >
        {JsxButton}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          {renderDialogTitle()}
          <DialogDescription>
            <From
              date={date}
              dateEnd={dateEnd}
              currentPage={currentPage}
              currentMonth={currentMonth}
              title={title}
              description={description}
              eventId={eventId}
              activeReminder={activeReminder}
              resetSelection={resetSelection}
              />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default DialogWrapper