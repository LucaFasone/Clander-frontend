import { Link } from "@tanstack/react-router"
import { CalendarIcon } from "lucide-react"
import { Button } from "./ui/button"

function Navbar({ children }: { children: React.ReactNode | undefined }) {
  return (
    <header className="px-4 lg:px-6 h-14 flex items-center">
      <Button variant='link' className="flex items-center justify-center">
        <CalendarIcon className="h-6 w-6" />
        <span className="sr-only">Acme Eventi</span>
        Clander
      </Button>
      <nav className="ml-auto flex gap-4 sm:gap-6">
        <Button variant='link' className="text-sm font-medium hover:underline underline-offset-4" >
          Eventi
        </Button>
        <Button variant='link' className="text-sm font-medium hover:underline underline-offset-4" >
          Crea
        </Button>
        <Button variant='link' className="text-sm font-medium hover:underline underline-offset-4">
          Profilo
        </Button>
      </nav>
    </header>
  )
}

export default Navbar