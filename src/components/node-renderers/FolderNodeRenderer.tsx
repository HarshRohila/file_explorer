import { dragService } from "../../services/NodeDragService";
import { NodeRendererProps } from "../../types";
import { createExplorerEvent, getPaddingOfNode } from "../../utils";

function FolderNodeRenderer(props: NodeRendererProps) {
  const handleAddFile = () => {
    const ev = createExplorerEvent("addFile", props.node);
    props.onEvent(ev);
  };

  return (
    <div
      data-level={props.node.level}
      style={{ paddingLeft: getPaddingOfNode(props.node) }}
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
        <button>Add Folder</button>
      </span>
    </div>
  );
}

export { FolderNodeRenderer };
