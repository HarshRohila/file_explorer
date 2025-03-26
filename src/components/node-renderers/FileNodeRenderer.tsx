import { dragService } from "../../services/NodeDragService";
import { ExplorerEvents, NodeRendererProps } from "../../types";
import { createExplorerEvent, getPaddingOfNode } from "../../utils";
import { NodeMoveEventData } from "../FileExplorer";

function FileNodeRenderer(props: NodeRendererProps) {
  return (
    <div
      draggable
      style={{ paddingLeft: getPaddingOfNode(props.node) }}
      onDragStart={(ev) => {
        ev.dataTransfer.effectAllowed = "move";
        dragService.startDrag(props.node);
      }}
      onDragEnd={(ev) => {
        if (ev.dataTransfer.dropEffect === "none") {
          dragService.abortDrag();
        } else {
          const nodeId = dragService.getDraggedNode()!.id;
          const event = createExplorerEvent(ExplorerEvents.NodeMove, {
            nodeId,
            targetNodeId: dragService.getDropTargetNode()!.id,
          } as NodeMoveEventData);
          props.onEvent(event);
        }
      }}
    >
      📄 <span>{props.node.name}</span>
    </div>
  );
}

export { FileNodeRenderer };
