import React from "react";
import styled from "styled-components";
import Card from "../components/Card";
import axios from "axios";

const Container = styled.div`
  color: ${({ theme }) => theme.text};
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-evenly;
  gap: 30px;
`;

const Home = ({ type, choice }) => {
  const [videos, setVideos] = React.useState([]);

  React.useEffect(() => {
    const fetchVideos = async () => {
      const { data } = type
        ? await axios.get(
            process.env.REACT_APP_BASE_URL + `/api/v1/videos/${type}`
          )
        : await axios.get(
            process.env.REACT_APP_BASE_URL +
              `/api/v1/videos/tags?tags=${choice}`
          );
      setVideos(data);
    };
    fetchVideos();
  }, [type, choice]);

  return (
    <Container>
      {videos?.map((video) => (
        <Card type='mid' key={video._id} video={video} />
      ))}
    </Container>
  );
};

export default Home;
