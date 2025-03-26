import { ExplorerEvent, TreeNode } from "../types";
import { getNodeRenderer } from "./node-renderers";

interface FileExplorerProps {
  root: TreeNode;
  onEvent: (event: ExplorerEvent) => void;
}

function FileExplorer(props: FileExplorerProps) {
  const NodeRenderer = getNodeRenderer(props.root);

  return (
    <>
      <NodeRenderer node={props.root} onEvent={props.onEvent} />
      {props.root.children.map((c) => {
        c.level = props.root.level + 1;
        return <FileExplorer key={c.id} onEvent={props.onEvent} root={c} />;
      })}
    </>
  );
}

interface NodeMoveEventData {
  nodeId: string;
  targetNodeId: string;
}

export { FileExplorer };
export type { ExplorerEvent, NodeMoveEventData };
