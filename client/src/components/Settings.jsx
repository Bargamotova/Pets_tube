import React from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../redux/userSlice";
import { persistor } from "../redux/store.js";
import PetsOutlinedIcon from "@mui/icons-material/PetsOutlined";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import BargoTubeSet from "../img/CatTubeSet.svg";
import Upload from "./Upload.jsx";

const Container = styled.div`
  color: ${({ theme }) => theme.text};
  background-color: ${({ theme }) => theme.bgLighter};
  min-width: 260px;
  padding-inline: 20px;
  display: flex;
  flex-direction: column;

  padding-top: 30px;
  position: absolute;
  border-radius: 5px;
  top: 75px;
  right: 40px;
  box-shadow: 0 7px 18px 5px rgba(12, 12, 12, 0.5),
    0px 0px 0px 10px rgba(62, 166, 255, 0.5);
  transition: transform 0.3s;
  z-index: 1;
`;
const List = styled.ul`
  list-style: none;
  margin-bottom: 50px;
`;
const Item = styled.li`
  margin-bottom: 30px;
  display: flex;
  gap: 10px;
  align-items: center;
  cursor: pointer;
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
  align-self: flex-start;
  margin-bottom: 40px;
`;
const User = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  font-weight: 500;
  text-transform: capitalize;
  color: ${(theme) => theme.text};
  margin-bottom: 30px;
`;
const Avatar = styled.img`
  width: 55px;
  height: 55px;
  object-fit: cover;
  border-radius: 50%;
  background: #999;
  cursor: pointer;
  border: 1px solid #3ea6ff;
`;
const Close = styled.button`
  color: #3ea6ff;
  border: none;
  background: transparent;
  cursor: pointer;
  padding: 10px;
  position: absolute;
  right: 10px;
  top: 10px;
`;
const Img = styled.img`
  height: 103px;
  position: absolute;
  right: -4px;
  bottom: -17px;
  filter: drop-shadow(15px 3px 5px rgba(0, 0, 0, 0.3));
`;
const Settings = ({ setOpenSet, openSet }) => {
  const [open, setOpen] = React.useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const FP = "http://localhost:8800/access/";
  const handleLogOut = (e) => {
    e.preventDefault();
    dispatch(logOut());
    persistor.purge();
    setOpenSet(false);
    navigate("/");
  };
  const handleLink = (e) => {
    e.preventDefault();
    setOpenSet(false);
    navigate(`/channel/${currentUser._id}`);
  };
  const handleLinkUpd = (e) => {
    e.preventDefault();
    setOpenSet(false);
    navigate(`/update/`);
  };

  return (
    <>
      {currentUser && (
        <>
          {open && <Upload setOpen={setOpen} />}
          <Container
            style={
              openSet
                ? { transform: "translateY(0%)" }
                : { transform: "translateY(-130%) " }
            }
          >
            <Close onClick={() => setOpenSet(false)}>X</Close>
            <User>
              {currentUser?.img ? (
                <Avatar src={FP + currentUser?.img} />
              ) : (
                <PetsOutlinedIcon />
              )}
              {currentUser.name}
            </User>
            <List>
              <Item>
                <RemoveRedEyeIcon style={{ fill: "#3ea6ff" }} />
                <Link
                  onClick={handleLink}
                  style={{ color: "inherit", textDecoration: "none" }}
                >
                  Look the channel
                </Link>
              </Item>
              <Item onClick={() => setOpen(true)}>
                <VideoCallIcon style={{ fill: "#3ea6ff" }} />
                Upload new video
              </Item>
              <Item>
                <Link
                  onClick={handleLinkUpd}
                  style={{
                    color: "inherit",
                    textDecoration: "none",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <AutoAwesomeIcon style={{ fill: "#3ea6ff" }} />
                  Update the personal data
                </Link>
              </Item>
            </List>
            <Button onClick={handleLogOut}>Log out</Button>
            <Img src={BargoTubeSet} />
          </Container>
        </>
      )}
    </>
  );
};

export default Settings;
