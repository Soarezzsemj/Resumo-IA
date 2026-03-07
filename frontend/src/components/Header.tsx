import "./Header.css";

function Header() {
  return (
    <header className="header">
      <div className="header-left">
        <span className="logo-icon"></span>
        <h1 className="logo">Resume AI</h1>
      </div>
      <span className="header-tag">Beta</span>
    </header>
  );
}

export default Header;
