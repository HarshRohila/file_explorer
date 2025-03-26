import { TreeNode } from "../types";
import { TreeNodeUtils } from "../utils/TreeNodeUtils";

class NodeDragService {
  private node: TreeNode | undefined;
  private dropTargetNode: TreeNode | undefined;

  startDrag(node: TreeNode) {
    this.node = node;
  }

  abortDrag() {
    this.node = undefined;
  }

  onDragSuccess(targetNodeId: string, root: TreeNode) {
    const treeNodeUtils = new TreeNodeUtils(root);
    treeNodeUtils.moveNodeToTarget(this.node!.id, targetNodeId);
  }

  setDropTargetNode(targetNode: TreeNode | undefined) {
    this.dropTargetNode = targetNode;
  }

  getDropTargetNode() {
    return this.dropTargetNode;
  }

  getDraggedNode() {
    return this.node;
  }
}

const dragService = new NodeDragService();

export { NodeDragService, dragService };
