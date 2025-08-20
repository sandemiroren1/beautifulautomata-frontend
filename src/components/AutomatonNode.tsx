import { Handle, Position } from "@xyflow/react";
import React from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { InlineMath } from "react-katex";


export function AutomatonStateNode({ data }: { data: { label: string; accept?: boolean , start : boolean} }) {
  const inputRef = useRef<HTMLInputElement>(null);
    let [inputVisible, setInputVisible] = useState(false);
    let [text, setText] = useState(data.label);
    const [accepting,setAccepting] = useState(data.accept);
    const [handlesVisible, setHandlesVisible] = useState(false);
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
    const visibleClass = `w-3 h-3 ${handlesVisible ? "visible" : "invisible"}`;

    const positions = [
    { id: "top-left", side: Position.Top, style: { left: "25%" } },
    { id: "top-right", side: Position.Top, style: { left: "75%" } },

    { id: "right-top", side: Position.Right, style: { top: "25%" } },
    { id: "right-bottom", side: Position.Right, style: { top: "75%" } },

    { id: "bottom-left", side: Position.Bottom, style: { left: "25%" } },
    { id: "bottom-right", side: Position.Bottom, style: { left: "75%" } },

    { id: "left-top", side: Position.Left, style: { top: "25%" } },
    { id: "left-bottom", side: Position.Left, style: { top: "75%" } },
  ];
    return (
    <div
      className={`relative flex items-center justify-center rounded-full border-2  w-9 h-9 `}
      onMouseEnter={()=>setHandlesVisible(true)}
      onMouseLeave={()=>setHandlesVisible(false)}
      onDoubleClick={()=> setAccepting(!accepting)}
    >
      
        <div className= "overflow-hidden text-xs justify-self-center ">
          <InlineMath math={text} />
        </div>

      {accepting && (
        <div className="absolute inset-0.5 rounded-full border-2 border-black pointer-events-none border-gray-950 dark:border-white"></div>
      )}
       {/* Top handles */}

      {positions.map((pos) => (
        <Handle
          key={`${pos.id}-target`}
          id={`${pos.id}-target`}
          type="target"
          position={pos.side}
          className={visibleClass}
          style={pos.style}
        />
      ))}
      {positions.map((pos) => (
        <Handle
          key={`${pos.id}-source`}
          id={`${pos.id}-source`}
          type="source"
          position={pos.side}
          className={visibleClass}
          style={pos.style}
        />
      ))}
      {/*draw arrow here if start */}
      {data.start && (
  <svg
    className="absolute -left-6 top-1/2 -translate-y-1/2 fill-black dark:fill-white" 
    width="20"
    height="10"
    viewBox="0 0 20 10"
    xmlns="http://www.w3.org/2000/svg"
  >
    <line x1="0" y1="5" x2="15" y2="5" className="stroke-black dark:stroke-white" strokeWidth="2" />
    <polygon points="15,0 15,10 20,5" className="stroke-black dark:stroke-white" />
  </svg>
)}
      

    </div>
  );
}
