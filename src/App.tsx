import { useState } from "react";
import "./App.css";
import {
  ExplorerEvent,
  FileExplorer,
  NodeType,
  TreeNode,
} from "./assets/FileExplorer";
import { newId } from "./utils/newId";

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

const data: TreeNode = {
  id: "root",
  name: "Root",
  level: 1,
  isEditMode: false,
  children: [
    createNode({ name: "harsh" }),
    createNode({ name: "rohila" }),
    createNode({
      name: "cool-folder",
      type: NodeType.Folder,
      children: [
        createNode({
          name: "some-file",
        }),
        createNode({ name: "jaagriti", type: NodeType.Folder }),
      ],
    }),
  ],
  type: NodeType.Folder,
};

function App() {
  const [explorerData, setExplorerData] = useState(data);

  const handleEvent = (event: ExplorerEvent) => {};

  console.log(explorerData);

  return (
    <>
      <FileExplorer onEvent={handleEvent} root={explorerData} />
    </>
  );
}

export default App;
