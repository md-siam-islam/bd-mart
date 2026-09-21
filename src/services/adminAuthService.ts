// Secure Admin Authentication Service
// Completely separated from customer authentication
import { AdminUser, StoredAdminAccount } from '../types';
import { hashPassword, verifyPassword, generateSalt, generateOtpCode } from '../utils/security';
import { UserStorageService } from './userStorage';

const ADMINS_STORAGE_KEY = 'bdmart_admins_db';
const ADMIN_SESSION_KEY = 'bdmart_admin_session';
const ADMIN_RESET_OTP_KEY = 'bdmart_admin_reset_otps';

// Fallback initial values if not set in environment variables
const ENV_ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL || 'mdsiamislam663@gmail.com';
const ENV_ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || 'Siamali123@#';

export class AdminAuthService {
  private static initialized = false;

  /**
   * Initializes administrator registry using environment variables & secure SHA-256 hashing
   */
  public static async init(): Promise<void> {
    if (this.initialized) return;

    try {
      const existing = localStorage.getItem(ADMINS_STORAGE_KEY);
      let accounts: StoredAdminAccount[] = existing ? JSON.parse(existing) : [];

      const primaryEmail = (ENV_ADMIN_EMAIL || 'mdsiamislam663@gmail.com').trim().toLowerCase();
      const primaryPassword = ENV_ADMIN_PASSWORD || 'Siamali123@#';

      // 1. Ensure primary Super Admin account (mdsiamislam663@gmail.com)
      const primaryAccount = accounts.find((a) => a.email.toLowerCase() === primaryEmail);
      if (!primaryAccount) {
        const salt = generateSalt(16);
        const passwordHash = await hashPassword(primaryPassword, salt);
        const newSuperAdmin: StoredAdminAccount = {
          id: 'adm-001',
          name: 'Siam Ali',
          email: primaryEmail,
          role: 'Super Admin',
          avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Siam%20Ali',
          createdAt: '2026-01-01',
          lastLogin: new Date().toISOString(),
          passwordHash,
          salt
        };
        accounts.unshift(newSuperAdmin);
      } else {
        // Ensure name and password match latest configuration
        primaryAccount.name = 'Siam Ali';
        primaryAccount.role = 'Super Admin';
        const isMatch = await verifyPassword(primaryPassword, primaryAccount.salt, primaryAccount.passwordHash);
        if (!isMatch) {
          const salt = generateSalt(16);
          primaryAccount.salt = salt;
          primaryAccount.passwordHash = await hashPassword(primaryPassword, salt);
        }
      }

      // 2. Also register alias with 4 sixes (mdsiamislam6663@gmail.com) to prevent user typo issues
      const aliasEmail = 'mdsiamislam6663@gmail.com';
      const aliasAccount = accounts.find((a) => a.email.toLowerCase() === aliasEmail);
      if (!aliasAccount) {
        const salt = generateSalt(16);
        const passwordHash = await hashPassword(primaryPassword, salt);
        accounts.push({
          id: 'adm-alias',
          name: 'Siam Ali',
          email: aliasEmail,
          role: 'Super Admin',
          avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Siam%20Ali',
          createdAt: '2026-01-01',
          lastLogin: new Date().toISOString(),
          passwordHash,
          salt
        });
      } else {
        aliasAccount.name = 'Siam Ali';
        aliasAccount.role = 'Super Admin';
        const isMatch = await verifyPassword(primaryPassword, aliasAccount.salt, aliasAccount.passwordHash);
        if (!isMatch) {
          const salt = generateSalt(16);
          aliasAccount.salt = salt;
          aliasAccount.passwordHash = await hashPassword(primaryPassword, salt);
        }
      }

      // 3. Keep secondary operations admin if none exists
      if (!accounts.some((a) => a.email.toLowerCase() === 'logistics@bdmart.com.bd')) {
        const opsSalt = generateSalt(16);
        const opsHash = await hashPassword('Logistics@2026', opsSalt);
        accounts.push({
          id: 'adm-002',
          name: 'Steadfast Hub Coordinator',
          email: 'logistics@bdmart.com.bd',
          role: 'Logistics Admin',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&q=80',
          createdAt: '2026-01-15',
          passwordHash: opsHash,
          salt: opsSalt
        });
      }

      localStorage.setItem(ADMINS_STORAGE_KEY, JSON.stringify(accounts));
      this.initialized = true;
    } catch (e) {
      console.error('Failed to initialize admin database:', e);
    }
  }

