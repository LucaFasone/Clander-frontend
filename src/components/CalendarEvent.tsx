
function EventItems({
  id,
  name,
  status,
  date,
  isCalendar,
  dateEndCalendar
}: {
  id: number;
  name: string;
  status: string;
  date: Date;
  isCalendar: boolean;
  dateEndCalendar?: Date;
}) {
  const eventStatusBg: string = status === 'complete' ? 'bg-green-400' :
                        status === 'progress' ? 'bg-blue-400' :
                        'bg-red-400';

  const formatDateRange = () => {
    if (isCalendar && dateEndCalendar) {
      return `${date.toLocaleDateString()} - ${dateEndCalendar.toLocaleDateString()}`;
    }
    return date.toLocaleDateString();
  };

  return (
    <div className='mb-4 mx-1 flex justify-start' id={`event-${id}`}>
      <div className="flex justify-center flex-col">
        <div className={`${eventStatusBg} p-3 rounded-full mr-5`}></div>
      </div>
      <p><span className='font-semibold'>{formatDateRange()}</span> {name}</p>
    </div>
  );
}

export default EventItems;