import { TreeNode } from "../components/FileExplorer";

class TreeNodeUtils {
  constructor(private rootNode: TreeNode) {}

  moveNodeToTarget(nodeId: string, targetId: string) {
    const removedNode = this.removeNodeById(nodeId);
    const targetNode = this.findNodeById(targetId);

    targetNode!.children.push(removedNode);

    return { ...this.rootNode };
  }

  findNodeById(nodeId: string): TreeNode | undefined {
    const findNode = (
      nodeId: string,
      parent: TreeNode
    ): TreeNode | undefined => {
      if (parent.id === nodeId) {
        return parent;
      }

      for (const child of parent.children) {
        const found = findNode(nodeId, child);
        if (found) {
          return found;
        }
      }
    };

    return findNode(nodeId, this.rootNode);
  }

  private removeNodeById(nodeId: string): TreeNode {
    if (this.rootNode.id === nodeId) {
      throw new Error("Cannot remove root node");
    }

    const removeNode = (nodeId: string, parent: TreeNode): TreeNode => {
      const removedNode = parent.children.find((n) => n.id === nodeId)!;
      parent.children = parent.children.filter((n) => n.id !== nodeId);
      return removedNode;
    };

    const parent = this.findParentNode(nodeId);
    if (!parent) {
      throw new Error("Node not found");
    }

    return removeNode(nodeId, parent);
  }

  private findParentNode(nodeId: string): TreeNode | undefined {
    const findParent = (
      nodeId: string,
      parent: TreeNode
    ): TreeNode | undefined => {
      if (parent.children.some((n) => n.id === nodeId)) {
        return parent;
      }

      for (const child of parent.children) {
        const found = findParent(nodeId, child);
        if (found) {
          return found;
        }
      }
    };

    return findParent(nodeId, this.rootNode);
  }
}

export { TreeNodeUtils };
