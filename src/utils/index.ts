import { TreeNode } from "../types";

function getPaddingOfNode(node: TreeNode) {
  return node.level * 20 + "px";
}

function createExplorerEvent(type: string, data: unknown) {
  return {
    type,
    data,
  };
}

export { getPaddingOfNode, createExplorerEvent };
