import { Handle, Position } from "@xyflow/react";
import React from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { InlineMath } from "react-katex";


export function AutomatonStateNode({ data }: { data: { label: string; accept?: boolean } }) {
  const inputRef = useRef<HTMLInputElement>(null);
    let [inputVisible, setInputVisible] = useState(false);
    let [text, setText] = useState(data.label);
  
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
    <div
      className={`relative flex items-center justify-center rounded-full border-2  w-16 h-16 `}
    >
      
        <div className= "overflow-hidden text-xs justify-self-center ">
          <InlineMath math={text} />
        </div>

      {data.accept && (
        <div className="absolute inset-1 rounded-full border-2 border-black pointer-events-none border-gray-950 dark:border-white"></div>
      )}
       {/* Top handles */}
      <Handle type="target" position={Position.Top} id="top-left" style={{ left: '25%' }} />
      <Handle type="target" position={Position.Top} id="top-right" style={{ left: '75%' }} />

      {/* Right handles */}
      <Handle type="source" position={Position.Right} id="right-top" style={{ top: '25%' }} />
      <Handle type="source" position={Position.Right} id="right-bottom" style={{ top: '75%' }} />

      {/* Bottom handles */}
      <Handle type="source" position={Position.Bottom} id="bottom-left" style={{ left: '25%' }} />
      <Handle type="source" position={Position.Bottom} id="bottom-right" style={{ left: '75%' }} />

      {/* Left handles */}
      <Handle type="target" position={Position.Left} id="left-top" style={{ top: '25%' }} />
      <Handle type="target" position={Position.Left} id="left-bottom" style={{ top: '75%' }} />
    </div>
  );
}
