import { axiosInstance } from "..";
import { API_TREE_NAME } from "../../constants";
import { API_ENDPOINTS } from "../endpoints";

export const createUserTreeNode = async (
  parentNodeId: number,
  nodeName: string
): Promise<void> => {
  await axiosInstance.post(API_ENDPOINTS.USER_TREE_NODE_CREATE, null, {
    params: {
      treeName: API_TREE_NAME,
      parentNodeId,
      nodeName,
    },
  });
};

export const updateUserTreeNode = async (
  nodeId: number,
  newNodeName: string
): Promise<void> => {
  await axiosInstance.post(API_ENDPOINTS.USER_TREE_NODE_RENAME, null, {
    params: {
      treeName: API_TREE_NAME,
      nodeId,
      newNodeName,
    },
  });
};

export const deleteUserTreeNode = async (nodeId: number): Promise<void> => {
  await axiosInstance.post(API_ENDPOINTS.USER_TREE_NODE_DELETE, null, {
    params: { treeName: API_TREE_NAME, nodeId },
  });
};
