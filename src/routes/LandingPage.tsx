import { createFileRoute, redirect } from '@tanstack/react-router'
import { Calendar } from '@/components/ui/calendar';
import style from './style.module.css';
import { Navbar } from '@/components';
import Marquee from "@/components/ui/marquee.tsx";


export const Route = createFileRoute('/LandingPage')({
  async beforeLoad({ context }) {
    const { user } = await context.authentication;
    if (user) {
      throw redirect({ to: '/' })
    }

  },
  component: LandingPage
})

function LandingPage() {
  return <div className=""></div>

  

}


