import { useState, useCallback } from "react";
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
import "@xyflow/react/dist/style.css";
import { createEdge, createSelfLoop } from "./FlowUtility";

function AutomatonStateNode({ data }: { data: { label: string; accept?: boolean } }) {
  return (
    <div
      className={`relative flex items-center justify-center rounded-full border-2  w-16 h-16 `}
    >
      {data.label}
      {data.accept && (
        <div className="absolute inset-1 rounded-full border-2 border-black pointer-events-none border-gray-950 dark:border-white"></div>
      )}
       {/* Top handles */}
      <Handle type="target" position={Position.Top} id="top-left" style={{ left: '25%' }} />
      <Handle type="target" position={Position.Top} id="top-right" style={{ left: '75%' }} />

      {/* Right handles */}
      <Handle type="source" position={Position.Right} id="right-top" style={{ top: '25%' }} />
      <Handle type="source" position={Position.Right} id="right-bottom" style={{ top: '75%' }} />

      {/* Bottom handles */}
      <Handle type="source" position={Position.Bottom} id="bottom-left" style={{ left: '25%' }} />
      <Handle type="source" position={Position.Bottom} id="bottom-right" style={{ left: '75%' }} />

      {/* Left handles */}
      <Handle type="target" position={Position.Left} id="left-top" style={{ top: '25%' }} />
      <Handle type="target" position={Position.Left} id="left-bottom" style={{ top: '75%' }} />
    </div>
  );
}

const nodeTypes = { state: AutomatonStateNode };

const initialNodes: Node[] = [
  { id: "n1", position: { x: 0, y: 0 }, data: { label: "q₁" }, type: "state" },
  { id: "n2", position: { x: 200, y: 0 }, data: { label: "q₂", accept: true }, type: "state" },
];

const initialEdges: Edge[] = [
  createEdge("1","n1","n2","a"),
  createSelfLoop("2","n1","b"),
];

export default function AutomataFlow() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  const onNodesChange = useCallback(
    (changes: NodeChange[]) => setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
    []
  );
  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
    []
  );
  const onConnect = useCallback(
    (params: any) => setEdges((edgesSnapshot) => addEdge({ ...params, markerEnd: { type: "arrowclosed" } }, edgesSnapshot)),
    []
  );

  return (
    <div className="w-full h-[500px] border rounded-lg">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
        nodeTypes={nodeTypes}
      />
    </div>
  );
}
