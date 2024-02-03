import styled from "styled-components";
import React from "react";
import TimeAgo from "react-timeago";
import axios from "axios";
import { useDispatch } from "react-redux";
import { commentDelete } from "../redux/commentSlice";
import BargoTube from "../img/CatTube6.svg";

const Container = styled.li`
  color: ${({ theme }) => theme.text};
  display: flex;
  position: relative;
  gap: 20px;
  margin-bottom: 20px;
  border-radius: 3px;
  padding: 5px;

  background-color: ${({ theme }) => theme.bgLighter};
`;
const Avatar = styled.img`
  width: 50px;
  height: 50px;
  background: #fff;
  border-radius: 50%;
  object-fit: cover;
`;
const Details = styled.div`
  display: flex;
  flex-direction: column;
`;

const Name = styled.span`
  font-size: 0.875rem;
  font-weight: 500;
  margin-bottom: 5px;

  color: ${({ theme }) => theme.text};
`;
const Date = styled.span`
  color: ${({ theme }) => theme.textSoft};
  font-size: 12px;
  margin-left: 8px;
`;
const Text = styled.span`
  font-size: 0.875rem;
`;
const Button = styled.button`
  padding: 5px;
  background: transparent;
  border: none;
  color: #3ea6ff;
  border-radius: 3px;
  font-weight: 500;
  margin-top: 10px;
  cursor: pointer;
  margin-left: auto;
`;
const MessagePop = styled.div`
  background: #3ea6ff;

  padding: 20px 10px;
  padding-left: 109px;
  border-top-right-radius: 3px;
  border-bottom-right-radius: 3px;

  position: absolute;
  right: 0;
  top: 1px;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  justify-content: space-between;

  &:before {
    content: "";
    position: absolute;
    left: -2px;
    bottom: 0;
    width: 0;
    height: 0;

    border-left: 43px solid ${({ theme }) => theme.bgLighter};
    border-top: 30px solid transparent;
    border-bottom: 30px solid transparent;
  }
`;
const MessageText = styled.span`
  color: #fff;
  font-size: 0.875rem;
`;
const Img = styled.img`
  height: 92px;
  filter: drop-shadow(-15px 3px 5px rgba(0, 0, 0, 0.3));
  position: absolute;
  left: 25px;
  bottom: -25px;
`;
const Comment = ({ comment, currentUser }) => {
  const [channel, setChannel] = React.useState({});
  const [message, setMessage] = React.useState(false);
  const dispatch = useDispatch();
  const FP = process.env.REACT_APP_IMG_URL;

  React.useEffect(() => {
    const fetchComment = async () => {
      try {
        const res = await axios.get(
          process.env.REACT_APP_BASE_URL +
            `/api/v1/users/find/${comment.userId}`
        );
        setChannel(res.data);
      } catch (err) {}
    };
    fetchComment();
  }, [comment.userId]);

  const handleDelete = async () => {
    if (currentUser) {
      if (currentUser._id === comment.userId) {
        await axios.delete(
          process.env.REACT_APP_BASE_URL + `/api/v1/comments/${comment._id}`
        );
        dispatch(commentDelete(comment._id));
      } else {
        setMessage(true);
        setTimeout(() => setMessage(false), 2000);
      }
    }
  };

  return (
    <Container>
      <Avatar src={FP + channel?.img} />
      <Details>
        <Name>
          {channel.name}
          <Date>
            <TimeAgo date={comment.createdAt} />
          </Date>
        </Name>

        <Text>{comment?.desc}</Text>
      </Details>

      {currentUser && <Button onClick={handleDelete}>X</Button>}
      {message && (
        <MessagePop className='flag'>
          <Img src={BargoTube} />
          <MessageText>You can delete only your message</MessageText>
        </MessagePop>
      )}
    </Container>
  );
};

export default Comment;
