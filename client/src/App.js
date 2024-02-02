import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


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

const Container = styled.div`
display: flex;`;

const Main = styled.div`
flex: 7;
background: ${({ theme }) => theme.bg};
`;

const Wrapper = styled.div`
  padding: 50px 96px 22px;
`;


function App() {
  const [darkMode, setDarkMode] = React.useState(true);

  return (
    <ThemeProvider theme={darkMode ? darkTheme : LightTheme}>
      <Container>
        <BrowserRouter>
          <Menu darkMode={darkMode} setDarkMode={setDarkMode} />
          <Main>
            <Navbar />
            <Wrapper>
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
