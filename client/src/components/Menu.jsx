import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import styled from "styled-components";
import BargoTube from "../img/CatsTube3.svg";
import HomeIcon from "@mui/icons-material/Home";
import ExploreIcon from "@mui/icons-material/Explore";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import HistoryIcon from "@mui/icons-material/History";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import SportsBasketballIcon from "@mui/icons-material/SportsBasketball";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import MovieCreationIcon from "@mui/icons-material/MovieCreation";
import ArticleIcon from "@mui/icons-material/Article";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import SettingsIcon from "@mui/icons-material/Settings";
import FlagIcon from "@mui/icons-material/Flag";
import HelpIcon from "@mui/icons-material/Help";
import SettingsBrightnessIcon from "@mui/icons-material/SettingsBrightness";

const Container = styled.div`
  flex: 1;
  min-width: 260px;
  background-color: ${({ theme }) => theme.bgLighter};

  height: 100vh;
  color: ${({ theme }) => theme.text};
  position: sticky;
  top: 0;
  z-index: 3;

  box-shadow: 0 7px 18px 5px rgba(12, 12, 12, 0.5),
    0px 75px 0px 10px rgba(62, 166, 255, 0.5);
`;

const Wrapper = styled.div`
  padding: 1.8rem 2.6rem;
  padding-top: 1rem;
  position: relative;
`;
const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-weight: bold;
  margin-bottom: 25px;
  font-size: 0.875rem;
  z-index: 5;
  left: -24px;
  position: relative;
`;
const Title = styled.h2`
  font-size: 0.875rem;
  font-weight: 500;
  color: #aaaaaa;
  margin-bottom: 20px;
  text-transform: uppercase;
`;
const Img = styled.img`
  height: 48px;
  width: 68px;
  transform: translate(0px, -13px);
`;
const Cats = styled.span`
  font-size: 1.25rem;
  font-weight: 300;
  letter-spacing: 2px;
  font-style: italic;
  transform: scaleY(1.4) translate(-5px, -2px);
  font-family: "Permanent Marker", cursive;
  margin-right: 3px;
  margin-left: -10px;
  color: #ff4227;
  /* color: ${({ theme }) => theme.text}; */
`;
const Item = styled.div`
  display: flex;
  align-items: center;
  gap: 40px;
  padding: 8px 0px;
  cursor: pointer;
  transition: background 0.3s;
  position: relative;

  &:hover {
    /* background: ${({ theme }) => theme.soft}; */
    background: #3ea6ff4c;
  }
`;
const Hr = styled.hr`
  margin: 15px 0;
  border: 1px solid ${({ theme }) => theme.soft};
  border: 1px solid rgba(62, 166, 255, 0.3);
`;
const Login = styled.div`
  font-size: 0.775rem;
`;
const Button = styled.button`
  padding: 5px 15px;
  background: transparent;
  border: 1px solid #3ea6ff;
  color: #3ea6ff;
  border-radius: 3px;
  font-weight: 500;
  margin-top: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  position: relative;
`;

const Menu = ({ darkMode, setDarkMode }) => {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <Container>
      <Wrapper>
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          <Logo>
            <Img src={BargoTube} />
            <Cats>Pets</Cats>Tube
          </Logo>
        </Link>

        <Item>
          <Link
            to="/"
            style={{
              textDecoration: "none",
              color: "inherit",
              position: "absolute",
              inset: "0",
            }}
          />
          <HomeIcon />
          Home
        </Item>
        <Item>
          <Link to="trends" style={{ position: "absolute", inset: "0" }} />
          <ExploreIcon />
          Explore
        </Item>
        {currentUser && (
          <Item>
            <Link
              to="subscriptions"
              style={{ position: "absolute", inset: "0" }}
            />
            <SubscriptionsIcon />
            Subscriptions
          </Item>
        )}

        <Hr />
        <Item>
          <VideoLibraryIcon />
          Library
        </Item>
        <Item>
          <HistoryIcon />
          History
        </Item>
        <Hr />
        {!currentUser && (
          <>
            <Login>
              Sign to like videos, comment, and subscribe.
              <Button>
                <Link
                  to="signIn"
                  style={{ position: "absolute", inset: "0" }}
                />
                <AccountCircleIcon />
                SIGN IN
              </Button>
            </Login>
            <Hr />
          </>
        )}

        <Title>Best of CatsTube</Title>
        <Item>
          <Link to="music" style={{ position: "absolute", inset: "0" }} />
          <LibraryMusicIcon />
          Music
        </Item>
        <Item>
          <SportsBasketballIcon />
          Sports
        </Item>
        <Item>
          <SportsEsportsIcon />
          Games
        </Item>
        <Item>
          <MovieCreationIcon />
          Movies
        </Item>
        <Item>
          <ArticleIcon />
          News
        </Item>
        <Item>
          <LiveTvIcon />
          Life
        </Item>
        <Hr />
        <Item>
          <SettingsIcon />
          Settings
        </Item>
        <Item>
          <FlagIcon />
          Report
        </Item>
        <Item>
          <HelpIcon />
          Help
        </Item>
        <Item onClick={() => setDarkMode(!darkMode)}>
          <SettingsBrightnessIcon />
          {darkMode ? "Dark" : "Light"} Mode
        </Item>
      </Wrapper>
    </Container>
  );
};

export default Menu;
