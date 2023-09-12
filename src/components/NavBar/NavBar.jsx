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
        <Link to="/products/new" className="btn tiny">List!</Link>
        <Link to="/orders/cart"><span className="fa fa-shopping-cart tiny"></span></Link>
        <Link to="/orders"><span className="fa fas fa-user-circle tiny"></span></Link>
        <span className="welcome tiny">Welcome, {user.name}!</span>
        <Link to="" onClick={handleLogOut} className="btn tiny">Log Out</Link>
      </nav>
    </>
  );
}