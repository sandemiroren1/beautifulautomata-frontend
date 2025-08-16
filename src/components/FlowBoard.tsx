import { useState, useCallback } from 'react';
import { ReactFlow, applyNodeChanges, applyEdgeChanges, addEdge, type NodeChange, type EdgeChange } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { AutomatonStateNode } from './AutomatonNode';
 
const initialNodes = [
  { id: 'n1', position: { x: 0, y: 0 }, data: { label: 'q_1' } ,type:'AutomatonStateNode' },
  { id: 'n2', position: { x: 0, y: 100 }, data: { label: 'q_2' },type:'AutomatonStateNode' },
];
const initialEdges = [{ id: 'n1-n2', source: 'n1', target: 'n2' }];
 
const nodeTypes = {
  AutomatonStateNode: AutomatonStateNode,
};
export default function FlowBoard() {
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
    <ReactFlow
      nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
      nodeTypes={nodeTypes}
      fitView
    />
  );
}