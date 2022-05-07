import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import IMAGES from "../../../assets/images/imageStore";
import "./newcomponent.scss";
import { TagFacesOutlined } from "@material-ui/icons";
import Picker from "emoji-picker-react";

const NewpostContent = () => {
  const [showEmoji, setshowEmoji] = useState(false);
  const [valueInput, setvalueInput] = useState("");

  console.log(showEmoji);

  const handleEmojiClick = (event, emojiObject) => {
    setvalueInput((a) => a + emojiObject.emoji);
    setshowEmoji(false);
  };

  return (
    <div className="newContent">
      <Row>
        <Col md={{ span: 2, offset: 1 }}>
          <img src={IMAGES.avatar} alt="" />
        </Col>
        <Col md={{ span: 8 }}>Ngô Gia Thái</Col>
      </Row>

      <Row>
        <Col md={12}>
          <textarea
            value={valueInput}
            onChange={(e) => setvalueInput(e.target.value)}
            rows="5"
            placeholder="Viêt chú thích ..."
          ></textarea>
        </Col>
      </Row>
      <Row>
        <Col md={12} id="emojiIcon">
          <TagFacesOutlined
            style={{ color: "black" }}
            onClick={() => setshowEmoji(!showEmoji)}
          />
        </Col>
        {showEmoji && (
          <Picker
            onEmojiClick={handleEmojiClick}
            pickerStyle={{
              width: "100%",
              outerHeight: "100%",
              innerHeight: "100px",
            }}
          ></Picker>
        )}
      </Row>
    </div>
  );
};

export default NewpostContent;
