import { Share2 } from "lucide-react";
import DialogWrapper from "./DialogWrapper";

function EventItems({
  id,
  name,
  date,
  dateEndCalendar,
  resetSelection
}: {
  id: number;
  name: string;
  date: Date;
  dateEndCalendar?: Date;
  resetSelection?:any;
}) {

  const formatDateRange = () => {
    if (date && dateEndCalendar) {
      return `${date.toLocaleDateString()} - ${dateEndCalendar.toLocaleDateString()}`;
    }
    return date.toLocaleDateString();
  };
  const shareEventButton = () => {
    return (
      <DialogWrapper
        eventId={id}
        title={name}
        date={date}
        dateEnd={dateEndCalendar}
        resetSelection={resetSelection}
        isSharing={true}
        JsxButton={<button className="ml-auto">
          <Share2 size={20} strokeWidth={1.3} />
        </button>}
        
      />

    )
  }

  return (
    <div className='mb-4 mx-1 flex justify-start py-1 border-b-2 border-blue-400' id={`event-${id}`}>
      <div className="flex justify-center flex-col">
      </div>
      <p><span className='font-semibold'>{formatDateRange()}</span> {name}</p>
      {shareEventButton()}
    </div>
  );
}

export default EventItems;