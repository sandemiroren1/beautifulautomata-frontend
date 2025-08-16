import React, { useState, useRef, useEffect } from "react";
import 'katex/dist/katex.min.css';
import { BlockMath, InlineMath } from 'react-katex';

const EditablePuzzleInput = (props: { text: string; widgetName : string ; editable : boolean}) => {
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
    <div>
    <h2 className="w-full py-2 px-5 mb-1 text-center  text-m font-medium text-black dark:text-white">
    {props.widgetName}
    </h2>
    <React.Fragment>
      {inputVisible&&props.editable ? (
        <input
          ref={inputRef} // Set the Ref
          value={text} // Now input value uses local state
          className="w-full py-2.5 px-5 mb-2 text-center overflow-x-auto text-lg font-medium text-black dark:text-white"
          onChange={e => {
            setText(e.target.value);
          }
        }
        />
      ) : (
        <div 
        className="w-full py-2.5 px-5 mb-2 text-center text-lg overflow-x-auto font-medium text-black dark:text-white"
        onClick={() => setInputVisible(true)}><InlineMath math = {text}></InlineMath></div>
      )}
    </React.Fragment>
    </div>
  );
};

export default EditablePuzzleInput; // We got our component!