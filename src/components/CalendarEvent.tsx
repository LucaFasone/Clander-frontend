
function EventItems({
  id,
  name,
  date,
  dateEndCalendar
}: {
  id: number;
  name: string;
  date: Date;
  dateEndCalendar?: Date;
}) {

  const formatDateRange = () => {
    if (date && dateEndCalendar) {
      return `${date.toLocaleDateString()} - ${dateEndCalendar.toLocaleDateString()}`;
    }
    return date.toLocaleDateString();
  };

  return (
    <div className='mb-4 mx-1 flex justify-start' id={`event-${id}`}>
      <div className="flex justify-center flex-col">
      </div>
      <p><span className='font-semibold'>{formatDateRange()}</span> {name}</p>
    </div>
  );
}

export default EventItems;