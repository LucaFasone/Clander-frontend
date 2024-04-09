import { Button } from "../ui/button"
import style from "./style.module.css"

function Navbar() {
  return (
    <div className="w-full flex bg-[#46b59bbd] shadow items-center text-white">
      <div className={style.TextLogo}>
        Clander
      </div>
    </div>
  )
}

export default Navbar