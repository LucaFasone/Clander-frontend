import style from "./navbarStyle.module.css"

function Navbar() {
  return (
    <div className="w-full flex mainColorsShadow font-default bg-[#46b59bbd] shadow items-center text-white">
      <div className={style.TextLogo}>
       Clendar
      </div>
    </div>
  )
}

export default Navbar