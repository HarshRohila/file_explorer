import { NodeMoveEventData } from "../components/FileExplorer";
import { dragService } from "../services/NodeDragService";
import {
  ExplorerEvents,
  NodeRendererProps,
  NodeType,
  TreeNode,
} from "../types";
import { newId } from "./newId";

function createExplorerEvent(type: string, data: unknown) {
  return {
    type,
    data,
  };
}

function createNode(node: Partial<TreeNode>): TreeNode {
  const id = newId();
  return {
    id: newId(),
    name: id,
    type: NodeType.File,
    children: [],
    level: 1,
    isEditMode: false,
    ...node,
  };
}

function createNodeMoveEvent() {
  const nodeId = dragService.getDraggedNode()!.id;
  const event = createExplorerEvent(ExplorerEvents.NodeMove, {
    nodeId,
    targetNodeId: dragService.getDropTargetNode()!.id,
  } as NodeMoveEventData);
  return event;
}

const createDraggablePropsForNodeRenderer = (props: NodeRendererProps) => {
  const draggableProps = {
    draggable: true,
    onDragStart: (ev: React.DragEvent) => {
      ev.dataTransfer.effectAllowed = "move";
      dragService.startDrag(props.node);
    },
    onDragEnd: (ev: React.DragEvent) => {
      if (ev.dataTransfer.dropEffect === "none") {
        dragService.abortDrag();
      } else {
        if (dragService.getDropTargetNode()) {
          props.onEvent(createNodeMoveEvent());
        }
      }
    },
  };
  return draggableProps;
};

export {
  createExplorerEvent,
  createNode,
  createNodeMoveEvent,
  createDraggablePropsForNodeRenderer,
};
