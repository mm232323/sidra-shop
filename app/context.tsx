"use client";
import { GetUser } from "@/util/auth-apis";
import { useSession } from "next-auth/react";
import {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";

type AppContextType = {
  isAuthed: boolean;
  cart: number;
  handleCart: (state: string, quant?: number) => void;
  emptyCart: () => void;
  messages: number;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState(null);
  const { data: session } = useSession();
  const [cart, setCart] = useState<number>(user ? user.cart.length : 0);
  useEffect(() => {
    if (session?.user) {
      const fetchUser = async () => {
        setUser(await GetUser(session?.user?.email, true));
      };
      fetchUser();
    }
  }, [session?.user]);
  const isAuthed = user !== null;

  const emptyCart = () => {
    setCart(0);
  };

  const handleCart = (state: string, quant?: number) => {
    if (quant) {
        setCart((prevCount) => (state == "inc" ? prevCount + quant : prevCount - quant));
    } else {
        setCart((prevCount) => (state == "inc" ? prevCount + 1 : prevCount - 1));
    }
  };

  return (
    <AppContext.Provider
      value={{
        cart,
        handleCart,
        emptyCart,
        isAuthed,
        messages: user ? user.messages.length : 0,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
}
