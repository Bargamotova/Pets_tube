import axios from "axios";
import React from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import Card from "../components/Card";
const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const Search = () => {
  const [videos, setVideos] = React.useState([]);
  const query = useLocation().search;

  React.useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await axios.get(`/videos/search${query}`);
        console.log(res.data);
        setVideos(res.data);
      } catch (err) {}
    };
    fetchVideos();
  }, [query]);
  return (
    <Container>
      {videos.map((video) => (
        <Card type="mid" key={video._id} video={video} />
      ))}
    </Container>
  );
};

export default Search;
