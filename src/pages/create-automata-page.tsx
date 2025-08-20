
import { AutomataTypeButton } from '../components/automata-type-button';
import Header from '../components/header';
import { useCallback, useState,useRef } from 'react';

type CreationMode = "DFA" | "NFA"| "PDA"| "TM" | "CFG" |undefined
const automataTypes : CreationMode[] = ["DFA", "NFA", "PDA", "TM", "CFG"];

import EditableInput from '../components/title-of-puzzle';
import EditablePuzzleInput from '../components/configurePuzzleText';
import BiDirectionalEdge from '../components/bidirectional-edge';

import { ReactFlow, applyNodeChanges, applyEdgeChanges, addEdge, type NodeChange, type EdgeChange, type Edge } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { AutomatonStateNode } from '../components/AutomatonNode';
import { createEdge, createNode, processLabel } from '../components/FlowUtility';
import AddEdgePopup from '../components/pop-up';
import ThemedEdge from '../components/AutomatonEdge';
import CustomMathEdge from '../components/AutomatonEdge';
 
const initialNodes: any[] | (() => any[]) = [
]
const initialEdges : Edge[] = [];



const nodeTypes = {
  AutomatonStateNode: AutomatonStateNode,
};
const edgeTypes = {
  bidirectional: BiDirectionalEdge,
  custom : CustomMathEdge
  //selfconnecting: SelfConnectingEdge,
  //buttonedge: ButtonEdge,
};
let counter = 0;

export type AddEdge= {
  from : string;
  to : string;
  read : string;
  writeOrPush : string |undefined;
  readFromStack : string |undefined;
  automataType : CreationMode;
  leftOrRight : string | undefined
  


}
let toForPopUp = "q_i"
let fromForPopUp = "q_j" 
let toHandle = "top-target"
let fromHandle = "top-source"
let automataMode : CreationMode = "DFA";

export function CreateAutomata() {

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  let [creationMode, setCreationMode] = useState<CreationMode>(undefined);
  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  const alphabet = "a,b,c";
  console.log(edges)

    const onNodesChange = useCallback(
      (changes: NodeChange<{ id: string; position: { x: number; y: number; }; data: { label: string; }; type: string; }>[]) => setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
      [],
    );
    const onEdgesChange = useCallback(
    (changes: EdgeChange<Edge>[]) => setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
    [],
  );
  const onConnect = useCallback(
    (params: any) => {
      toForPopUp = params.target!
      fromForPopUp = params.source!  
      toHandle = params.targetHandle!
      fromHandle = params.sourceHandle!
      console.log(params)
      setIsPopupOpen(true);
      },
    [],
  );

    const addEdgeToList = useCallback((edge : AddEdge) => {
      console.log(edge," handle: ",toHandle," fromHandle ", fromHandle)
      setEdges([...edges,createEdge(counter+++"edge",edge.to,edge.from,processLabel(edge),toHandle,fromHandle,automataMode!)])
    },[edges])
  return (
    <main className="h-screen flex flex-col">
           <Header></Header>
      
      <div className="flex flex-1 min-h-0">
        {/* Left Sidebar */}
        <div className="max-w-[200px] w-full space-y-6 px-4">
          <h1 className="py-2.5 px-5 mb-2 mx-2 text-center text-lg font-medium text-black dark:text-white">
            Configuration
          </h1>
          <EditablePuzzleInput editable = {false} text={alphabet} setText={(useless : string)=>{}} widgetName="Alphabet" />
      {creationMode == "PDA" && (
        <EditablePuzzleInput editable = {false}text={"\\$,A,B"} setText={(useless : string)=>{}} widgetName="Stack Alphabet" />
      )}
      {creationMode == "CFG" && (
        <EditablePuzzleInput editable = {false}text={"A,B"}setText={(useless : string)=>{}} widgetName="Non-terminals" />
      )}
      {creationMode == "TM" && (
        <EditablePuzzleInput editable = {false}text={"A,C"} setText={(useless : string)=>{}} widgetName="Tape Alphabet" />
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
            edgeTypes={edgeTypes}
            nodeTypes={nodeTypes}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
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
    {<AutomataTypeButton key={"Add Node"} buttonName={"Add State"} selected = {false} onCommand = {(()=>{setNodes([...nodes,createNode(`q_${counter++}`,false,nodes.length==0)])})}  />}
    {<AutomataTypeButton key={"Add Edge"} buttonName={"Add Edge"} selected = {false} onCommand = {openPopup}  />}
      {isPopupOpen && <AddEdgePopup to = {toForPopUp} from = {fromForPopUp} addEdge = {addEdgeToList} onClose={closePopup} automataMode = {automataMode!} toHandle={toHandle} fromHandle={fromHandle}/>}
          </nav>
        </div>}
        </div>
      </div>
    </main>
  );
}
