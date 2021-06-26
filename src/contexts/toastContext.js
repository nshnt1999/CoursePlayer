import React, { createContext, useContext } from "react";
import { ToastContainer, toast } from 'react-toastify';

const ToastContext = createContext();

export function ToastProvider({children}) {

    return(
        <ToastContext.Provider value={{ ToastContainer, toast }}>
            {children}
        </ToastContext.Provider>
    );
}

export function useToast() {
    return useContext(ToastContext);
  }
  