import { NodeType, TreeNode } from "../../types";
import { FileNodeRenderer } from "./FileNodeRenderer";
import { FolderNodeRenderer } from "./FolderNodeRenderer";

function getNodeRenderer(node: TreeNode) {
  if (node.type === NodeType.Folder) {
    return FolderNodeRenderer;
  } else {
    return FileNodeRenderer;
  }
}
export { getNodeRenderer };
