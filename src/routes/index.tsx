import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  beforeLoad: async ({context}) =>{
   const {user} = await context.authentication 
   if(!user){
    throw redirect({to: '/landingpage'})
   }
   throw redirect({to: '/dashboard'})
  }
})