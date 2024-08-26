import { Link } from "@tanstack/react-router"

function Navbar({ children }: { children: React.ReactNode | undefined }) {
  return (
    <div className="w-full flex mainColorsShadow font-default bg-[#46b59b] shadow items-center justify-between text-white">
      <Link to="/">
        <div className='text-[2.3rem] font-bold mx-3 text-center '>
          Clander
        </div>
      </Link>
      <div className="flex font-secondary mr-5 items-center ">
        {children}
      </div>
    </div>
  )
}

export default Navbar