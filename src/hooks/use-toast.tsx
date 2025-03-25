
import * as React from "react";
import { toast as sonnerToast } from "sonner";

// Define our toast props
export interface ToasterToast {
  id: string;
  title?: string;
  description?: string;
  action?: React.ReactNode;
  variant?: "default" | "destructive";
}

// Define our toast settings
export const toastSettings = {
  duration: 5000,
  success: {
    duration: 3000,
  },
  error: {
    duration: 5000,
  },
};

// Define our toast props
export interface ToastProps {
  title?: string;
  description?: string;
  action?: React.ReactNode;
  variant?: "default" | "destructive";
}

const TOAST_LIMIT = 5;

// Create a context to store the toast state
type ToastContextType = {
  toasts: ToasterToast[];
  toast: (props: ToastProps) => string;
  update: (id: string, props: ToastProps) => void;
  dismiss: (id: string) => void;
};

const ToastContext = React.createContext<ToastContextType | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<ToasterToast[]>([]);

  const toast = React.useCallback((props: ToastProps) => {
    const { title, description, variant = "default", ...rest } = props;
    const id = crypto.randomUUID();

    setToasts((currentToasts) => {
      const newToast: ToasterToast = {
        id,
        title,
        description,
        variant,
        ...rest,
      };
      return [newToast, ...currentToasts].slice(0, TOAST_LIMIT);
    });

    // Also trigger sonner toast for the actual display
    if (variant === "destructive") {
      sonnerToast.error(title || "", {
        description,
        duration: toastSettings.error.duration,
      });
    } else {
      sonnerToast(title || "", {
        description,
        duration: toastSettings.duration,
      });
    }

    return id;
  }, []);

  const update = React.useCallback((id: string, props: ToastProps) => {
    setToasts((currentToasts) =>
      currentToasts.map((t) => (t.id === id ? { ...t, ...props } : t))
    );
  }, []);

  const dismiss = React.useCallback((id: string) => {
    setToasts((currentToasts) => currentToasts.filter((t) => t.id !== id));
  }, []);

  const value = React.useMemo(
    () => ({
      toasts,
      toast,
      update,
      dismiss,
    }),
    [toasts, toast, update, dismiss]
  );

  return <ToastContext.Provider value={value}>{children}</ToastContext.Provider>;
}

export function useToast() {
  const context = React.useContext(ToastContext);
  
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  
  return context;
}

// Export the original sonner toast function directly for advanced use cases
export { sonnerToast as toast };
