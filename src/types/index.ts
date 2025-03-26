enum NodeType {
  Folder = "Folder",
  File = "File",
}

interface TreeNode {
  id: string;
  name: string;
  type: NodeType;
  level: number;
  isEditMode: boolean;
  children: TreeNode[];
}

interface ExplorerEvent {
  type: string;
  data: unknown;
}

interface NodeRendererProps {
  node: TreeNode;
  onEvent: (ev: ExplorerEvent) => void;
}

enum ExplorerEvents {
  NodeMove = "NodeMove",
}

export { NodeType, ExplorerEvents };
export type { TreeNode, ExplorerEvent, NodeRendererProps };
