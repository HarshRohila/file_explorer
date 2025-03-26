import { useState } from "react";
import "./App.css";
import {
  ExplorerEvent,
  FileExplorer,
  NodeMoveEventData,
} from "./components/FileExplorer";
import { TreeNodeUtils } from "./utils/TreeNodeUtils";
import { ExplorerEvents, NodeType, TreeNode } from "./types";
import { createNode } from "./utils";

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

  const treeNodeUtils = new TreeNodeUtils(explorerData);

  const handleEvent = (event: ExplorerEvent) => {
    if (event.type === ExplorerEvents.NodeMove) {
      const eventData = event.data as NodeMoveEventData;
      const newRoot = treeNodeUtils.moveNodeToTarget(
        eventData.nodeId,
        eventData.targetNodeId
      );
      setExplorerData(newRoot);
    } else if (event.type === ExplorerEvents.NodeChange) {
      const newRoot = treeNodeUtils.upsertNode(event.data as TreeNode);
      setExplorerData(newRoot);
    }
  };

  console.log(explorerData);

  return (
    <>
      <FileExplorer onEvent={handleEvent} root={explorerData} />
    </>
  );
}

export default App;
