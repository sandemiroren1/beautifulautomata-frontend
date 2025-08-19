import { MarkerType, type Edge } from "@xyflow/react";

export function createEdge(id: string, to : string, from : string,label : string) : Edge{
    return {
    id: id,
    source: from,
    target: to,
    type: 'bidirectional',
    style: { strokeWidth: 3, stroke: "black" },
    markerEnd: { type: MarkerType.ArrowClosed},
  }
}

export function createNode(label : string){
    return { id: label, position: { x: 50, y: 50 }, data: { label: label }, type: 'AutomatonStateNode' }
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