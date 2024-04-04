import { Button } from "../ui/button"
import logo from "../../assets/logo.svg"
function Navbar() {
  return (
    <div className="w-full flex bg-[#46b59bbd] shadow  text-white">
      <img src={logo} className="logoImg"/>
      <ul>
        <Button>Login</Button>
      </ul>
    </div>
  )
}

export default Navbar