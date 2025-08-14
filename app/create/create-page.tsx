import { useCallback, useState } from 'react';
import { ReactFlow, MiniMap, Controls, Background, addEdge } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import pkg from 'react-katex';
import { AutomataTypeButton } from '~/components/automata-type-button';
import Header from '~/components/header';
import { AutomataFlow } from '~/components/automata-flow';

const { BlockMath, InlineMath } = pkg;

const automataTypes = ["DFA", "NFA", "PDA", "TM", "CFG"];

// Simple starter nodes & edges
const initialNodes = [
  { id: '1', position: { x: 100, y: 100 }, data: { label: 'Start' } },
  { id: '2', position: { x: 300, y: 100 }, data: { label: 'Accept' } }
];

const initialEdges = [
  { id: 'e1-2', source: '1', target: '2', label: 'a' }
];

export function Create() {
  const renderedButtons = automataTypes.map((x) => (
    <AutomataTypeButton key={x} buttonName={x} navLink="/create" />
  ));

  return (
    <main className="h-screen flex flex-col">
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
        <div className="flex-1 min-h-0">
          <AutomataFlow />
        </div>
      </div>
    </main>
  );
}
