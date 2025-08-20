import { getBezierPath, type EdgeProps, MarkerType, BaseEdge } from '@xyflow/react';
import 'katex/dist/katex.min.css';
import { useState } from 'react';
import { InlineMath } from 'react-katex';

const CustomMathEdge = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
  label,
}: EdgeProps) => {
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });
  const [clicked, setClicked] = useState(false)
  return (
    <>
      <BaseEdge  onClick = {()=>setClicked(true)} className="stroke-black stroke-3"path={edgePath} markerEnd={markerEnd} />
      {label && (
        <foreignObject
          width={200}
          height={50}
          x={labelX } // center the label
          y={labelY - 10}
          style={{ overflow: 'visible' }}
        >
          <div className="text-black text-xs font-bold dark:text-white">
            <InlineMath math={label as string} />
          </div>
        </foreignObject>
      )}
    </>
  );
};

export default CustomMathEdge;
