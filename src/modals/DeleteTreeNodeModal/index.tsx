import { Button, Typography } from "@mui/material";
import { isAxiosError } from "axios";
import { useActionState, useContext } from "react";
import { toast } from "react-toastify";
import { Modal } from "..";
import { ApiError } from "../../api";
import { getUserTree } from "../../api/userTree";
import { deleteUserTreeNode } from "../../api/userTreeNode";
import {
  CANCEL,
  COMPLETED,
  DELETE,
  DELETE_CONFIRMATION,
} from "../../constants";
import { ModalsStateContext } from "../../context/modalsStateContext";
import { UserTreeNodesContext } from "../../context/userTreeNodesContext";

export const DeleteTreeNodeModal = () => {
  const {
    modalsIsOpenStates: { isDeleteNodeModalOpen },
    setModalsIsOpenStates,
  } = useContext(ModalsStateContext);
  const { selectedNode, setUserTreeNodes } = useContext(UserTreeNodesContext);

  const handleClose = () => {
    setModalsIsOpenStates((prevState) => ({
      ...prevState,
      isDeleteNodeModalOpen: false,
    }));
  };

  const onSubmit = async () => {
    try {
      await deleteUserTreeNode(selectedNode!.id);
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

  const modalBody = <Typography>{DELETE_CONFIRMATION}</Typography>;
  const modalFooter = (
    <>
      <Button variant="outlined" onClick={handleClose}>
        {CANCEL}
      </Button>
      <Button variant="outlined" color="error" type="submit">
        {DELETE}
      </Button>
    </>
  );

  return (
    <Modal
      title={DELETE}
      body={modalBody}
      footer={modalFooter}
      onClose={handleClose}
      isOpen={isDeleteNodeModalOpen}
      errorText={actionResult?.error}
      isActionPending={isPending}
      formAction={formAction}
    />
  );
};
