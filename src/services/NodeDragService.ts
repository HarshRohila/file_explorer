import { NodeType, TreeNode } from "../types";
import { TreeNodeUtils } from "../utils/TreeNodeUtils";

class NodeDragService {
  private draggedNode: TreeNode | undefined;
  private dropTargetNode: TreeNode | undefined;

  startDrag(node: TreeNode) {
    this.draggedNode = node;
  }

  abortDrag() {
    this.draggedNode = undefined;
  }

  onDragSuccess(targetNodeId: string, root: TreeNode) {
    const treeNodeUtils = new TreeNodeUtils(root);
    treeNodeUtils.moveNodeToTarget(this.draggedNode!.id, targetNodeId);
  }

  setDropTargetNode(targetNode: TreeNode | undefined) {
    this.dropTargetNode = targetNode;
  }

  getDropTargetNode() {
    return this.dropTargetNode;
  }

  getDraggedNode() {
    return this.draggedNode;
  }

  isDragAllowedAtTarget(target: TreeNode) {
    if (TreeNodeUtils.isFirstDirectChildOfSecond(this.draggedNode!, target)) {
      return false;
    }
    if (this.draggedNode?.type === NodeType.File) {
      return true;
    } else {
      return !TreeNodeUtils.isFirstChildOfSecondOrSame(
        target,
        this.draggedNode!
      );
    }
  }
}

const dragService = new NodeDragService();

export { NodeDragService, dragService };
