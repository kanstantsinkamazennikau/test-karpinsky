import { axiosInstance } from "..";
import { API_TREE_NAME } from "../../constants";
import { API_ENDPOINTS } from "../endpoints";

export type UserTreeNode = {
  id: number;
  name: string;
  children: UserTreeNode[] | [];
};

export const getUserTree = async (): Promise<UserTreeNode> => {
  const { data } = await axiosInstance.post(API_ENDPOINTS.USER_TREE_GET, null, {
    params: { treeName: API_TREE_NAME },
  });
  return data;
};
