import style from './style.module.css'
import { Navbar } from '@/components'

function Dashboard() {
  return (
    <>
      <Navbar/>
      <div className="container m-auto my-10">
          <div className={style.TextLogo}>
            Create Your
          </div>
          <div className={style.TextLogo}>
              Clander

            </div>
        </div>
    </>
  )
}

export default Dashboard