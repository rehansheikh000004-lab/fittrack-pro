import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const saved = localStorage.getItem("ft_user");
  const [user, setUser] = useState(saved ? JSON.parse(saved) : null);

  const login = (user) => {
    localStorage.setItem("ft_user", JSON.stringify(user));
    setUser(user);
  };

  const logout = () => {
    localStorage.removeItem("ft_user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
