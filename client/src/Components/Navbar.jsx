import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useDispatch } from "react-redux";
import { BackendUrl } from "../Utils/Contants";
import axios from "axios";
import { setToken } from "../Redux/action";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

function NavbarTop() {
  const navigate = useNavigate();
  const userName = "";

  const token = Cookies.get("token");
  const dispatch = useDispatch();
  dispatch(setToken(token));

  const handleLogout = () => {
    // clear the token from the cookie by setting expiry date to the past
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    try {
      let url = BackendUrl + "logout";
      console.log("Network calling to url", url);
      axios
        .get(url)
        .then((res) => {
          const { message } = res.data;
          console.log("message:", message);
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

    navigate("/login");
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
