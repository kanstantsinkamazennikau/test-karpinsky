import { createContext, useState } from "react";
import { UserTreeNode } from "../api/userTree";

type SelectedNode = {
  id: number;
  name: string;
};

export type UserTreeNodesContextParams = {
  userTreeNodes: UserTreeNode | undefined;
  setUserTreeNodes: React.Dispatch<
    React.SetStateAction<UserTreeNode | undefined>
  >;
  selectedNode?: SelectedNode;
  setSelectedNode: React.Dispatch<
    React.SetStateAction<SelectedNode | undefined>
  >;
};

export const UserTreeNodesContext = createContext<UserTreeNodesContextParams>(
  null!
);

interface UserTreeNodesContextProviderProps {
  children: React.ReactNode;
}

export const UserTreeNodesContextProvider: React.FC<
  UserTreeNodesContextProviderProps
> = ({ children }) => {
  const [userTreeNodes, setUserTreeNodes] = useState<UserTreeNode>();
  const [selectedNode, setSelectedNode] = useState<SelectedNode | undefined>();

  return (
    <UserTreeNodesContext.Provider
      value={{
        userTreeNodes,
        setUserTreeNodes,
        selectedNode,
        setSelectedNode,
      }}
    >
      {children}
    </UserTreeNodesContext.Provider>
  );
};
