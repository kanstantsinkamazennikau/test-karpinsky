import { Button, Typography } from "@mui/material";
import { isAxiosError } from "axios";
import { useContext, useState } from "react";
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
    isDeleteNodeModalOpen,
    setIsDeleteNodeModalOpen,
    setIsModalActionLoading,
  } = useContext(ModalsStateContext);

  const { selectedNode, setUserTreeNodes } = useContext(UserTreeNodesContext);

  const [errorText, setErrorText] = useState("");

  const handleClose = () => {
    setIsDeleteNodeModalOpen(false);
  };

  const onSubmit = async () => {
    try {
      setIsModalActionLoading(true);
      await deleteUserTreeNode(selectedNode!.id);
      const treeNodes = await getUserTree();
      setUserTreeNodes(treeNodes);
      setIsDeleteNodeModalOpen(false);
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

  const modalBody = <Typography>{DELETE_CONFIRMATION}</Typography>;
  const modalFooter = (
    <>
      <Button variant="outlined" onClick={handleClose}>
        {CANCEL}
      </Button>
      <Button variant="outlined" color="error" onClick={onSubmit}>
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
      erorrText={errorText}
    />
  );
};
