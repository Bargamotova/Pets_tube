import React from "react";
import styled from "styled-components";
import Comment from "./Comment";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { commentAdd, commentSuccess } from "../redux/commentSlice";
import { useLocation } from "react-router-dom";
import PetsOutlinedIcon from "@mui/icons-material/PetsOutlined";
const Container = styled.ul`
  color: ${({ theme }) => theme.text};
`;
const NewComment = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 20px;
`;
const Avatar = styled.div`
  width: 60px;
  height: 50px;
  border-radius: 50%;
  border: 2px solid #3ea6ff;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Input = styled.input`
  border: none;
  border-bottom: 0.5px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  background: transparent;
  width: 100%;
  padding: 5px;
  border-radius: 3px;
  outline: none;
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
const Title = styled.h2`
  font-size: 1rem;
  margin-bottom: 25px;
  color: ${({ theme }) => theme.textSoft};
  text-align: center;
`;
const Comments = () => {
  const { comments } = useSelector((state) => state.comment);
  const dispatch = useDispatch();
  const [newComments, setNewComments] = React.useState("");
  const { currentUser } = useSelector((state) => state.user);
  const path = useLocation().pathname.split("/")[2];

  React.useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get(
          process.env.REACT_APP_BASE_URL + `/api/v1/comments/${path}`
        );
        dispatch(commentSuccess(res.data));
      } catch (err) {}
    };
    fetchComments();
  }, [path, dispatch]);

  const handleInput = (e) => {
    setNewComments(e.target.value);
  };
  const handleComment = async (e) => {
    e.preventDefault();
    if (currentUser) {
      const res = await axios.post(
        process.env.REACT_APP_BASE_URL + "/api/v1/comments",
        {
          videoId: path,
          desc: newComments,
          userId: currentUser._id,
        }
      );
      dispatch(commentAdd(res.data));
      setNewComments("");
    }
  };
  return (
    <Container>
      {comments.length > 0 && <Title>Comments</Title>}
      {currentUser && (
        <NewComment>
          <Avatar>
            <PetsOutlinedIcon style={{ fill: "#3ea6ff" }} />
          </Avatar>
          <Input
            value={newComments}
            onChange={handleInput}
            placeholder={
              currentUser
                ? "Add a comment..."
                : "The comments can leaves only authorized users !"
            }
          />

          <Button onClick={handleComment} disabled={currentUser ? false : true}>
            Submit
          </Button>
        </NewComment>
      )}

      {comments?.map((comment) => (
        <Comment
          key={comment._id}
          comment={comment}
          currentUser={currentUser}
        />
      ))}
    </Container>
  );
};

export default Comments;
