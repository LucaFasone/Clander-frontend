function EventItems({id,name,status,date,isClander,dateEndClander}:{id:number,name:string,status:string, date:Date,isClander:boolean, dateEndClander?:Date}) {
  const EventStutsBg:string = status == "complete" ?  "bg-green-400" : status == "progress" ? "bg-blue-400" : "bg-red-400";
  
  return (
    <div className='mb-4 mx-1 flex justify-start 'id={''+id}>
      <div className="flex justify-center flex-col">
    <div className={`${EventStutsBg} p-3 rounded-full me-5`}></div>
    </div>
      <p><span className='font-semibold'>{isClander ? date.toLocaleDateString() +' - '+ dateEndClander?.toLocaleDateString(): date.toLocaleDateString()}</span> {name}</p>
    </div> 
    
  )
}

export default EventItems 