import { createNode } from ".";
import { NewFileFormData } from "../components/NewFIleForm";
import { NewFolderFormData } from "../components/NewFolderForm";
import { NodeType, TreeNode } from "../types";

class TreeNodeUtils {
  constructor(private rootNode: TreeNode) {}

  moveNodeToTarget(nodeId: string, targetId: string) {
    const removedNode = this.removeNodeById(nodeId);
    const targetNode = this.findNodeById(targetId);

    targetNode!.children.push(removedNode);

    return { ...this.rootNode };
  }

  upsertNode(newNode: TreeNode) {
    const upsert = (newNode: TreeNode, parent: TreeNode) => {
      if (parent.id === newNode.id) {
        Object.assign(parent, newNode);
        return;
      }

      for (const child of parent.children) {
        upsert(newNode, child);
      }
    };

    upsert(newNode, this.rootNode);

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

  addNewFile(newFileFormData: NewFileFormData): TreeNode {
    const root = this.rootNode;

    const newNode = createNode({
      name: newFileFormData.fileName,
      type: NodeType.File,
      level: root.level + 1,
    });
    return {
      ...root,
      children: [newNode, ...root.children],
    };
  }

  addNewFolder(newFileFormData: NewFolderFormData): TreeNode {
    const root = this.rootNode;

    const newNode = createNode({
      name: newFileFormData.folderName,
      type: NodeType.Folder,
      level: root.level + 1,
    });
    return {
      ...root,
      children: [newNode, ...root.children],
    };
  }
}

export { TreeNodeUtils };
