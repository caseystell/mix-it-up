import { Link } from 'react-router-dom';
import * as userService from '../../utilities/users-service';
import CategoryList from '../CategoryList/CategoryList';

export default function NavBar({ user, setUser, categoriesRef, activeCat, setActiveCat }) {
  function handleLogOut() {
    userService.logOut();
    setUser(null);
  }

  return (
    <nav>
      <Link to="/orders">Order History</Link>
      &nbsp; | &nbsp;
      <Link to="/favorites"><span className="fa fa-heart-o"></span></Link>
      &nbsp;&nbsp;
      <Link to="/cart"><span className="fa fa-shopping-cart"></span></Link>
      &nbsp;&nbsp;
      <Link to="/products/new" className="btn">List!</Link>
      &nbsp;&nbsp;
      <span>Welcome, {user.name}!</span>
      &nbsp;&nbsp;<Link to="" onClick={handleLogOut} className="btn">Log Out</Link>
      <br/>
      <CategoryList
          categories={categoriesRef.current}
          activeCat={activeCat}
          setActiveCat={setActiveCat}
      />
    </nav>
  );
}