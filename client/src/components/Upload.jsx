import React from "react";
import styled from "styled-components";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../firebase";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Container = styled.div`
  width: 100%;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  background-color: #000000b3;
  z-index: 4;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Wrapper = styled.div`
  max-width: 600px;
  width: 100%;
  background-color: ${({ theme }) => theme.bgLighter};
  color: ${({ theme }) => theme.text};
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  border-radius: 3px;
  box-shadow: 0 7px 18px 5px rgba(12, 12, 12, 0.5),
    0 0px 0px 15px rgba(136, 136, 136, 0.5);

  position: relative;
`;
const Title = styled.h2`
  color: ${({ theme }) => theme.text};
  text-align: center;
`;
const Close = styled.button`
  color: ${({ theme }) => theme.text};
  align-self: flex-end;
  border: none;
  background: transparent;
  cursor: pointer;
  padding: 10px;
  position: absolute;
  right: 10px;
  top: 10px;
`;
const Input = styled.input`
  border: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  padding: 10px;
  background: transparent;
  border-radius: 3px;
  position: relative;
`;
const InputFile = styled.input`
  border: 1px solid ${({ theme }) => theme.soft};
  color: #b0b0b0;
  padding: 10px;
  background: transparent;
  border-radius: 3px;
  position: relative;
`;

const Desc = styled.textarea`
  border: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  padding: 10px;
  background: transparent;
  border-radius: 3px;
  width: 100%;
  max-width: 560px;
  min-height: 200px;
  flex-grow: 1;
`;
const Button = styled.button`
  padding: 10px;
  background: ${({ theme }) => theme.soft};
  border: 1px solid ${({ theme }) => theme.soft};
  color: #3ea6ff;
  border-radius: 3px;
  font-weight: 500;
  margin-top: 10px;
  cursor: pointer;
`;
const Label = styled.label`
  font-size: 0.875rem;
`;
const Upload = ({ setOpen }) => {
  const [inputs, setInputs] = React.useState({});
  const [tags, setTags] = React.useState([]);
  const [video, setVideo] = React.useState(null);
  const [image, setImage] = React.useState(null);
  const [imgPer, setImgPer] = React.useState(0);
  const [videoPer, setVideoPer] = React.useState(0);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const handleTags = (e) => {
    setTags(e.target.value.split(","));
  };
  const uploadFile = (file, urlType) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        urlType === "imgUrl"
          ? setImgPer(Math.round(progress))
          : setVideoPer(Math.round(progress));
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
            break;
        }
      },
      (error) => {
        // Handle unsuccessful uploads
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setInputs((prev) => {
            return { ...prev, [urlType]: downloadURL };
          });
        });
      }
    );
  };

  React.useEffect(() => {
    video && uploadFile(video, "videoUrl");
  }, [video]);

  React.useEffect(() => {
    image && uploadFile(image, "imgUrl");
  }, [image]);

  const handleUpload = async (e) => {
    e.preventDefault();
    const res = await axios.post("/videos", { ...inputs, tags });
    setOpen(false);
    res.status === 200 && navigate(`/video/${res.data._id}`);
  };
  return (
    <Container>
      <Wrapper>
        <Close onClick={() => setOpen(false)}>X</Close>
        <Title>Upload a New Video</Title>
        <Label>Video: </Label>
        {videoPer > 0 ? (
          <>
            <span>{videoPer}%</span>
            <span
              style={{
                background: "#3ea6ff",
                height: "5px",
                width: `${imgPer}%`,
                transition: "width 0.3s",
              }}
            ></span>
          </>
        ) : (
          <InputFile
            type="file"
            placeholder=""
            accept="video/*"
            onChange={(e) => setVideo(e.target.files[0])}
          />
        )}

        <Input
          type="text"
          name="title"
          placeholder="Title"
          onChange={handleChange}
        />
        <Desc
          type="text"
          name="desc"
          placeholder="Description"
          onChange={handleChange}
        />
        <Input
          type="text"
          placeholder="Separate the tags with commas"
          onChange={handleTags}
        />
        <Label>Poster: </Label>
        {imgPer > 0 ? (
          <>
            <span>{imgPer}%</span>
            <span
              style={{
                background: "#3ea6ff",
                height: "5px",
                width: `${imgPer}%`,
              }}
            ></span>
          </>
        ) : (
          <InputFile
            type="file"
            placeholder="Image"
            accept="image/*"
            id="input-img"
            onChange={(e) => setImage(e.target.files[0])}
          />
        )}
        <Button onClick={handleUpload}>Upload</Button>
      </Wrapper>
    </Container>
  );
};

export default Upload;
