import { useState } from "react";
import { dragService } from "../../services/NodeDragService";
import { ExplorerEvents, NodeRendererProps } from "../../types";
import {
  createDraggablePropsForNodeRenderer,
  createExplorerEvent,
} from "../../utils";

function FolderNodeRenderer(props: NodeRendererProps) {
  const handleAddFile = () => {
    props.onEvent(
      createExplorerEvent(ExplorerEvents.ShowNewFileForm, undefined)
    );
  };

  const handleAddFolder = () => {
    props.onEvent(
      createExplorerEvent(ExplorerEvents.ShowNewFolderForm, undefined)
    );
  };

  const [isDragAllowed, setIsDragAllowed] = useState(false);

  return (
    <div
      {...createDraggablePropsForNodeRenderer(props)}
      className={`folder-node ${isDragAllowed ? "drag-allowed" : ""}`}
      data-level={props.node.level}
      onDragEnter={(ev) => {
        ev.preventDefault();
        const isTargetValid = dragService.isDragAllowedAtTarget(props.node);
        setIsDragAllowed(isTargetValid);

        if (isTargetValid) {
          ev.dataTransfer.dropEffect = "move";
          dragService.setDropTargetNode(props.node);
        } else {
          dragService.setDropTargetNode(undefined);
        }
      }}
      onDragOver={(ev) => {
        ev.preventDefault();
      }}
    >
      📁 {props.node.name}
      <span className="actions">
        <button onClick={handleAddFile}>✚ File</button>
        <button onClick={handleAddFolder}>✚ Folder</button>
      </span>
    </div>
  );
}

export { FolderNodeRenderer };
