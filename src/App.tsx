import { isAxiosError } from "axios";
import { useContext, useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { ApiError } from "./api";
import { getUserTree } from "./api/userTree";
import { ListItem } from "./components/ListItem";
import { UserTreeNodesContext } from "./context/userTreeNodesContext";
import { AddTreeNodeModal } from "./modals/AddTreeNodeModal";
import { DeleteTreeNodeModal } from "./modals/DeleteTreeNodeModal";
import { EditTreeNodeModal } from "./modals/EditTreeNodeModal";
import { ModalsStateContext } from "./context/modalsStateContext";
import { Spinner } from "./components/Spinner";

function App() {
  const { userTreeNodes, setUserTreeNodes } = useContext(UserTreeNodesContext);
  const {
    modalsIsOpenStates: {
      isAddNodeModalOpen,
      isDeleteNodeModalOpen,
      isEditNodeModalOpen,
    },
  } = useContext(ModalsStateContext);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getUserTreeData = async () => {
      try {
        const treeNodes = await getUserTree();
        setUserTreeNodes(treeNodes);
      } catch (error) {
        if (isAxiosError<ApiError>(error)) {
          toast.error(error.response?.data.data.message);
        }
      } finally {
        setIsLoading(false);
      }
    };
    getUserTreeData();
  }, [setUserTreeNodes]);

  return isLoading ? (
    <Spinner />
  ) : (
    <>
      <ToastContainer />
      {userTreeNodes && <ListItem listItem={userTreeNodes} />}
      {isAddNodeModalOpen && <AddTreeNodeModal />}
      {isEditNodeModalOpen && <EditTreeNodeModal />}
      {isDeleteNodeModalOpen && <DeleteTreeNodeModal />}
    </>
  );
}

export default App;
