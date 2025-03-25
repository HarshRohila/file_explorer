import { useState } from "react";

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

interface FileExplorerProps {
  root: TreeNode;
  onEvent: (event: ExplorerEvent) => void;
}

function FileExplorer(props: FileExplorerProps) {
  const Renderer = getRenderer(props.root);

  return (
    <>
      <Renderer node={props.root} onEvent={props.onEvent} />
      {props.root.children.map((c) => {
        c.level = props.root.level + 1;
        return <FileExplorer key={c.id} onEvent={props.onEvent} root={c} />;
      })}
    </>
  );
}

function getRenderer(node: TreeNode) {
  if (node.type === NodeType.Folder) {
    return FolderRenderer;
  } else {
    return FileRenderer;
  }
}

interface RendererProps {
  node: TreeNode;
  onEvent: (ev: ExplorerEvent) => void;
}

function FileRenderer(props: RendererProps) {
  return (
    <div style={{ paddingLeft: getPaddingOfNode(props.node) }}>
      📄 <span>{props.node.name}</span>
    </div>
  );
}

function FolderRenderer(props: RendererProps) {
  const handleAddFile = () => {
    const ev = createEvent("addFile", props.node);
    props.onEvent(ev);
  };

  return (
    <div
      data-level={props.node.level}
      style={{ paddingLeft: getPaddingOfNode(props.node) }}
    >
      📁 {props.node.name}
      <span className="actions">
        <button onClick={handleAddFile}>Add File</button>
        <button>Add Folder</button>
      </span>
    </div>
  );
}

function getPaddingOfNode(node: TreeNode) {
  return node.level * 20 + "px";
}

function createEvent(type: string, data: unknown) {
  return {
    type,
    data,
  };
}

export { FileExplorer, NodeType };
export type { TreeNode, ExplorerEvent };
