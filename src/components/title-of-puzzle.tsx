import React, { useState, useRef, useEffect } from "react";
import 'katex/dist/katex.min.css';
import { BlockMath, InlineMath } from 'react-katex';

const EditableInput = (props: {editable : boolean; text: string; }) => {
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
      {inputVisible&&props.editable ? (
        <input
          ref={inputRef} // Set the Ref
          value={text} // Now input value uses local state
          className="py-2.5 px-5 mb-2 text-center  text-lg font-medium text-black dark:text-white"
          onChange={e => {
            setText(e.target.value);
          }
        }
        />
      ) : (
        <div
  className="py-2.5 px-5 mb-2 text-center text-lg 
              "
  onClick={() => setInputVisible(true)}
>
  <div className= "overflow-x-auto justify-self-center max-w-[800px] ">
    <InlineMath math={text} />
  </div>
  
</div>
      )}
    </React.Fragment>
  );
};

export default EditableInput; // We got our component!