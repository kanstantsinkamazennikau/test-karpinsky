import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Typography } from "@mui/material";
import { useContext, useState } from "react";
import { UserTreeNodesContext } from "../../context/userTreeNodesContext";
import { List } from "../List";
import { ListItemControlButtons } from "./LIstItemControlButtons";
import "./style.scss";
import { ROOT } from "../../constants";
import { UserTreeNode } from "../../api/userTree";

type ListItemProps = {
  listItem: UserTreeNode;
};

export const ListItem: React.FC<ListItemProps> = ({ listItem }) => {
  const { id, name, children } = listItem;

  const { selectedNode, setSelectedNode, userTreeNodes } =
    useContext(UserTreeNodesContext);

  const [isCollapsed, setIsCollapsed] = useState<boolean>(true);

  const isParentNode = !!children.length;
  const isSelectedNode = selectedNode?.id === id;
  const isRootNode = userTreeNodes?.id === id;

  const handleIsCollapsed = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleActiveNode = () => {
    setSelectedNode({ id, name });
  };

  const handleListItemClick = () => {
    handleIsCollapsed();
    handleActiveNode();
  };

  return (
    <>
      <div
        className={`tree-node__list-item
          ${isSelectedNode ? "tree-node__list-item_selected" : ""}`}
        onClick={handleListItemClick}
      >
        {isParentNode && (
          <ChevronRightIcon
            className={`tree-node__list-item__chevron
              ${
                !isCollapsed
                  ? "tree-node__list-item__chevron_rotated"
                  : "tree-node__list-item__chevron_regular"
              }`}
          />
        )}
        <Typography
          className={
            !isParentNode
              ? "tree-node__list-item__label_margin"
              : "tree-node__list-item__label_regular"
          }
        >
          {isRootNode ? ROOT : name}
        </Typography>

        {isSelectedNode && <ListItemControlButtons isRootNode={isRootNode} />}
      </div>

      {!isCollapsed && isParentNode && <List list={children} />}
    </>
  );
};
