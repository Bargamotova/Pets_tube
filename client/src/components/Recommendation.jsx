import React from "react";
import styled from "styled-components";
import Card from "./Card";
import axios from "axios";
const Container = styled.div`
  flex: 2;
`;
const Recommendation = ({ tags }) => {
  const [videos, setVideos] = React.useState([]);
  const baseUrl = "https://pets-tube-back.vercel.app";
  React.useEffect(() => {
    const fetchVideos = async () => {
      const { data } = await axios.get(
        baseUrl + `/api/v1/videos/tags?tags=${tags}`
      );
      setVideos(data);
    };
    fetchVideos();
  }, [tags]);
  return (
    <Container>
      {videos.map((video) => (
        <Card type='sm' video={video} key={video._id} />
      ))}
    </Container>
  );
};

export default Recommendation;
