import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { BackendUrl } from "../Utils/Contants";
import axios from "axios";
import { setToken } from "../Redux/action";

function NavbarTop() {
  const { token } = useSelector((state) => state);
  console.log("token:", token);
  const userName = "";

  const dispatch = useDispatch();

  const handleLogout = () => {
    try {
      let url = BackendUrl + "logout";
      console.log("Network calling to url", url);
      axios
        .get(url)
        .then((res) => {
          const { message } = res.data;
          dispatch(setToken(null));
          alert(message);
        })
        .catch((error) => {
          let message = error.response.data.message;
          alert(message);
        });
    } catch (error) {
      console.log("Error in handleSubmit", error);
    }
  };

  return (
    <>
      <Navbar bg="dark" variant="dark" sticky="top">
        <Container>
          <Navbar.Brand href="#home">Tummaco</Navbar.Brand>
          <Nav className="me-auto">
            {token ? (
              <>
                <Nav.Link href="/home">Dashboard</Nav.Link>
              </>
            ) : null}
          </Nav>
          {token ? (
            <Nav>
              <Nav.Link href="#">{userName}</Nav.Link>
              <Nav.Link href="#" onClick={handleLogout}>
                Logout
              </Nav.Link>
            </Nav>
          ) : (
            <Nav>
              <Nav.Link href="/login">Login</Nav.Link>
              <Nav.Link href="/signup">Signup</Nav.Link>
            </Nav>
          )}
        </Container>
      </Navbar>
    </>
  );
}

export default NavbarTop;
