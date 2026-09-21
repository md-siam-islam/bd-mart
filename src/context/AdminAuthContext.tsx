// Admin Authentication Context
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AdminUser } from '../types';
import { AdminAuthService } from '../services/adminAuthService';
import { useToast } from './ToastContext';

interface AdminAuthContextType {
  admin: AdminUser | null;
  isAdminAuthenticated: boolean;
  adminsList: AdminUser[];
  adminLogin: (
    email: string,
    password: string,
    rememberMe: boolean
  ) => Promise<{ success: boolean; error?: string }>;
  adminLogout: () => void;
  changeAdminPassword: (
    currentPass: string,
    newPass: string
  ) => Promise<{ success: boolean; error?: string }>;
  createAdmin: (params: {
    name: string;
    email: string;
    role: AdminUser['role'];
    passwordPlain: string;
  }) => Promise<{ success: boolean; error?: string }>;
  refreshAdmins: () => void;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export const AdminAuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { showToast } = useToast();
  const [admin, setAdmin] = useState<AdminUser | null>(() => AdminAuthService.getSession());
  const [adminsList, setAdminsList] = useState<AdminUser[]>(() => AdminAuthService.getAllAdmins());

  useEffect(() => {
    // Initial sync
    AdminAuthService.init().then(() => {
      setAdminsList(AdminAuthService.getAllAdmins());
    });
  }, []);

  const refreshAdmins = () => {
    setAdminsList(AdminAuthService.getAllAdmins());
  };

  const adminLogin = async (email: string, password: string, rememberMe: boolean) => {
    const res = await AdminAuthService.authenticate(email, password);
    if (res.success && res.admin) {
      AdminAuthService.saveSession(res.admin, rememberMe);
      setAdmin(res.admin);
      showToast(`Welcome to BD Mart Command Center, ${res.admin.name}!`, 'success');
      return { success: true };
    } else {
      return { success: false, error: res.error || 'Authentication failed' };
    }
  };

  const adminLogout = () => {
    AdminAuthService.clearSession();
    setAdmin(null);
    showToast('Administrator signed out', 'info');
  };

  const changeAdminPassword = async (currentPass: string, newPass: string) => {
    if (!admin) return { success: false, error: 'Not authenticated' };
    const res = await AdminAuthService.changePassword(admin.id, currentPass, newPass);
    if (res.success) {
      showToast('Administrator password updated successfully', 'success');
      return { success: true };
    }
    return res;
  };

  const createAdmin = async (params: {
    name: string;
    email: string;
    role: AdminUser['role'];
    passwordPlain: string;
  }) => {
    const res = await AdminAuthService.createAdmin(params);
    if (res.success) {
      refreshAdmins();
      showToast(`New administrator (${params.name}) created successfully`, 'success');
      return { success: true };
    }
    return res;
  };

  return (
    <AdminAuthContext.Provider
      value={{
        admin,
        isAdminAuthenticated: !!admin,
        adminsList,
        adminLogin,
        adminLogout,
        changeAdminPassword,
        createAdmin,
        refreshAdmins
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
};
