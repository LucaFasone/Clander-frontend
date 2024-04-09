import style from './style.module.css';
import { Navbar } from '@/components';

function Dashboard() {

  return (
    <>
      <Navbar />
      <div className="container my-5">
        <div className={style.TextLogo}>
          Create Your
        </div>
        <div className={style.TextLogo}>
          <div className={style.bounce_animation}>C</div>
          <div className={style.bounce_animation}>l</div>
          <div className={style.bounce_animation}>a</div>
          <div className={style.bounce_animation}>n</div>
          <div className={style.bounce_animation}>d</div>
          <div className={style.bounce_animation}>e</div>
          <div className={style.bounce_animation}>r</div>
        </div>
      </div>

    </>
  );
}

export default Dashboard;

