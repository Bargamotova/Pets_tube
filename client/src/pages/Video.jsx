import React from "react";
import axios from "axios";
import TimeAgo from "react-timeago";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";

import styled from "styled-components";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbDownOutlinedIcon from "@mui/icons-material/ThumbDownOutlined";
import ReplyIcon from "@mui/icons-material/Reply";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import Comments from "../components/Comments";
import { fetchSuccess, like, dislike, view } from "../redux/videoSlice";
import { subscription } from "../redux/userSlice";
import Recommendation from "../components/Recommendation";
import { device } from "../utils/media";

const Container = styled.div`
  display: flex;
  color: ${({ theme }) => theme.text};
  gap: 20px;
  @media ${device.laptopS} {
    flex-direction: column;
  }
`;
const Content = styled.div`
  flex: 5;
  color: ${({ theme }) => theme.text};
`;
const VideoWrapper = styled.div`
  margin-bottom: 30px;
  position: relative;
  width: 100%;
  height: 0;
  /* трюк с высотой */
  padding-bottom: 56.25%;
  background: #000;
`;
const VideoMedia = styled.video`
  aspect-ratio: 0/1;
  width: 100%;
  /* object-fit: cover; */

  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: none;
`;
const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 500;
  margin-bottom: 20px;
  @media ${device.tabletS} {
    font-size: 1.2rem;
  }
`;
const Details = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  @media ${device.tabletS} {
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
  }
`;
const Info = styled.span`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.textSoft};
`;
const Buttons = styled.div`
  display: flex;
  align-items: center;
  gap: 25px;
`;
const Button = styled.button`
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.text};
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
`;
const Hr = styled.hr`
  margin: 15px 0;
  border: 0.5px solid ${({ theme }) => theme.soft};
`;
const Channel = styled.div`
  display: flex;
  justify-content: space-between;
`;
const ChannelInfo = styled.div`
  display: flex;
  gap: 20px;
  width: 100%;
  align-items: center;
`;
const ChannelImg = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #999;
  cursor: pointer;
  object-fit: cover;
`;
const ChannelDetails = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: auto;
`;

const ChannelName = styled.span`
  font-size: 12px;
  font-weight: 600;
  margin-bottom: 5px;
  color: ${({ theme }) => theme.text};
  cursor: pointer;
`;
const ChannelCounter = styled.span`
  color: ${({ theme }) => theme.textSoft};
  font-size: 12px;
  margin-bottom: 20px;
`;
const Description = styled.p`
  font-size: 14px;
  @media ${device.tabletS} {
    display: none;
  }
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
`;

const Video = () => {
  const { currentUser } = useSelector((state) => state.user);
  const { currentVideo } = useSelector((state) => state.video);
  const [channel, setChannel] = React.useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const pathUrl = useLocation().pathname.split("/")[2];

  const FP = process.env.REACT_APP_IMG_URL;

  const fetchVideoData = async () => {
    try {
      const videoRes = await axios.get(
        process.env.REACT_APP_BASE_URL + `/api/v1/videos/find/${pathUrl}`
      );
      dispatch(fetchSuccess(videoRes.data));
    } catch (error) {
      console.log(error);
      navigate("*");
    }
  };
  React.useEffect(() => {
    fetchVideoData();
  }, [pathUrl, dispatch]);

  const fetchInfoVideo = async () => {
    try {
      const channelRes = await axios.get(
        process.env.REACT_APP_BASE_URL +
          `/api/v1/users/find/${currentVideo.userId}`
      );
      setChannel(channelRes.data);
    } catch (error) {
      console.log(error);
    }
    if (currentUser) {
      if (currentVideo?.userId !== currentUser?._id) {
        const res = await axios.put(
          process.env.REACT_APP_BASE_URL + `/api/v1/videos/view/${pathUrl}`
        );
        dispatch(view(res.data.view));
      }
    }
  };

  React.useEffect(() => {
    fetchInfoVideo();
    console.log("CURRENT Video : ", currentVideo);
    console.log("CURRENT User : ", currentUser);
  }, [channel._id]);

  const handleLike = async () => {
    currentUser &&
      (await axios.put(
        process.env.REACT_APP_BASE_URL +
          `/api/v1/users/like/${currentVideo._id}`
      ));
    currentUser && dispatch(like(currentUser._id));
  };
  const handleDislike = async () => {
    currentUser &&
      (await axios.put(
        process.env.REACT_APP_BASE_URL +
          `/api/v1/users/dislike/${currentVideo._id}`
      ));
    currentUser && dispatch(dislike(currentUser._id));
  };
  const handleSubscribe = async (e) => {
    e.preventDefault();
    currentUser.subscribedUsers?.includes(channel._id)
      ? await axios.put(
          process.env.REACT_APP_BASE_URL + `/api/v1/users/unsub/${channel._id}`
        )
      : await axios.put(
          process.env.REACT_APP_BASE_URL + `/api/v1/users/sub/${channel._id}`
        );
    dispatch(subscription(channel._id));
  };

  return (
    <Container>
      <Content>
        <VideoWrapper>
          <VideoMedia src={currentVideo?.videoUrl} controls />
        </VideoWrapper>
        <Title>{currentVideo?.title}</Title>
        <Details>
          <Info>
            {currentVideo?.views} views ·
            <TimeAgo date={currentVideo?.createdAt} />
          </Info>
          <Buttons>
            <Button onClick={handleLike}>
              {currentVideo?.likes?.includes(currentUser?._id) ? (
                <ThumbUpIcon />
              ) : (
                <ThumbUpAltOutlinedIcon />
              )}
              {currentVideo?.likes?.length}
            </Button>
            <Button onClick={handleDislike}>
              {currentVideo?.dislikes?.includes(currentUser?._id) ? (
                <ThumbDownIcon />
              ) : (
                <ThumbDownOutlinedIcon />
              )}
              Dislike
            </Button>
            <Button>
              <ReplyIcon />
              Share
            </Button>
            <Button>
              <SaveAltIcon />
              Save
            </Button>
          </Buttons>
        </Details>
        <Hr />
        <Channel>
          <ChannelInfo>
            <Link to={`/channel/${currentVideo?.userId}`}>
              <ChannelImg src={FP + channel.img} />
            </Link>

            <ChannelDetails>
              <ChannelName>{channel?.name}</ChannelName>
              <ChannelCounter>
                {channel?.subscribers} subscribers
              </ChannelCounter>
              <Description>{channel?.desc}</Description>
            </ChannelDetails>

            {currentUser?._id !== currentVideo?.userId ? (
              <Subscribe
                onClick={handleSubscribe}
                disabled={currentUser ? false : true}
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
            ) : (
              ""
            )}
          </ChannelInfo>
        </Channel>
        <Hr />

        <Comments />
      </Content>
      <Recommendation tags={currentVideo?.tags} />
    </Container>
  );
};

export default Video;
