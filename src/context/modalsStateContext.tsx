import { createContext, useState } from "react";

export type ModalsStateContextParams = {
  modalsIsOpenStates: {
    isEditNodeModalOpen: boolean;
    isAddNodeModalOpen: boolean;
    isDeleteNodeModalOpen: boolean;
  };
  setModalsIsOpenStates: React.Dispatch<
    React.SetStateAction<{
      isEditNodeModalOpen: boolean;
      isAddNodeModalOpen: boolean;
      isDeleteNodeModalOpen: boolean;
    }>
  >;
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
  const [modalsIsOpenStates, setModalsIsOpenStates] = useState({
    isEditNodeModalOpen: false,
    isAddNodeModalOpen: false,
    isDeleteNodeModalOpen: false,
  });

  return (
    <ModalsStateContext.Provider
      value={{
        modalsIsOpenStates,
        setModalsIsOpenStates,
      }}
    >
      {children}
    </ModalsStateContext.Provider>
  );
};
