import { useState } from "react";
import { ExplorerEvent, ExplorerEvents, NodeType, TreeNode } from "../types";
import { getNodeRenderer } from "./node-renderers";
import { NewFileForm, NewFileFormData } from "./NewFIleForm";
import { createNode } from "../utils";

interface FileExplorerProps {
  root: TreeNode;
  onEvent: (event: ExplorerEvent) => void;
}

function updateRoot(
  root: TreeNode,
  newFileFormData: NewFileFormData
): TreeNode {
  const newNode = createNode({
    name: newFileFormData.fileName,
    type: NodeType.File,
    level: root.level + 1,
  });
  return {
    ...root,
    children: [newNode, ...root.children],
  };
}

function FileExplorer(props: FileExplorerProps) {
  const NodeRenderer = getNodeRenderer(props.root);

  const handleNewFileFormSubmit = (newFileFormData: NewFileFormData) => {
    setShowNewFileForm(false);
    props.onEvent({
      type: ExplorerEvents.NodeChange,
      data: updateRoot(props.root, newFileFormData),
    });
  };

  const [showNewFileForm, setShowNewFileForm] = useState(false);

  const handleEvent = (event: ExplorerEvent) => {
    if (event.type === ExplorerEvents.ShowNewFileForm) {
      setShowNewFileForm(true);
    }
    props.onEvent(event);
  };

  return (
    <div className="explorer">
      <NodeRenderer
        node={props.root}
        onEvent={handleEvent}
        onChange={() => {}}
      />
      {showNewFileForm && <NewFileForm onSubmit={handleNewFileFormSubmit} />}
      {props.root.children.map((c) => {
        c.level = props.root.level + 1;
        return <FileExplorer key={c.id} onEvent={props.onEvent} root={c} />;
      })}
    </div>
  );
}

interface NodeMoveEventData {
  nodeId: string;
  targetNodeId: string;
}

export { FileExplorer };
export type { ExplorerEvent, NodeMoveEventData };
