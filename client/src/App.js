import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import MenuIcon from "@mui/icons-material/Menu";
import styled, { ThemeProvider } from 'styled-components';
import Menu from './components/Menu';
import Navbar from './components/Navbar';
import { LightTheme, darkTheme } from './utils/Theme';
import Video from './pages/Video';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import Search from './pages/Search';
import Channel from './pages/Channel';
import Update from './pages/Update';
import NotFound from './pages/NotFound';
import { device } from './utils/media';
import useScreenWidth from './hooks/useScreenSize';

const Container = styled.div`
display: flex;

`;

const Main = styled.div`
flex: 7;
background: ${({ theme }) => theme.bg};
`;

const Wrapper = styled.div`
  padding: 50px 50px 22px;
  height: 100vh;
  overflow-y: auto;
  @media ${device.laptop} {
   padding: 50px 10px 20px;
  }
`;
const ButtonBurger = styled.button`
  padding: 5px 15px;
  background: transparent;
  border: transparent;
  color: #3ea6ff;
  border-top-right-radius: 3px;
  border-bottom-right-radius: 3px;
  font-weight: 500;
  margin-top: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  position: fixed;
  z-index: 5;
  transition: left 0.3s;
  display:none;

  @media ${device.tablet} {
   display:block;
  }
`;
const Overlay = styled.div`
position: absolute;
inset: 0;
background: rgba(62, 166, 255, 0.5);
z-index:5;
display: none;
@media ${device.tablet} {
   display: block;
  }
`;

function App() {
  const [darkMode, setDarkMode] = React.useState(true);
  const [open, setOpen] = React.useState(false);
  const screenSize = useScreenWidth();

  const handleOpenMenu = (e) => {
    if (screenSize.width > 820) return;
    e.preventDefault();
    setOpen((dev) => !dev);
  };

  return (
    <ThemeProvider theme={darkMode ? darkTheme : LightTheme}>
      <Container>
        <BrowserRouter>
          <Menu darkMode={darkMode} setDarkMode={setDarkMode} open={open} setOpen={setOpen} />
          <Main>
            <ButtonBurger
              onClick={handleOpenMenu}
            >
              <MenuIcon />
            </ButtonBurger>
            {open && <Overlay />}
            <Navbar screenSize={screenSize} />
            <Wrapper >
              <Routes>
                <Route path='/'>
                  <Route index element={<Home type="random" />} />
                  <Route path='trends' element={<Home type="trend" />} />
                  <Route path='subscriptions' element={<Home type="subscriptions" />} />
                  <Route path='music' element={<Home choice="music" />} />
                  <Route path='channel/:id' element={<Channel />} />
                  <Route path='update' element={<Update />} />
                  <Route path='search' element={<Search />} />
                  <Route path='signIn' element={<SignIn />} />
                  <Route path='video'>
                    <Route path=':id' element={<Video />} />
                  </Route>
                  <Route path='*' element={<NotFound />} />
                </Route>
              </Routes>
            </Wrapper>
          </Main>
        </BrowserRouter>
      </Container>
    </ThemeProvider>
  );
}

export default App;
