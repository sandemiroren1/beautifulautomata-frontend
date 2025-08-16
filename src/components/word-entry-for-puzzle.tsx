import React, { useState, useRef, useEffect } from "react";
import 'katex/dist/katex.min.css';
import { BlockMath, InlineMath } from 'react-katex';

export interface WordData{
    text: string;
     accept: boolean;
}
const WordEntry = (props: {word : WordData; onDelete : (text: string) => void}) => {
  // We use hooks to declare "initial" states
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputVisible, setInputVisible] = useState(false);
  const [wordState, setWord] = useState(props.word);

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
      <div className = "flex">
      {inputVisible ? (
        <input
          ref={inputRef} // Set the Ref
          value={wordState.text} // Now input value uses local state
            className= {`flex-1 p-3 box-border m-5 text-left text-lg font-medium text-black border rounded-lg dark:text-white`}
          onChange={e => {
            setWord({text: e.target.value,accept : wordState.accept});
          }
        }
        />
      ) : (
        <div 
        className={`flex-1 flex p-3 m-5 text-left text-lg overflow-hidden font-medium text-black 
    border ${props.word.accept ? "border-green-500" : "border-red-500"} 
    rounded-lg dark:text-white`}
        onClick={() => setInputVisible(true)}>
          <div className="flex-10">
            <InlineMath math = {wordState.text}></InlineMath>
          </div>
          {<div className="flex-0.5 flex-right">
            <button onClick={() => props.onDelete(props.word.text)} className = " text-sm font-medium focus:outline-none rounded-lg focus:z-10 focus:ring-4" >Delete</button>
          </div>}
          </div>
      )}
      
      </div>
    </React.Fragment>
  );
};

export default WordEntry; // We got our component!