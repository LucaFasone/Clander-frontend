import style from './style.module.css';
import { Navbar, ClanderBox } from '@/components';

function Dashboard() {
  return (
    <>
      <Navbar />
      <div className="container my-5">
        <div className={`${style.TextLogo}  text-center font-default hidden mainColorsShadow sm:flex sm:text-6xl`}>
          Create Your
        </div>
        <div className={`${style.TextLogo} mainColorsShadow font-default text-7xl tracking-wide mt-2`}>
          <div className={style.bounce_animation}>C</div>
          <div className={style.bounce_animation}>l</div>
          <div className={style.bounce_animation}>a</div>
          <div className={style.bounce_animation}>n</div>
          <div className={style.bounce_animation}>d</div>
          <div className={style.bounce_animation}>e</div>
          <div className={style.bounce_animation}>r</div>
        </div>
      </div>
      <div className="flex justify-center self-center relative">
        <ClanderBox />
       {/* <button className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 blur-0 border-black border-2 px-4 py-2'>Login</button> */}
      </div>

    </>

  );
}

export default Dashboard;
