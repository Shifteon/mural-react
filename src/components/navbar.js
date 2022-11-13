import { Nav, NavLink, NavMenu } from './navbarElements';

function Navbar() {

  return (
    <Nav>
      <NavMenu>
        <NavLink to="/signUp">
          Login
        </NavLink>
      </NavMenu>
    </Nav>
  );
}

export default Navbar;