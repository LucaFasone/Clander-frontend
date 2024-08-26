import { createFileRoute } from '@tanstack/react-router'
import { useEvents } from '@/hooks/useEvents';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import CalendarWithEventList from '@/components/CalendarWithEventList';

export const Route = createFileRoute('/_auth/dashboard')({
  component: Dashboard
})

function Dashboard() {
  const events = useEvents().query.data?.events;



  return (
    <div className='container flex flex-col items-center'>
      <h1 className='mt-2 text-3xl'>Dashboard</h1>
      <div className="!max-w-3xl min-[375px]:container mt-16 border-4 boxColorShadow p-0 relative ">
        <Tabs defaultValue='account' className='mt-2'>
          <TabsList className='w-full'>
            <TabsTrigger className='w-1/2' value="account">All Event</TabsTrigger>
            <TabsTrigger className='w-1/2' value="shared">Shared Events</TabsTrigger>
          </TabsList>
          <TabsContent value='account'>
            <CalendarWithEventList
              events={events}
            />
          </TabsContent >
          <TabsContent value='shared'>
           
          </TabsContent>
        </Tabs>

      </div>
    </div>
  );

}

