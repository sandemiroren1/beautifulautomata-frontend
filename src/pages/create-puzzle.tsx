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
import EditableInput from '../components/title-of-puzzle';
import EditablePuzzleInput from '../components/configurePuzzleText';
import WordEntry, { type WordData } from '../components/word-entry-for-puzzle';
import React, { useState } from 'react';
import '../index.css'

type CreationMode = "DFA" | "NFA"| "PDA"| "TM" | "CFG" |undefined
const automataTypes : CreationMode[] = ["DFA", "NFA", "PDA", "TM", "CFG"];

const defaultTitle = "L = \\{... | \\text{Type your rules here} \\}"

const defaultAlphabet = "a,b,c"
const defaultTapeAlphabet = "A,C";
const defaultStackAlphabet = "\$,A";


export function CreatePuzzle() {


  let [creationMode, setCreationMode] = useState<CreationMode>(automataTypes[0]);
  const renderedButtons  = automataTypes.map((x) => (
    <AutomataTypeButton key={x} buttonName={x as string} selected = {x==creationMode} onCommand = {()=> {
                            setCreationMode(x)
                                                      }}  />
  ));
  let [alphabet , setAlphabet] = useState<string>(defaultAlphabet);
  let [words, setWords] = React.useState<WordData[]>([
    {text : "4",accept:false},{text : "d",accept : true}
  ]);
  let counter = 0;
  const handleDelete = React.useCallback((id: string) => {
    setWords(prev => prev.filter(c => c.text !== id));
  }, []);

   const addCardAccepting =  React.useCallback(() => {
    setWords(prev => [...prev, { text : `a_{${counter++}}`,accept : true }]);
  }, []);
  const addCardRejecting =  React.useCallback(() => {
    setWords(prev => [...prev, { text : `a_{${counter++}}`,accept : false }]);
  }, []);
  return (
    <main className="h-screen flex flex-col">
  <Header />

  <div className="flex flex-1 min-h-0">
    {/* Left Sidebar */}
    <div className="w-[200px] space-y-6 px-4">
      <h1 className="py-2.5 px-5 mb-2 text-center text-lg font-medium text-black dark:text-white">
        Create
      </h1>
      <div className="rounded-3xl border border-gray-200 p-6 dark:border-gray-700 space-y-4">
        {renderedButtons}
      </div>
    </div>

    {/* Middle area */}
    <div className="flex-1 flex flex-col min-h-0 px-4">
  <EditableInput editable = {true}text={defaultTitle} />
  <div className="flex-1 flex flex-col border rounded-lg max-h-[1000px] overflow-y-auto">
    {words.map(word => (
      <WordEntry key={word.text} word={word} onDelete={handleDelete} />
    ))}
  </div>
</div>

    {/* Right Sidebar */}
    <div className="w-[200px] space-y-6 px-4">
      <h1 className="py-2.5 px-5 mb-2 text-center text-lg font-medium text-black dark:text-white">
        Configure
      </h1>

      <EditablePuzzleInput editable = {true} text={alphabet} widgetName="Alphabet" />
      {creationMode == "PDA" && (
        <EditablePuzzleInput editable = {true} text={"\\$,A,B"} widgetName="Stack Alphabet" />
      )}
      {creationMode == "CFG" && (
        <EditablePuzzleInput editable = {true} text={"A,B"} widgetName="Non-terminals" />
      )}
      {creationMode == "TM" && (
        <EditablePuzzleInput editable = {true} text={"A,C"} widgetName="Tape Alphabet" />
      )}

      <AutomataTypeButton
        key={"AddAccepted"}
        buttonName={"Add Accepted Word"}
        selected={false}
        onCommand={addCardAccepting}
      />
      <AutomataTypeButton
        key={"AddRejected"}
        buttonName={"Add Rejected Word"}
        selected={false}
        onCommand={addCardRejecting}
      />
      <AutomataTypeButton
        key={"CreateThePuzzle"}
        buttonName={"Publish Puzzle!"}
        selected={true}
        onCommand={()=>{}}
      />
    </div>
  </div>
</main>

  );
}