  /**
   * Retrieves all administrator accounts
   */
  public static getAllAdmins(): AdminUser[] {
    try {
      const data = localStorage.getItem(ADMINS_STORAGE_KEY);
      const accounts: StoredAdminAccount[] = data ? JSON.parse(data) : [];
      return accounts.map(({ passwordHash: _, salt: __, ...safe }) => safe);
    } catch {
      return [];
    }
  }

  private static getStoredAccounts(): StoredAdminAccount[] {
    try {
      const data = localStorage.getItem(ADMINS_STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  private static saveStoredAccounts(accounts: StoredAdminAccount[]): void {
    localStorage.setItem(ADMINS_STORAGE_KEY, JSON.stringify(accounts));
  }

  /**
   * Authenticate admin via email and password
   */
  public static async authenticate(
    email: string,
    passwordPlain: string
  ): Promise<{ success: boolean; admin?: AdminUser; error?: string }> {
    await this.init();

    const cleanEmail = email.trim().toLowerCase();
    const accounts = this.getStoredAccounts();
    const account = accounts.find((a) => a.email.toLowerCase() === cleanEmail);

    // Direct check for Siam Ali admin credentials
    const isSiamEmail = cleanEmail === 'mdsiamislam663@gmail.com' || cleanEmail === 'mdsiamislam6663@gmail.com';
    if (isSiamEmail && passwordPlain === 'Siamali123@#') {
      const activeAdmin = account || {
        id: 'adm-001',
        name: 'Siam Ali',
        email: cleanEmail,
        role: 'Super Admin' as const,
        avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Siam%20Ali',
        createdAt: new Date().toISOString().split('T')[0],
        lastLogin: new Date().toISOString()
      };
      if (account) {
        account.lastLogin = new Date().toISOString();
        this.saveStoredAccounts(accounts);
      }
      return {
        success: true,
        admin: {
          id: activeAdmin.id,
          name: 'Siam Ali',
          email: cleanEmail,
          role: 'Super Admin',
          avatar: activeAdmin.avatar,
          createdAt: activeAdmin.createdAt,
          lastLogin: new Date().toISOString()
        }
      };
    }

    if (!account) {
      return {
        success: false,
        error: 'Invalid administrator credentials. Access denied.'
      };
    }

    const isValid = await verifyPassword(passwordPlain, account.salt, account.passwordHash);
    if (!isValid) {
      return {
        success: false,
        error: 'Invalid administrator credentials. Access denied.'
      };
    }

    // Update last login timestamp
    account.lastLogin = new Date().toISOString();
    this.saveStoredAccounts(accounts);

    const { passwordHash: _, salt: __, ...safeAdmin } = account;
    return {
      success: true,
      admin: safeAdmin
    };
  }

  /**
   * Admin session handling (supports Remember Me)
   */
  public static saveSession(admin: AdminUser, rememberMe: boolean): void {
    const sessionData = JSON.stringify(admin);
    if (rememberMe) {
      localStorage.setItem(ADMIN_SESSION_KEY, sessionData);
      sessionStorage.removeItem(ADMIN_SESSION_KEY);
    } else {
      sessionStorage.setItem(ADMIN_SESSION_KEY, sessionData);
      localStorage.removeItem(ADMIN_SESSION_KEY);
    }

    // Automatically sync customer profile session so storefront recognizes Siam Ali as logged in
    try {
      UserStorageService.saveSession({
        id: admin.id,
        name: admin.name,
        email: admin.email,
        phone: '01700000000',
        avatar: admin.avatar,
        status: 'active',
        createdAt: admin.createdAt,
        addresses: [],
        ordersCount: 0,
        totalSpent: 0
      }, rememberMe);
    } catch {
      // ignore
    }
  }

  public static getSession(): AdminUser | null {
    try {
      const local = localStorage.getItem(ADMIN_SESSION_KEY);
      if (local) return JSON.parse(local);
      const session = sessionStorage.getItem(ADMIN_SESSION_KEY);
      if (session) return JSON.parse(session);
      return null;
    } catch {
      return null;
    }
  }

  public static clearSession(): void {
    localStorage.removeItem(ADMIN_SESSION_KEY);
    sessionStorage.removeItem(ADMIN_SESSION_KEY);
    try {
      UserStorageService.clearSession();
    } catch {
      // ignore
    }
  }

  /**
   * Change admin password
   */
  public static async changePassword(
    adminId: string,
    currentPasswordPlain: string,
    newPasswordPlain: string
  ): Promise<{ success: boolean; error?: string }> {
    const accounts = this.getStoredAccounts();
    const account = accounts.find((a) => a.id === adminId);
    if (!account) return { success: false, error: 'Administrator not found' };

    const isMatch = await verifyPassword(currentPasswordPlain, account.salt, account.passwordHash);
    if (!isMatch) {
      return { success: false, error: 'Current password does not match.' };
    }

    const newSalt = generateSalt(16);
    const newHash = await hashPassword(newPasswordPlain, newSalt);

    account.passwordHash = newHash;
    account.salt = newSalt;
    this.saveStoredAccounts(accounts);

    return { success: true };
  }

  /**
   * Create an additional administrator
   */
  public static async createAdmin(params: {
    name: string;
    email: string;
    role: AdminUser['role'];
    passwordPlain: string;
  }): Promise<{ success: boolean; admin?: AdminUser; error?: string }> {
    await this.init();

    const accounts = this.getStoredAccounts();
    const cleanEmail = params.email.trim().toLowerCase();

    if (accounts.some((a) => a.email.toLowerCase() === cleanEmail)) {
      return {
        success: false,
        error: 'An administrator with this email already exists.'
      };
    }

    const salt = generateSalt(16);
    const passwordHash = await hashPassword(params.passwordPlain, salt);

    const newAdmin: StoredAdminAccount = {
      id: 'adm-' + Date.now().toString(36),
      name: params.name.trim(),
      email: cleanEmail,
      role: params.role,
      avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(params.name)}`,
      createdAt: new Date().toISOString().split('T')[0],
      passwordHash,
      salt
    };

    accounts.push(newAdmin);
    this.saveStoredAccounts(accounts);

    const { passwordHash: _, salt: __, ...safe } = newAdmin;
    return { success: true, admin: safe };
  }

  /**
   * Admin Password Recovery OTP
   */
  public static requestResetOtp(email: string): {
    success: boolean;
    message: string;
    simulatedCode?: string;
  } {
    const cleanEmail = email.trim().toLowerCase();
    const accounts = this.getStoredAccounts();
    const found = accounts.find((a) => a.email.toLowerCase() === cleanEmail);

    const code = generateOtpCode();
    const otps = JSON.parse(localStorage.getItem(ADMIN_RESET_OTP_KEY) || '{}');
    otps[cleanEmail] = { code, expiry: Date.now() + 15 * 60 * 1000 };
    localStorage.setItem(ADMIN_RESET_OTP_KEY, JSON.stringify(otps));

    return {
      success: true,
      message: 'If the provided email belongs to an administrator, recovery instructions have been dispatched.',
      simulatedCode: found ? code : undefined
    };
  }

  public static async resetPasswordWithOtp(
    email: string,
    code: string,
    newPasswordPlain: string
  ): Promise<{ success: boolean; error?: string }> {
    const cleanEmail = email.trim().toLowerCase();
    const otps = JSON.parse(localStorage.getItem(ADMIN_RESET_OTP_KEY) || '{}');
    const entry = otps[cleanEmail];

    if (!entry || entry.code !== code.trim() || Date.now() > entry.expiry) {
      return { success: false, error: 'Invalid or expired administrative recovery code.' };
    }

    const accounts = this.getStoredAccounts();
    const account = accounts.find((a) => a.email.toLowerCase() === cleanEmail);
    if (!account) return { success: false, error: 'Administrator account not found.' };

    const salt = generateSalt(16);
    account.passwordHash = await hashPassword(newPasswordPlain, salt);
    account.salt = salt;
    this.saveStoredAccounts(accounts);

    delete otps[cleanEmail];
    localStorage.setItem(ADMIN_RESET_OTP_KEY, JSON.stringify(otps));

    return { success: true };
  }
}

// Auto-initialize on module load
AdminAuthService.init();
