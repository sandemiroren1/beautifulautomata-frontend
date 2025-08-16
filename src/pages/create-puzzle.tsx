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
import EditableInput from '../components/title-of-puzzle';
import EditablePuzzleInput from '../components/configurePuzzleText';

type CreationMode = "DFA" | "NFA"| "PDA"| "TM" | "CFG" |undefined
const automataTypes : CreationMode[] = ["DFA", "NFA", "PDA", "TM", "CFG"];

const defaultTitle = "L = \\{... | \\text{Type your rules here} \\}"




export function CreatePuzzle() {


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
    <EditableInput text = {defaultTitle}></EditableInput>
    <div className="w-full h-[500px] border rounded-lg">
      g
    </div>
    </div>
  
        </div>
        <div className="max-w-[200px] w-full space-y-6 px-4">
          <h1 className="py-2.5 px-5 mb-2 text-center text-lg font-medium text-black dark:text-white">
            Configure
          </h1>
          
          {creationMode&&<EditablePuzzleInput text = {"a,b,c"} widgetName='Alphabet'></EditablePuzzleInput>
                }
            {creationMode=="PDA"&&<EditablePuzzleInput text = {"\\$,A,B"} widgetName='Stack Alphabet'></EditablePuzzleInput>
                }
                {creationMode=="CFG"&&<EditablePuzzleInput text = {"A,B"} widgetName='Non-terminals'></EditablePuzzleInput>
                }
                {creationMode=="TM"&&<EditablePuzzleInput text = {"A,C"} widgetName='Tape Alphabet'></EditablePuzzleInput>
                }

                {creationMode&&<AutomataTypeButton key={"AddAccepted"} buttonName={"Add Accepted Word"} selected = {false} onCommand = {()=>{}}  />}
                {creationMode&&<AutomataTypeButton key={"AddRejected"} buttonName={"Add Rejected Word"} selected = {false} onCommand = {()=>{}}  />}
    
        </div>
        
      </div>
    </main>
  );
}
