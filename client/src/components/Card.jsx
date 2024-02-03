import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import TimeAgo from "react-timeago";
import axios from "axios";

const Container = styled.div`
  cursor: pointer;
  font-family: "Roboto", sans-serif;
  position: relative;
  width: 360px;
  margin-bottom: ${(props) => (props.type === "sm" ? "10px" : "45px")};
  display: ${(props) => props.type === "sm" && "flex"};
  background-color: ${({ theme }) => theme.bgLighter};
`;
const Img = styled.img`
  width: ${(props) => (props.type === "sm" ? "50%" : "100%")};
  height: ${(props) => (props.type === "sm" ? "100px" : "202px")};
  background-color: #ccc;

  object-fit: cover;
  border-radius: ${(props) => (props.type === "sm" ? "3px" : "none")};
  margin-bottom: ${(props) => (props.type === "sm" ? "0" : "10px")};
`;
const Details = styled.div`
  display: flex;
  gap: 25px;
  width: ${(props) => (props.type === "sm" ? "50%" : "100%")};
  padding: 10px;
`;
const ChannelImg = styled.img`
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 50%;
  background-color: #999;
  display: ${(props) => props.type === "sm" && "none"};
`;
const Texts = styled.div`
  width: 80%;
`;
const Title = styled.h1`
  font-weight: 500;
  color: ${({ theme }) => theme.text};
  margin-bottom: 10px;

  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
`;
const ChannelName = styled.h2`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.textSoft};
  margin-bottom: 10px;
`;
const Info = styled.div`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.textSoft};
`;

const Card = ({ type, video }) => {
  const [channels, setChannel] = React.useState({});
  const FP = "http://localhost:8800/access/";
  React.useEffect(() => {
    const fetchChannel = async () => {
      const res = await axios.get(
        process.env.REACT_APP_BASE_URL + `/api/v1/users/find/${video?.userId}`
      );
      setChannel(res.data);
    };
    fetchChannel();
  }, [video.userId]);

  return (
    <Container type={type}>
      <Link
        to={`/video/${video?._id}`}
        style={{ position: "absolute", inset: "0" }}
      />
      <Img type={type} src={video?.imgUrl} />
      <Details type={type}>
        <ChannelImg type={type} src={FP + channels?.img} />
        <Texts>
          <Title
            style={
              type === "sm" ? { fontSize: "0.875rem" } : { fontSize: "1rem" }
            }
          >
            {video.title}
          </Title>
          <ChannelName>{channels.name}</ChannelName>
          <Info>
            {video.views} views ·
            <TimeAgo date={video.createdAt} />
          </Info>
        </Texts>
      </Details>
    </Container>
  );
};

export default Card;
