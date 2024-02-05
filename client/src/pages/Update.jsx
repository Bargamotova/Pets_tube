import axios from "axios";
import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import CheckIcon from "@mui/icons-material/Check";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { updateChannel } from "../redux/userSlice";
import { device } from "../utils/media";
const Success = styled.div`
  color: #148f04;
  font-size: 24px;
  text-align: center;
`;
const Container = styled.div`
  color: ${({ theme }) => theme.text};
  padding-top: 30px;
`;
const Background = styled.div`
  width: 100%;
  min-height: 200px;
  border-radius: 10px;
  background: rgba(62, 166, 255, 0.5);
  margin-bottom: 70px;
  @media ${device.tablet} {
    display: none;
  }
`;
const Wrapper = styled.div`
  gap: 60px;
  padding: 20px;
  display: grid;
  grid-template-columns: 1fr 3fr;
  @media ${device.laptop} {
    grid-template-columns: 1fr;
    row-gap: 30px;
    column-gap: 0;
  }
`;
const BlockImg = styled.div`
  color: ${({ theme }) => theme.text};
  width: 250px;
  height: 250px;
  border-radius: 50%;
  overflow: hidden;
  background: rgba(200, 200, 200, 0.5);
  position: relative;
  box-shadow: 0 7px 18px 5px rgba(12, 12, 12, 0.5),
    0px 0px 0px 10px rgba(62, 166, 255, 0.5);
`;
const Avatar = styled.img`
  position: absolute;
  inset: 0;
  object-fit: cover;
  width: 100%;
`;
const Info = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  position: relative;
`;
const FormAvatar = styled.form``;
const UpdateAvatar = styled.button`
  position: absolute;
  width: 30px;
  height: 30px;
  left: -125px;
  top: 230px;
  border: none;
  border-radius: 50%;
  background: transparent;
  border: 1px solid;
  color: ${({ theme }) => theme.text};
  @media ${device.laptop} {
    left: 90%;
    top: 0;
  }
`;
const Details = styled.form`
  display: flex;
  gap: 30px;
  width: 100%;
  margin-bottom: 45px;
  flex-direction: column;
`;
const Input = styled.input`
  border: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  padding: 10px;
  background: transparent;
  border-radius: 3px;
  position: relative;
  max-width: 612px;
`;
const UpdateBtn = styled.button`
  font-weight: 500;
  color: white;
  border: none;
  background: #148f04;
  border-radius: 3px;
  height: max-content;
  width: 15ch;
  padding: 10px 20px;
  cursor: pointer;
  transition: all 0.3s;
  font-size: 1rem;
`;
const Hr = styled.hr`
  margin: 15px 0;
  width: 100%;
  border: 1px solid rgba(62, 166, 255, 0.3);
`;
const Text = styled.textarea`
  border: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  padding: 10px;
  background: transparent;
  border-radius: 3px;
  max-width: 612px;
  min-height: 200px;
`;

const Update = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [file, setFile] = React.useState(null);
  const [name, setName] = React.useState(currentUser.name);
  const [desc, setDesc] = React.useState(currentUser.desc);
  const [success, setSuccess] = React.useState(false);
  const [check, setCheck] = React.useState(false);
  const dispatch = useDispatch();
  const FP = process.env.REACT_APP_IMG_URL;

  const handleChangeAvatar = (e) => {
    e.preventDefault();
    setCheck(true);
  };
  console.log(name, name.trim());
  const handleUpdate = async (e) => {
    setSuccess(false);
    e.preventDefault();
    const updatedUser = {
      name: name.trim(),
      desc: desc,
    };
    if (file) {
      const formData = new FormData();
      const filename = Date.now() + "-" + file.name;
      formData.append("name", filename);
      formData.append("file", file);
      updatedUser.img = filename;
      console.log("FILE :", file);
      try {
        const dataI = await axios.post(
          process.env.REACT_APP_BASE_URL + "/api/v1/users/change-avatar",
          formData
        );
        console.log("About image data :", dataI.data.img);
        updatedUser.img = dataI.data.img;
      } catch (error) {
        console.log(error);
      }
    }
    try {
      const { data } = await axios.put(
        process.env.REACT_APP_BASE_URL + `/api/v1/users/${currentUser._id}`,
        updatedUser
      );
      setSuccess(true);
      dispatch(updateChannel(data));
      setCheck(false);
    } catch (error) {
      console.log(error);
      setSuccess(false);
    }
  };

  return (
    <Container>
      <Background />
      <Wrapper>
        <BlockImg>
          <Avatar
            src={file ? URL.createObjectURL(file) : FP + currentUser?.img}
          />
        </BlockImg>
        <Info>
          <FormAvatar>
            <label htmlFor='avatar'>
              <AddPhotoAlternateIcon />
            </label>

            <Input
              type='file'
              name='old_avatar'
              id='avatar'
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])}
            />
            <UpdateAvatar
              type='submit'
              onClick={handleChangeAvatar}
              style={
                check
                  ? { borderColor: "#148f04" }
                  : { borderColor: `${({ theme }) => theme.text}` }
              }
            >
              <CheckIcon
                style={
                  check
                    ? { fill: "#148f04" }
                    : { fill: `${({ theme }) => theme.text}` }
                }
              />
            </UpdateAvatar>
          </FormAvatar>
          <Details onSubmit={handleUpdate}>
            <Input
              type='text'
              value={name}
              placeholder={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Text
              type='text'
              placeholder={desc}
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />

            <UpdateBtn type='submit'>Update</UpdateBtn>
          </Details>
        </Info>
      </Wrapper>
      {success && (
        <Success className='settings__success'>
          Your profile has been updated...
        </Success>
      )}
      <Hr />
    </Container>
  );
};

export default Update;
