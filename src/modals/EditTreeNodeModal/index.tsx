import { Button, TextField } from "@mui/material";
import { useContext, useState } from "react";
import { Modal } from "..";
import { getUserTree } from "../../api/userTree";
import { updateUserTreeNode } from "../../api/userTreeNode";
import { CANCEL, COMPLETED, NEW_NODE_NAME, RENAME } from "../../constants";
import { ModalsStateContext } from "../../context/modalsStateContext";
import { UserTreeNodesContext } from "../../context/userTreeNodesContext";
import { toast } from "react-toastify";
import { isAxiosError } from "axios";
import { ApiError } from "../../api";

export const EditTreeNodeModal = () => {
  const {
    isEditNodeModalOpen,
    setIsEditNodeModalOpen,
    setIsModalActionLoading,
  } = useContext(ModalsStateContext);

  const { selectedNode, setUserTreeNodes } = useContext(UserTreeNodesContext);

  const [errorText, setErrorText] = useState("");
  const [newNodeName, setNewNodeName] = useState(selectedNode?.name);

  const onSubmit = async () => {
    try {
      setIsModalActionLoading(true);
      await updateUserTreeNode(selectedNode!.id, newNodeName!);
      const treeNodes = await getUserTree();
      setUserTreeNodes(treeNodes);
      setIsEditNodeModalOpen(false);
      toast.success(COMPLETED);
    } catch (error) {
      if (isAxiosError<ApiError>(error)) {
        setErrorText(error.response?.data.data.message!);
        toast.error(error.response?.data.data.message);
      }
    } finally {
      setIsModalActionLoading(false);
    }
  };

  const handleClose = () => {
    setIsEditNodeModalOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewNodeName(e.target.value);
  };

  const modalBody = (
    <TextField
      label={NEW_NODE_NAME}
      variant="outlined"
      fullWidth
      onChange={handleInputChange}
      value={newNodeName}
    />
  );

  const modalFooter = (
    <>
      <Button variant="outlined" onClick={handleClose}>
        {CANCEL}
      </Button>
      <Button variant="contained" onClick={onSubmit}>
        {RENAME}
      </Button>
    </>
  );

  return (
    <Modal
      title={RENAME}
      body={modalBody}
      footer={modalFooter}
      onClose={handleClose}
      isOpen={isEditNodeModalOpen}
      erorrText={errorText}
    />
  );
};
