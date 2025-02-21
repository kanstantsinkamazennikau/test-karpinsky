import { createContext, useState } from "react";

export type ModalsStateContextParams = {
  isAddNodeModalOpen: boolean;
  setIsAddNodeModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isEditNodeModalOpen: boolean;
  setIsEditNodeModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isDeleteNodeModalOpen: boolean;
  setIsDeleteNodeModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isModalActionLoading: boolean;
  setIsModalActionLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

export const ModalsStateContext = createContext<ModalsStateContextParams>(
  null!
);

interface ModalsStateContextProviderProps {
  children: React.ReactNode;
}

export const ModalsStateContextProvider: React.FC<
  ModalsStateContextProviderProps
> = ({ children }) => {
  const [isAddNodeModalOpen, setIsAddNodeModalOpen] = useState<boolean>(false);
  const [isEditNodeModalOpen, setIsEditNodeModalOpen] =
    useState<boolean>(false);
  const [isDeleteNodeModalOpen, setIsDeleteNodeModalOpen] =
    useState<boolean>(false);
  const [isModalActionLoading, setIsModalActionLoading] =
    useState<boolean>(false);

  return (
    <ModalsStateContext.Provider
      value={{
        isAddNodeModalOpen,
        setIsAddNodeModalOpen,
        isEditNodeModalOpen,
        setIsEditNodeModalOpen,
        isDeleteNodeModalOpen,
        setIsDeleteNodeModalOpen,
        isModalActionLoading,
        setIsModalActionLoading,
      }}
    >
      {children}
    </ModalsStateContext.Provider>
  );
};
