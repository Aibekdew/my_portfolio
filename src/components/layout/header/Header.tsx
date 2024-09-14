import scss from "./Header.module.scss";

const Header = () => {
  return (
    <header className={scss.Header}>
      <div className="container">
        <div className={scss.content}>Header</div>
      </div>
    </header>
  );
};

export default Header;
