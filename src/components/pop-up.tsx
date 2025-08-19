import React from 'react';
import { AutomataTypeButton } from './automata-type-button';
import EditablePuzzleInput from './configurePuzzleText';
import type { AddEdge } from '../pages/create-automata-page';

type AddEdgePopupProps = {
  onClose: () => void;
  addEdge : (edge : AddEdge)=>void;
};

const AddEdgePopup: React.FC<AddEdgePopupProps> = ({ addEdge, onClose }) => {
  const colors = "text-gray-900 bg-white border-gray-200  " +
      "dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600";
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
        <EditablePuzzleInput text = "q_i" widgetName="from" editable = {true}></EditablePuzzleInput>

        </div>
        <div className='flex-1'>
        <EditablePuzzleInput text = "q_j" widgetName="from" editable = {true}></EditablePuzzleInput>

        </div>
        <div className='flex-1'>
        <EditablePuzzleInput text = "a" widgetName="over" editable = {true}></EditablePuzzleInput>

        </div>
        </div>
        <AutomataTypeButton key={"Add Node"} buttonName={"Add State"} selected = {false} onCommand ={()=>{}}></AutomataTypeButton>
            
      </div>
    </div>
  );
};

export default AddEdgePopup;