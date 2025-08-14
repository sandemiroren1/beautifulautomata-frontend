import '@xyflow/react/dist/style.css';

import { AutomataTypeButton } from '../components/automata-type-button';
import Header from '../components/header';
import  AutomataFlow from '../components/AutomataFlow';
import { useState } from 'react';
import   { type Node,type Edge }  from '@xyflow/react';
import { createNode } from '../components/FlowUtility';

const automataTypes = ["DFA", "NFA", "PDA", "TM", "CFG"];



export function Create() {
  var curr_nodes :Node[]= []
  var curr_edges :Edge[]= []
  var counter = 0;
  const [nodes, setNodes] = useState(curr_nodes);
  const [edges, setEdges] = useState(curr_edges);
  const renderedButtons = automataTypes.map((x) => (
    <AutomataTypeButton key={x} buttonName={x} onCommand = {()=> {
                                                      nodes.push(createNode("q"+counter++))
                                                      setNodes(nodes)}} navLink="/create" />
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
          <AutomataFlow />
        </div>
        <div className="max-w-[200px] w-full space-y-6 px-4">
          <h1 className="py-2.5 px-5 mb-2 text-center text-lg font-medium text-black dark:text-white">
            Configure
          </h1>
          <nav className="rounded-3xl border border-gray-200 p-6 dark:border-gray-700  w-full">
    <AutomataTypeButton key={"Add"} buttonName={"Add State"} onCommand = {()=> {return;}} navLink="/create" />
            
          </nav>
        </div>
      </div>
    </main>
  );
}
