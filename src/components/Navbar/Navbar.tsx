import { Button } from "../ui/button"
import Logo from "../Logo/Logo"

function Navbar() {
  return (
    <div className="w-full flex bg-[#46b59bbd] shadow items-center text-white">
      <Logo/> 
      <ul>
        <Button>Login</Button>
      </ul>
    </div>
  )
}

export default Navbar