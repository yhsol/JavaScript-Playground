import React from "react";
import styled from "styled-components";
import Header from "./components/Header";
import ImageCard from "./components/ImageCard";
import Modal from "./components/Modal";
import Select from "./components/Select/Select";
import useModal from "./hooks/useModal";

// const options = [
//   { name: "q", value: "q" },
//   { name: "w", value: "w" },
//   { name: "e", value: "e" },
//   { name: "r", value: "r" },
// ];

const ListLayout = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 0 50px;
  margin: 0 auto;
`;

function App() {
  // globalState 를 읽어와서 사용할 수 있으면 좋을 듯
  const { isOpen, toggle } = useModal();
  return (
    <>
      <Header />
      <button onClick={toggle}>open</button>
      <Modal isOpen={isOpen} onClose={toggle} width="300px" height="200px">
        content
      </Modal>
      {/* <Container>Hello World</Container> */}
      {/* <Select
        options={options}
        onChange={(e) => alert(e.target.value)}
        width="300px"
      /> */}
      <ListLayout>
        {Array(10)
          .fill(undefined)
          .map((item) => (
            <ImageCard
              src="https://www.w3schools.com/howto/img_avatar.png"
              alt=""
              width="300px"
              height=""
            >
              <h4>
                <b>Name</b>
              </h4>
              <p>Content</p>
            </ImageCard>
          ))}
      </ListLayout>
    </>
  );
}

export default App;
