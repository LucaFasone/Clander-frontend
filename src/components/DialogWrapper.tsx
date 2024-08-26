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



type DialogWrapperProps = formType & {
  JsxButton: JSX.Element;
  resetSelection: () => void;
  isSharing?: boolean;
};
function DialogWrapper({ date, dateEnd, currentMonth, currentPage, title, description, eventId, activeReminder, JsxButton, resetSelection,isSharing }: DialogWrapperProps) {
  function renderDialogTitle() {
    if(isSharing){
      return <DialogTitle>Informazioni sull evento </DialogTitle>
    }
    if (eventId) {
      return <DialogTitle>{dateEnd == undefined ? 'Modifica l evento per il giorno ' + date.toLocaleDateString() : 'Modifica l evento per i giorni ' + date.toLocaleDateString() + ' - ' + dateEnd.toLocaleDateString()}</DialogTitle>
    } else {
      return <DialogTitle>{dateEnd == undefined ? 'Aggiungi un evento per il giorno ' + date.toLocaleDateString() : 'Aggiungi un evento per i giorni ' + date.toLocaleDateString() + ' - ' + dateEnd.toLocaleDateString()}</DialogTitle>
    }
    
  }
  return (
    <Dialog >
      <DialogTrigger className={isSharing ? "ml-auto" : ""}>
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
              isSharing={isSharing}
              />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default DialogWrapper