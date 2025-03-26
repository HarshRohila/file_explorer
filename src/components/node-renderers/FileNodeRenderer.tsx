import { NodeRendererProps } from "../../types";
import { createDraggablePropsForNodeRenderer } from "../../utils";

function FileNodeRenderer(props: NodeRendererProps) {
  return (
    <div {...createDraggablePropsForNodeRenderer(props)}>
      📄 <span>{props.node.name}</span>
    </div>
  );
}

export { FileNodeRenderer };
