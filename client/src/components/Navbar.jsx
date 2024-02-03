import { Link, useNavigate } from "react-router-dom";
import React from "react";
import styled from "styled-components";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SearchIcon from "@mui/icons-material/Search";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import PetsOutlinedIcon from "@mui/icons-material/PetsOutlined";
import { useSelector, useDispatch } from "react-redux";
import { logOut } from "../redux/userSlice";
import { persistor } from "../redux/store.js";
import Upload from "./Upload.jsx";
import SettingsIcon from "@mui/icons-material/Settings";
import Settings from "./Settings.jsx";

const Container = styled.div`
  background-color: ${({ theme }) => theme.bgLighter};

  color: ${({ theme }) => theme.text};
  height: 56px;
  position: sticky;
  top: 0;
  z-index: 2;
  box-shadow: 0 7px 18px 5px rgba(12, 12, 12, 0.5),
    0px 0px 0px 10px rgba(62, 166, 255, 0.5);
`;
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 100%;
  color: ${({ theme }) => theme.text};
  position: relative;
  z-index: 2;
  padding: 1.5rem 2.6rem;
  background-color: ${({ theme }) => theme.bgLighter};
`;
const Search = styled.div`
  margin-right: auto;
  margin-left: auto;
  width: 40%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 2px solid ${({ theme }) => theme.soft};
  background-color: transparent;
  border-radius: 30px;
  overflow: hidden;
  color: ${({ theme }) => theme.text};

  cursor: pointer;
`;
const Input = styled.input`
  width: 100%;
  padding: 10px 15px;
  border: none;
  color: ${({ theme }) => theme.text};
  background-color: transparent;
`;
const Button = styled.button`
  padding: 5px 15px;
  background: transparent;
  border: 1px solid #3ea6ff;
  color: #3ea6ff;
  border-radius: 3px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  position: relative;
`;
const User = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  font-weight: 500;
  text-transform: capitalize;
  color: ${(theme) => theme.text};
`;
const Avatar = styled.img`
  width: 35px;
  height: 35px;
  object-fit: cover;
  border-radius: 50%;
  background: #999;
  cursor: pointer;
`;

const Navbar = () => {
  const [open, setOpen] = React.useState(false);
  const [openSet, setOpenSet] = React.useState(false);
  const FP = process.env.REACT_APP_IMG_URL;
  
  const [q, setQ] = React.useState("");
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const handleLogOut = (e) => {
    e.preventDefault();
    dispatch(logOut());
    persistor.purge();
    navigate("/");
  };
  const handleSearch = () => {
    navigate(`/search?q=${q.toLowerCase()}`);
    setQ("");
  };
  return (
    <>
      {open && <Upload setOpen={setOpen} />}
      <Container>
        <Wrapper>
          <Search>
            <Input
              placeholder="Search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
            <SearchIcon onClick={handleSearch} />
          </Search>
          {currentUser ? (
            <User>
              <Button onClick={handleLogOut}>Log out</Button>
              <VideoCallIcon onClick={() => setOpen(true)} />
              {currentUser?.img ? (
                <Avatar src={FP + currentUser?.img} />
              ) : (
                <PetsOutlinedIcon />
              )}
              {currentUser.name}
              <Button
                style={{ border: "none" }}
                onClick={() => setOpenSet(!openSet)}
              >
                <SettingsIcon />
              </Button>
            </User>
          ) : (
            <Button>
              <Link to="signIn" style={{ position: "absolute", inset: "0" }} />
              <AccountCircleIcon />
              SIGN IN
            </Button>
          )}
        </Wrapper>
        <Settings setOpenSet={setOpenSet} openSet={openSet} />
      </Container>
    </>
  );
};

export default Navbar;
