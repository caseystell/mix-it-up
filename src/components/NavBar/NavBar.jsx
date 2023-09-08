import { Link } from 'react-router-dom';
import './NavBar.css';
import * as userService from '../../utilities/users-service';

export default function NavBar({ user, setUser }) {
  function handleLogOut() {
    userService.logOut();
    setUser(null);
  }

  return (
    <>
      <nav>
        <Link to="/products"><h1>MixItUp!</h1></Link>
        <Link to="/products/new" className="btn">List!</Link>
        <Link to="/favorites"><span className="fa fa-heart-o"></span></Link>
        <Link to="/cart"><span className="fa fa-shopping-cart"></span></Link>
        <Link to="/orders"><span className="fa fas fa-user-circle"></span></Link>
        <span>Welcome, {user.name}!</span>
        <Link to="" onClick={handleLogOut} className="btn">Log Out</Link>
      </nav>
    </>
  );
}