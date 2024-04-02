import { Button } from "../ui/button"

function Navbar() {
  return (
    <div className="w-full flex bg-[#46b59bbd] shadow p-5 flex-row-reverse text-white">
      <ul>
        <Button >Register</Button>
        <Button className="mx-2">Login</Button>
      </ul>
    </div>
  )
}

export default Navbar