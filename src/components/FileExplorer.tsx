import { useState } from "react";
import { ExplorerEvent, ExplorerEvents, TreeNode } from "../types";
import { getNodeRenderer } from "./node-renderers";
import { NewFileForm, NewFileFormData } from "./NewFIleForm";
import { NewFolderForm, NewFolderFormData } from "./NewFolderForm";
import { TreeNodeUtils } from "../utils/TreeNodeUtils";

interface FileExplorerProps {
  root: TreeNode;
  onEvent: (event: ExplorerEvent) => void;
}

function FileExplorer(props: FileExplorerProps) {
  const NodeRenderer = getNodeRenderer(props.root);

  const nodeUtils = new TreeNodeUtils(props.root);

  const handleNewFileFormSubmit = (newFileFormData: NewFileFormData) => {
    setShowNewFileForm(false);
    props.onEvent({
      type: ExplorerEvents.NodeChange,
      data: nodeUtils.addNewFile(newFileFormData),
    });
  };

  const handleNewFolderFormSubmit = (newFolderFormData: NewFolderFormData) => {
    setShowNewFolderForm(false);
    props.onEvent({
      type: ExplorerEvents.NodeChange,
      data: nodeUtils.addNewFolder(newFolderFormData),
    });
  };

  const [showNewFileForm, setShowNewFileForm] = useState(false);
  const [showNewFolderForm, setShowNewFolderForm] = useState(false);

  const handleEvent = (event: ExplorerEvent) => {
    if (event.type === ExplorerEvents.ShowNewFileForm) {
      setShowNewFileForm(true);
    }
    if (event.type === ExplorerEvents.ShowNewFolderForm) {
      setShowNewFolderForm(true);
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
      {showNewFolderForm && (
        <NewFolderForm onSubmit={handleNewFolderFormSubmit} />
      )}
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
