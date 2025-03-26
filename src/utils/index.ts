import { NodeType, TreeNode } from "../types";
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

export { createExplorerEvent, createNode };
