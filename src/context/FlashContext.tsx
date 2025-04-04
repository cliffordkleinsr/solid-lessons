import { Component, createContext, JSX, useContext } from "solid-js";
import { createStore, SetStoreFunction } from "solid-js/store";
type FlashMessage = {
  message: string;
  type: string;
};

export type FlashContextType = {
  flash: FlashMessage;
  setFlash: SetStoreFunction<FlashMessage>;
};
export  const FlashContext = createContext<FlashContextType>()

export const FlashContextProvider: Component<{children: JSX.Element}> = (props) => {
  const [flash, setFlash] = createStore<FlashMessage>({
    message: 'Hello',
    type: 'info'
  })
  return (
    <FlashContext.Provider value={{flash, setFlash}}>
        {props.children}
    </FlashContext.Provider>
  );
};

export function useFlashContext() {
  const flash = useContext(FlashContext)
  if (!flash) return
    return flash;
}