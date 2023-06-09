import React, { useEffect, useRef, useState } from "react";
import "./typer.css";

const TYPING_SPEED = 15000;
const DELETING_SPEED = 3000;

interface TyperProps {
  heading: string;
  dataText: Array<string>;
}

// Reference: https://codepen.io/AliKlein/pen/aPyKjy
export const Typer = (props: TyperProps) => {
  const { dataText, heading } = props;

  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(TYPING_SPEED);

  const textRef = useRef(text);
  textRef.current = text;
  const isDeletingRef = useRef(isDeleting);
  isDeletingRef.current = isDeleting;
  const loopNumRef = useRef(loopNum);
  loopNumRef.current = loopNum;
  const typingSpeedRef = useRef(typingSpeed);

  const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

  console.log("rendered");

  useEffect(() => {
    const timerId = handleType();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, isDeleting]);

  const handleType = async () => {
    // console.log("handleType", text);
    const i = loopNum % dataText.length;
    const fullText = dataText[i];

    if (isDeletingRef.current) {
      setText((prevText) => prevText.substring(0, prevText.length - 1));
      await delay(DELETING_SPEED);
    } else {
      setText((prevText) => fullText.substring(0, prevText.length + 1));
      await delay(TYPING_SPEED);
    }

    if (!isDeletingRef.current && text === fullText) {
      setIsDeleting(true);
      await delay(500); // pause before start deleting
    } else if (isDeletingRef.current && text === "") {
      setIsDeleting(false);
      setLoopNum(loopNum + 1); // move to next word
    }
  };

  return (
    <div>
      {heading}&nbsp;
      <span>{text}</span>
      <span id="typer-cursor"></span>
    </div>
  );
};
