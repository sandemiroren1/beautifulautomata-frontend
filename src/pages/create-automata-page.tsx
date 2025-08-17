
import { AutomataTypeButton } from '../components/automata-type-button';
import Header from '../components/header';
import { useCallback, useState,useRef } from 'react';

type CreationMode = "DFA" | "NFA"| "PDA"| "TM" | "CFG" |undefined
const automataTypes : CreationMode[] = ["DFA", "NFA", "PDA", "TM", "CFG"];

import EditableInput from '../components/title-of-puzzle';
import EditablePuzzleInput from '../components/configurePuzzleText';
import FlowBoard from '../components/FlowBoard';

import { ReactFlow, applyNodeChanges, applyEdgeChanges, addEdge, type NodeChange, type EdgeChange } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { AutomatonStateNode } from '../components/AutomatonNode';
import { createNode } from '../components/FlowUtility';
 
const initialNodes = [
  { id: 'n1', position: { x: 0, y: 0 }, data: { label: 'q_1' } ,type:'AutomatonStateNode' },
  { id: 'n2', position: { x: 0, y: 100 }, data: { label: 'q_2' },type:'AutomatonStateNode' },
];
const initialEdges = [{ id: 'n1-n2', source: 'n1', target: 'n2' }];
 
const nodeTypes = {
  AutomatonStateNode: AutomatonStateNode,
};

let counter = 0;

export function CreateAutomata() {


  let [creationMode, setCreationMode] = useState<CreationMode>(undefined);
  
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
   
    const onNodesChange = useCallback(
      (changes: NodeChange<{ id: string; position: { x: number; y: number; }; data: { label: string; }; type: string; }>[]) => setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
      [],
    );
    const onEdgesChange = useCallback(
      (changes: EdgeChange<{ id: string; source: string; target: string; }>[]) => setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
      [],
    );
    const onConnect = useCallback(
      (params: any) => setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)),
      [],
    );
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
      <ReactFlow
            nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
            nodeTypes={nodeTypes}
            fitView
          />
    </div>
  
        </div>
        <div className="max-w-[200px] w-full space-y-6 px-4">
          <h1 className="py-2.5 px-5 mb-2 text-center text-lg font-medium text-black dark:text-white">
            Configure
          </h1>
          {<div>
          
          <nav className="rounded-3xl border border-gray-200 p-6 dark:border-gray-700  w-full">
    {<AutomataTypeButton key={"Add"} buttonName={"Add State"} selected = {false} onCommand = {(()=>{console.log(counter);setNodes([...nodes,createNode(`q_${counter++}`)])})}  />}
            
          </nav>
        </div>}
        </div>
      </div>
    </main>
  );
}
