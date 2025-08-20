import { MarkerType, type Edge } from "@xyflow/react";
import type { CreationMode } from "../pages/create-puzzle";
import type { AddEdge } from "../pages/create-automata-page";

export function processLabel(props: AddEdge) : string{
  let labelFinalized = ""
  switch (props.automataType){
    case "PDA" : 
      return `${props.read},${props.readFromStack}\\rightarrow ${props.writeOrPush}`
    case "TM" : 
      if((props.leftOrRight!="L")&&(props.leftOrRight!="R")){
        throw new Error(`${props.leftOrRight} is not a valid movement!`)
      }
      return `${props.readFromStack}\\rightarrow ${props.writeOrPush},${props.leftOrRight}`
    default : 
      return props.read;
  }
  
}
export function createEdge(id: string, to : string, from : string,label : string,
   toHandle : string , fromHandle : string, automataType : CreationMode) : Edge{
   
  return {
    id: id,
    source: from,
    target: to,
    sourceHandle : fromHandle,
    targetHandle : toHandle,
    label : label,
    type : "custom",
    style: { strokeWidth: 3, stroke: "black" },
    markerEnd: { type: MarkerType.ArrowClosed},
  }
}

export function createNode(label : string,accepting : boolean, start : boolean){
    return { id: label, position: { x: 50, y: 50 }, data: { label: label, accepting :accepting, start : start,}, type: 'AutomatonStateNode' }
}
export function createSelfLoop(id: string, to : string,label : string) : Edge{
    return {
    id: id,
    source: to,
    target: to,
    label: label,
    animated: false,
    
    type: "smoothstep", // curved edge for self-loop
    markerEnd: { type: "arrowclosed" }
  }
}