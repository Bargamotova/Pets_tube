import axios from "axios";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import YouTubeIcon from "@mui/icons-material/YouTube";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import { useDispatch, useSelector } from "react-redux";
import { subscription } from "../redux/userSlice";
import Card from "../components/Card";

const Container = styled.div`
  color: ${({ theme }) => theme.text};
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 30px;
`;
const BlockImg = styled.div`
  width: 250px;
  height: 250px;
  border-radius: 50%;
  background: #000;
  overflow: hidden;
  position: relative;
  box-shadow: 0 7px 18px 5px rgba(12, 12, 12, 0.5),
    0px 0px 0px 10px rgba(62, 166, 255, 0.5);

  /* display: flex;
  align-items: center;
  justify-content: center; */
`;
const Avatar = styled.img`
  position: absolute;
  inset: 0;
  object-fit: cover;
  width: 100%;
`;
const Details = styled.div`
  display: flex;
  align-items: end;
  gap: 60px;
  width: 100%;
  padding: 10px;
  margin-bottom: 45px;
  display: grid;
  grid-template-columns: 1fr 2.5fr 1fr;
`;
const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  /* width: 60%; */
`;
const Background = styled.div`
  width: 100%;
  min-height: 200px;
  border-radius: 10px;
  background: rgba(62, 166, 255, 0.5);
  margin-bottom: 45px;
`;
const Desc = styled.h3`
  color: ${({ theme }) => theme.text};
  font-size: 24px;
  font-weight: 300;
  letter-spacing: 1.5px;

  margin-bottom: 20px;
  flex: 1;
`;
const Title = styled.h1`
  color: ${({ theme }) => theme.text};
  font-size: 40px;
  font-weight: 300;
  letter-spacing: 1.5px;
  text-transform: capitalize;
`;
const Buttons = styled.div`
  display: flex;
  gap: 20px;
  justify-content: space-between;
  width: fit-content;
`;
const Subscribers = styled.div`
  color: ${({ theme }) => theme.text};
  background: #148f04;
  padding: 10px 20px;
  border-radius: 3px;
  align-self: flex-start;
`;
const Hr = styled.hr`
  margin: 15px 0;
  width: 100%;
  border: 1px solid rgba(62, 166, 255, 0.3);
`;
const Subscribe = styled.button`
  font-weight: 500;
  color: white;
  border: none;
  border-radius: 3px;
  height: max-content;
  width: 15ch;
  padding: 10px 20px;
  cursor: pointer;
  transition: all 0.3s;
  font-size: 1rem;
`;
const Inner = styled.div`
  padding-top: 40px;
  display: flex;
  gap: 40px;
  flex-wrap: wrap;
  width: 100%;
  justify-content: space-between;
`;

const SocialIcons = styled.div`
  display: flex;
  gap: 25px;
  align-items: center;
  align-self: flex-end;
  & svg {
    fill: rgba(62, 166, 255, 1);
    cursor: pointer;
  }
`;
const Channel = () => {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [channel, setChannel] = React.useState({});
  const [videos, setVideos] = React.useState([]);
  const navigate = useNavigate();
  const path = useLocation().pathname.split("/")[2];
  const FP = "http://localhost:8800/access/";

  React.useEffect(() => {
    const fetchChannel = async () => {
      try {
        const res = await axios.get(`/api/v1/users/find/${path}`);
        setChannel(res.data);
      } catch (error) {
        console.log(error);
        navigate("*");
      }
    };
    fetchChannel();
  }, [path]);

  React.useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await axios.get(`/api/v1/videos/personal/${channel._id}`);
        setVideos(res.data);
      } catch (error) {
        console.log(error);
        navigate("*");
      }
    };
    fetchVideos();
  }, [channel._id]);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    currentUser.subscribedUsers?.includes(channel._id)
      ? await axios.put(`/api/v1/users/unsub/${channel._id}`)
      : await axios.put(`/api/v1/users/sub/${channel._id}`);
    dispatch(subscription(channel._id));
  };
  return (
    <Container>
      <Background />
      <Details>
        <BlockImg>
          {channel?.img ? <Avatar src={FP + channel?.img} /> : ""}
        </BlockImg>
        <Info>
          <Title>{channel.name}</Title>
          <Desc>{channel?.desc}</Desc>
          <Buttons>
            <Subscribers>Subscribers: {channel.subscribers}</Subscribers>
            {currentUser?._id !== channel._id && (
              <Subscribe
                disabled={currentUser ? false : true}
                onClick={handleSubscribe}
                style={
                  currentUser?.subscribedUsers?.includes(channel._id)
                    ? { background: "#148f04" }
                    : { background: "#cc1a00" }
                }
              >
                {currentUser?.subscribedUsers?.includes(channel._id)
                  ? "Subscribed"
                  : "Subscribe"}
              </Subscribe>
            )}
          </Buttons>
        </Info>
        <SocialIcons>
          <YouTubeIcon />
          <InstagramIcon />
          <TwitterIcon />
          <FacebookIcon />
        </SocialIcons>
      </Details>
      <Hr />
      <Inner>
        {videos?.map((video) => (
          <Card key={video._id} video={video} type="mid" />
        ))}
      </Inner>
    </Container>
  );
};

export default Channel;
