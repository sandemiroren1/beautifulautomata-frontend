import '@xyflow/react/dist/style.css';
import {
  ReactFlow,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  type Node,
  type NodeChange,
  type Edge,
  type EdgeChange,
  Handle,
  Position,
} from "@xyflow/react";
import { AutomataTypeButton } from '../components/automata-type-button';
import Header from '../components/header';
import { useCallback, useState,useRef } from 'react';
import { createNode } from '../components/FlowUtility';

type CreationMode = "DFA" | "NFA"| "PDA"| "TM" | "CFG" |undefined
const automataTypes : CreationMode[] = ["DFA", "NFA", "PDA", "TM", "CFG"];

import { createEdge, createSelfLoop } from "../components/FlowUtility";

function AutomatonStateNode({ data }: { data: { label: string; accept?: boolean } }) {
  return (
    <div
      className={`relative flex items-center justify-center rounded-full border-2  w-16 h-16 `}
    >
      {data.label}
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

const nodeTypes = { state: AutomatonStateNode };
export function CreateAutomata() {


  let [creationMode, setCreationMode] = useState<CreationMode>(undefined);
  const renderedButtons = automataTypes.map((x) => (
    <AutomataTypeButton key={x} buttonName={x as string} selected = {x==creationMode} onCommand = {()=> {
                            setCreationMode(x)
                                                      }}  />
  ));

  return (
    <main className="h-screen flex flex-col">
           <Header></Header>
      
      <div className="flex flex-1 min-h-0">
        {/* Left Sidebar */}
        <div className="max-w-[200px] w-full space-y-6 px-4">
          <h1 className="py-2.5 px-5 mb-2 text-center text-lg font-medium text-black dark:text-white">
            Create
          </h1>
          <nav className="rounded-3xl border border-gray-200 p-6 dark:border-gray-700 space-y-4">
            {renderedButtons}
          </nav>
        </div>

        {/* React Flow Area */}
        <div className="flex-5 min-h-0">
           

   <div>
    <h1 className="py-2.5 px-5 mb-2 text-center text-lg font-medium text-black dark:text-white">
            Title
          </h1>
    <div className="w-full h-[500px] border rounded-lg">
      g
    </div>
    </div>
  
        </div>
        <div className="max-w-[200px] w-full space-y-6 px-4">
          <h1 className="py-2.5 px-5 mb-2 text-center text-lg font-medium text-black dark:text-white">
            Configure
          </h1>
          {creationMode&&<div>
          
          <nav className="rounded-3xl border border-gray-200 p-6 dark:border-gray-700  w-full">
    {<AutomataTypeButton key={"Add"} buttonName={"Add State"} selected = {false} onCommand = {()=>{}}  />}
            
          </nav>
        </div>}
        </div>
      </div>
    </main>
  );
}
