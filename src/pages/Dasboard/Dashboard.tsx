import style from './style.module.css';
import { Navbar, Calendar } from '@/components';

function Dashboard() {

  return (
    <>
      <Navbar />
      <div className="container my-5">
        <div className={`${style.TextLogo} hidden sm:flex sm:text-6xl`}>
          Create Your
        </div>
        <div className={`${style.TextLogo} text-7xl tracking-wide mt-2`}>
          <div className={style.bounce_animation}>C</div>
          <div className={style.bounce_animation}>l</div>
          <div className={style.bounce_animation}>a</div>
          <div className={style.bounce_animation}>n</div>
          <div className={style.bounce_animation}>d</div>
          <div className={style.bounce_animation}>e</div>
          <div className={style.bounce_animation}>r</div>
        </div>
      </div>
      <div className="container">
        <Calendar/>

      </div>

    </>

  );
}

export default Dashboard;
