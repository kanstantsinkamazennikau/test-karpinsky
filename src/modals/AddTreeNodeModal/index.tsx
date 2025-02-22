import { Button, TextField } from "@mui/material";
import { isAxiosError } from "axios";
import { useActionState, useContext, useState } from "react";
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
  const {
    modalsIsOpenStates: { isAddNodeModalOpen },
    setModalsIsOpenStates,
  } = useContext(ModalsStateContext);
  const { selectedNode, setUserTreeNodes } = useContext(UserTreeNodesContext);

  const handleNodeNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNodeName(e.target.value);
  };

  const handleClose = () => {
    setModalsIsOpenStates((prevState) => ({
      ...prevState,
      isAddNodeModalOpen: false,
    }));
  };

  const onSubmit = async () => {
    try {
      await createUserTreeNode(selectedNode!.id, nodeName);
      const treeNodes = await getUserTree();
      setUserTreeNodes(treeNodes);
      handleClose();
      toast.success(COMPLETED);
      return { error: null };
    } catch (error) {
      if (isAxiosError<ApiError>(error)) {
        toast.error(error.response?.data.data.message);
        return { error: error.response?.data.data.message };
      }
    }
  };

  const [actionResult, formAction, isPending] = useActionState(onSubmit, {
    error: null,
  });

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
      <Button variant="contained" type="submit">
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
      errorText={actionResult?.error}
      formAction={formAction}
      isActionPending={isPending}
    />
  );
};
