import { Button, TextField } from "@mui/material";
import { useActionState, useContext, useState } from "react";
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
    modalsIsOpenStates: { isEditNodeModalOpen },
    setModalsIsOpenStates,
  } = useContext(ModalsStateContext);
  const { selectedNode, setUserTreeNodes } = useContext(UserTreeNodesContext);

  const [newNodeName, setNewNodeName] = useState(selectedNode?.name);

  const handleClose = () => {
    setModalsIsOpenStates((prevState) => ({
      ...prevState,
      isEditNodeModalOpen: false,
    }));
  };

  const onSubmit = async () => {
    try {
      await updateUserTreeNode(selectedNode!.id, newNodeName!);
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
      <Button variant="contained" type="submit">
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
      errorText={actionResult?.error}
      formAction={formAction}
      isActionPending={isPending}
    />
  );
};
