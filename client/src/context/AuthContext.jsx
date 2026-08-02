import { createContext, useContext, useState, useEffect } from "react";
import { authApi } from "../api/authApi";

const AuthContext = createContext();

const ENTERPRISE_PRESEEDED_REGISTRY = {
  "saumya@admin.com": { name: "Saumya", role: "ADMIN" },
  "admin@insurepulse.com": { name: "Saumya Admin", role: "ADMIN" },
  "sonam@agent.com": { name: "Sonam", role: "AGENT" },
  "agent@insurepulse.com": { name: "Sonam Agent", role: "AGENT" },
  "naira@gmail.com": { name: "Naira", role: "CUSTOMER" },
  "customer@insurepulse.com": { name: "Naira Customer", role: "CUSTOMER" },
  "david.vance@company.com": { name: "David Vance", role: "CUSTOMER" },
  "claims@apexlogistics.com": { name: "Apex Logistics Corp", role: "CUSTOMER" },
  "m.aurelius@rome.org": { name: "Marcus Aurelius", role: "CUSTOMER" },
  "sarah.j@acme.org": { name: "Sarah Jenkins", role: "AGENT" },
  "m.sterling@gmail.com": { name: "Michael Sterling", role: "AGENT" },
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem("user");
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });

  const [token, setToken] = useState(() => localStorage.getItem("token") || null);
  const [userRegistry, setUserRegistry] = useState(() => {
    try {
      const saved = localStorage.getItem("carrier_user_registry");
      return saved ? { ...ENTERPRISE_PRESEEDED_REGISTRY, ...JSON.parse(saved) } : ENTERPRISE_PRESEEDED_REGISTRY;
    } catch {
      return ENTERPRISE_PRESEEDED_REGISTRY;
    }
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (token && user) {
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
  }, [token, user]);

  useEffect(() => {
    localStorage.setItem("carrier_user_registry", JSON.stringify(userRegistry));
  }, [userRegistry]);

  const login = async (email, password, requestedRole) => {
    setLoading(true);
    const cleanEmail = (email || "").toLowerCase().trim();
    const cleanRequestedRole = (requestedRole || "ADMIN").toUpperCase().trim();

    // 1. Try calling Backend REST Authentication API
    try {
      const res = await authApi.login({ email: cleanEmail, password, role: cleanRequestedRole });
      const userData = res?.user || res?.data?.user;
      const userToken = res?.token || res?.data?.token || "bearer-token-12345";

      if (userData) {
        setToken(userToken);
        setUser(userData);
        setLoading(false);
        return { success: true, user: userData, token: userToken };
      }
    } catch (apiErr) {
      const errMsg = apiErr?.response?.data?.message || apiErr?.message;
      if (errMsg && errMsg.includes("Access Denied")) {
        setLoading(false);
        throw new Error(errMsg);
      }
    }

    // 2. Strict Role-Based Access Control (RBAC) Verification
    const registeredAccount = userRegistry[cleanEmail];

    if (registeredAccount) {
      const registeredRole = registeredAccount.role.toUpperCase();
      if (registeredRole !== cleanRequestedRole) {
        setLoading(false);
        throw new Error(
          `Access Denied: ${cleanEmail} is registered as a ${registeredRole} and cannot sign in to the ${cleanRequestedRole} portal. Please select the ${registeredRole} portal.`
        );
      }
    } else {
      // Record new user email in registry with requested role
      setUserRegistry((prev) => ({
        ...prev,
        [cleanEmail]: {
          name: cleanEmail.split("@")[0].replace(".", " ").toUpperCase(),
          role: cleanRequestedRole,
        },
      }));
    }

    const assignedName = registeredAccount?.name || cleanEmail.split("@")[0].replace(".", " ").toUpperCase();
    const fallbackUser = {
      id: Math.floor(Math.random() * 1000) + 1,
      name: assignedName,
      email: cleanEmail,
      role: registeredAccount ? registeredAccount.role : cleanRequestedRole,
    };
    const fallbackToken = `mock-token-${Date.now()}`;

    setToken(fallbackToken);
    setUser(fallbackUser);
    setLoading(false);
    return { success: true, user: fallbackUser, token: fallbackToken };
  };

  const register = async (userData) => {
    setLoading(true);
    const cleanEmail = (userData.email || "").toLowerCase().trim();
    const cleanRole = (userData.role || "ADMIN").toUpperCase().trim();

    // Check if email already registered with a different role
    const existing = userRegistry[cleanEmail];
    if (existing && existing.role.toUpperCase() !== cleanRole) {
      setLoading(false);
      throw new Error(
        `Email ${cleanEmail} is already registered as a ${existing.role}. An email cannot be registered under multiple roles.`
      );
    }

    // Save to user registry
    setUserRegistry((prev) => ({
      ...prev,
      [cleanEmail]: {
        name: userData.name,
        role: cleanRole,
      },
    }));

    try {
      const res = await authApi.register({ ...userData, email: cleanEmail, role: cleanRole });
      const newUser = res?.user || {
        id: Date.now(),
        name: userData.name,
        email: cleanEmail,
        role: cleanRole,
      };
      const newToken = res?.token || `mock-token-${Date.now()}`;

      setToken(newToken);
      setUser(newUser);
      return { success: true, user: newUser };
    } catch (err) {
      const fallbackUser = {
        id: Date.now(),
        name: userData.name,
        email: cleanEmail,
        role: cleanRole,
      };
      const fallbackToken = `mock-token-${Date.now()}`;
      setToken(fallbackToken);
      setUser(fallbackUser);
      return { success: true, user: fallbackUser };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        register,
        logout,
        isAuthenticated: !!token && !!user,
        isAdmin: (user?.role || "").toUpperCase() === "ADMIN",
        isAgent: (user?.role || "").toUpperCase() === "AGENT",
        isCustomer: (user?.role || "").toUpperCase() === "CUSTOMER",
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
