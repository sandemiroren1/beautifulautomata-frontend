import React, { useState, useRef, useEffect } from "react";
import 'katex/dist/katex.min.css';
import { BlockMath, InlineMath } from 'react-katex';

const WordEntry = (props: { text: string; accept: boolean}) => {
  // We use hooks to declare "initial" states
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputVisible, setInputVisible] = useState(false);
  const [text, setText] = useState(props.text);

  function onClickOutSide(e: MouseEvent) {
    // Check if user is clicking outside of <input>
    if (inputRef.current && !inputRef.current.contains(e.target as Node)) {
      setInputVisible(false); // Disable text input
    }
  }

  useEffect(() => {
    // Handle outside clicks on mounted state
    if (inputVisible) {
      document.addEventListener("mousedown", onClickOutSide);
    }

    // This is a necessary step to "dismount" unnecessary events when we destroy the component
    return () => {
      document.removeEventListener("mousedown", onClickOutSide);
    };
  });

  return (
    <React.Fragment>
      {inputVisible ? (
        <input
          ref={inputRef} // Set the Ref
          value={text} // Now input value uses local state
            className= {`p-3 box-border m-5 text-left text-lg font-medium text-black border rounded-lg dark:text-white`}
          onChange={e => {
            setText(e.target.value);
          }
        }
        />
      ) : (
        <div 
        className={`p-3 m-5 text-left text-lg overflow-hidden font-medium text-black 
    border ${props.accept ? "border-green-500" : "border-red-500"} 
    rounded-lg dark:text-white`}
        onClick={() => setInputVisible(true)}><InlineMath math = {text}></InlineMath></div>
      )}
    </React.Fragment>
  );
};

export default WordEntry; // We got our component!