import { Button, TextField } from "@mui/material";
import { isAxiosError } from "axios";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { Modal } from "..";
import { ApiError } from "../../api";
import { getUserTree } from "../../api/userTree";
import { createUserTreeNode } from "../../api/userTreeNode";
import { ADD, CANCEL, COMPLETED, NODE_NAME } from "../../constants";
import { ModalsStateContext } from "../../context/modalsStateContext";
import { UserTreeNodesContext } from "../../context/userTreeNodesContext";

export const AddTreeNodeModal = () => {
  const [nodeName, setNodeName] = useState("");
  const [errorText, setErrorText] = useState("");
  const { isAddNodeModalOpen, setIsAddNodeModalOpen, setIsModalActionLoading } =
    useContext(ModalsStateContext);
  const { selectedNode, setUserTreeNodes } = useContext(UserTreeNodesContext);

  const handleNodeNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNodeName(e.target.value);
  };

  const handleClose = () => {
    setIsAddNodeModalOpen(false);
  };

  const onSubmit = async () => {
    try {
      setIsModalActionLoading(true);
      await createUserTreeNode(selectedNode!.id, nodeName);
      const treeNodes = await getUserTree();
      setUserTreeNodes(treeNodes);
      setIsAddNodeModalOpen(false);
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

  const modalBody = (
    <TextField
      label={NODE_NAME}
      variant="outlined"
      fullWidth
      onChange={handleNodeNameChange}
      value={nodeName}
    />
  );

  const modalFooter = (
    <>
      <Button variant="outlined" onClick={handleClose}>
        {CANCEL}
      </Button>
      <Button variant="contained" onClick={onSubmit}>
        {ADD}
      </Button>
    </>
  );

  return (
    <Modal
      title={ADD}
      body={modalBody}
      footer={modalFooter}
      onClose={handleClose}
      isOpen={isAddNodeModalOpen}
      erorrText={errorText}
    />
  );
};
