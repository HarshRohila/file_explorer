import { dragService } from "../../services/NodeDragService";
import { ExplorerEvents, NodeRendererProps } from "../../types";
import { createExplorerEvent } from "../../utils";

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

  return (
    <div
      data-level={props.node.level}
      onDragEnter={(ev) => {
        ev.preventDefault();
        ev.dataTransfer.dropEffect = "move";
        dragService.setDropTargetNode(props.node);
      }}
      onDragOver={(ev) => {
        ev.preventDefault();
        ev.dataTransfer.dropEffect = "move";
        dragService.setDropTargetNode(props.node);
      }}
      onDragLeave={() => {
        dragService.setDropTargetNode(undefined);
      }}
    >
      📁 {props.node.name}
      <span className="actions">
        <button onClick={handleAddFile}>Add File</button>
        <button onClick={handleAddFolder}>Add Folder</button>
      </span>
    </div>
  );
}

export { FolderNodeRenderer };
