import './App.css'; 
function Logo() {
  return (
    <svg viewBox="0 0 100 100" width="100" height="100">
      <style>
        {`
          .logo {
            font-size: 20px;
            text-anchor: middle;
            font-family: 'Niconne', cursive;
            font-weight: 700;
            fill: #fcedd8;
            filter: drop-shadow(0.5px 0.5px #eb452b) drop-shadow(1px 1px #efa032) drop-shadow(1.5px 1.5px #46b59b) drop-shadow(2px 2px #017e7f);
          }
        `}
      </style>
      <text x="50%" y="50%" className="logo" alignmentBaseline="middle" textAnchor="middle">C</text>
    </svg>
  );
}

export default Logo;
