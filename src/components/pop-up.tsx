import React, { useState } from 'react';
import { AutomataTypeButton } from './automata-type-button';
import EditablePuzzleInput from './configurePuzzleText';
import type { AddEdge } from '../pages/create-automata-page';
import type { CreationMode } from '../pages/create-puzzle';

type AddEdgePopupProps = {
  onClose: () => void;
  addEdge : (edge : AddEdge)=>void;
  from : string;
  to : string
  toHandle : string;
  fromHandle : string
  automataMode : CreationMode
};
const extraWidgetModes = new Set<string>(["CFG","PDA","TM"]);
const AddEdgePopup: React.FC<AddEdgePopupProps> = ({to,from, addEdge, onClose, automataMode }) => {
  const colors = "text-gray-900 bg-white border-gray-200  " +
      "dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600";
  const [toState, setTo] = useState<string>(to)
  const [fromState, setFrom] = useState<string>(from)
  const [over, setOver] = useState<string>("a")
  const [readOrPop, setReadOrPop] = useState<string>("\\epsilon")
  const [writeOrPush, setWriteOrPush] = useState<string>("\\epsilon")
  const [leftOrRight, setLeftOrRight] = useState<string>("L")

  
  return (
    <div className="fixed inset-0 w-full h-full bg-black/50 flex justify-center items-center z-[1000] backdrop-blur-sm">
      <div className={`rounded-[10px] ${colors} max-w-[1000px]`}>
        <div className = "flex">
            <div className = "flex-4">
        <h2 className="py-2 px-2 align-middle">Add Edge</h2>

            </div>
        <div className = "flex-1 max-w-[100px]">
        <AutomataTypeButton key={"ClosePopUp"} buttonName={"Close"} selected = {false} onCommand ={onClose}></AutomataTypeButton>

        </div>
        </div>
        <p>This is the content of the popup.</p>
        <div className= "flex">
        <div className='flex-1'>
        <EditablePuzzleInput text = {fromState} setText={setFrom} widgetName="from" editable = {true}></EditablePuzzleInput>

        </div>
        <div className='flex-1'>
        <EditablePuzzleInput text = {toState} setText={setTo}widgetName="to" editable = {true}></EditablePuzzleInput>

        </div>
        {automataMode != "TM" &&<div className='flex-1'>
        <EditablePuzzleInput text = {over} setText={setOver} widgetName="over" editable = {true}></EditablePuzzleInput>

        </div>
}
        {extraWidgetModes.has(automataMode)&&<div className='flex-1'>
        <EditablePuzzleInput text = {readOrPop} setText={setReadOrPop} widgetName={automataMode == "TM" ? "read" : "pop"} editable = {true}></EditablePuzzleInput>

        </div>}
        {extraWidgetModes.has(automataMode)&&<div className='flex-1'>
        <EditablePuzzleInput text = {writeOrPush} setText={setWriteOrPush} widgetName={automataMode == "TM" ? "write" : "push"} editable = {true}></EditablePuzzleInput>

        </div>}
        {automataMode=="TM"&&<div className='flex-1'>
        <EditablePuzzleInput text = {leftOrRight} setText={setLeftOrRight} widgetName={automataMode == "TM" ? "write" : "push"} editable = {true}></EditablePuzzleInput>

        </div>}
        </div>
        <AutomataTypeButton key={"Add Edge"} buttonName={"Add Edge"} selected = {false} onCommand ={()=>{
            addEdge({from :  from, to: to, read : over, automataType : automataMode, writeOrPush : writeOrPush , readFromStack : readOrPop , leftOrRight : leftOrRight})
            onClose()
        }}></AutomataTypeButton>
            
      </div>
    </div>
  );
};

export default AddEdgePopup;