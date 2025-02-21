import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import { Button } from "@mui/material";
import { useContext } from "react";
import { ModalsStateContext } from "../../context/modalsStateContext";

type ListItemControlButtonsProps = {
  isRootNode: boolean;
};

export const ListItemControlButtons: React.FC<ListItemControlButtonsProps> = ({
  isRootNode,
}) => {
  const {
    setIsAddNodeModalOpen,
    setIsEditNodeModalOpen,
    setIsDeleteNodeModalOpen,
  } = useContext(ModalsStateContext);

  const handleStopPropagation = (e: React.MouseEvent<HTMLElement>) =>
    e.stopPropagation();

  const handleAddNodeClick = () => {
    setIsAddNodeModalOpen(true);
  };

  const handleEditNodeClick = () => {
    setIsEditNodeModalOpen(true);
  };

  const handleDeleteNodeClick = () => {
    setIsDeleteNodeModalOpen(true);
  };

  return (
    <div onClick={handleStopPropagation} className="tree-node__list-item-buttons">
      <Button
        className="
          tree-node__list-item-buttons__button
          tree-node__list-item-buttons__button_blue
        "
        onClick={handleAddNodeClick}
      >
        <AddCircleIcon />
      </Button>
      {!isRootNode && (
        <>
          <Button
            className="
              tree-node__list-item-buttons__button
              tree-node__list-item-buttons__button_blue
            "
            onClick={handleEditNodeClick}
          >
            <EditIcon />
          </Button>
          <Button
            className="
              tree-node__list-item-buttons__button
              tree-node__list-item-buttons__button_red
            "
            onClick={handleDeleteNodeClick}
          >
            <DeleteForeverIcon />
          </Button>
        </>
      )}
    </div>
  );
};
