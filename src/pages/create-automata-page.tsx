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
import EditableInput from '../components/title-of-puzzle';
import EditablePuzzleInput from '../components/configurePuzzleText';
import FlowBoard from '../components/FlowBoard';
import { AutomatonStateNode } from '../components/AutomatonNode';



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
          <h1 className="py-2.5 px-5 mb-2 mx-2 text-center text-lg font-medium text-black dark:text-white">
            Configuration
          </h1>
          <EditablePuzzleInput editable = {false} text={"a,b,c"} widgetName="Alphabet" />
      {creationMode == "PDA" && (
        <EditablePuzzleInput editable = {false}text={"\\$,A,B"} widgetName="Stack Alphabet" />
      )}
      {creationMode == "CFG" && (
        <EditablePuzzleInput editable = {false}text={"A,B"} widgetName="Non-terminals" />
      )}
      {creationMode == "TM" && (
        <EditablePuzzleInput editable = {false}text={"A,C"} widgetName="Tape Alphabet" />
      )}
        </div>

        {/* React Flow Area */}
        <div className="flex-5 min-h-0">
           

      
    <EditableInput editable = {false} text = {"L = \\{x | x\\text{ starts with }aa\\}"}></EditableInput>
    <div className="max-w[1000px] h-[500px] border rounded-lg">
      <FlowBoard></FlowBoard>
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
