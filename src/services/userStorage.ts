// User Storage Service with SHA-256 Password Hashing & Bangladesh Address Handling
import { UserProfile, StoredUserAccount, Address } from '../types';
import { hashPassword, verifyPassword, generateSalt, generateOtpCode, validateBDMobile } from '../utils/security';

const USERS_STORAGE_KEY = 'bdmart_users_db';
const RESET_OTP_KEY = 'bdmart_reset_otps';
const CUSTOMER_SESSION_KEY = 'bdmart_customer_session';

// Demo accounts for Bangladesh e-commerce
const SEED_USERS_RAW = [
  {
    id: 'usr-001',
    name: 'Tanvir Ahmed',
    email: 'tanvir.ahmed@example.com',
    phone: '01712345678',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=160&q=80',
    dateOfBirth: '1992-05-14',
    gender: 'male' as const,
    status: 'active' as const,
    createdAt: '2026-01-15',
    ordersCount: 4,
    totalSpent: 12850,
    passwordPlain: 'Demo@1234',
    addresses: [
      {
        id: 'addr-1',
        name: 'Tanvir Ahmed (Home)',
        phone: '01712345678',
        division: 'dhaka',
        district: 'dhaka-city',
        upazila: 'dhanmondi',
        area: 'Dhanmondi R/A, Road 7/A',
        fullAddress: 'House 42, Road 7/A, Dhanmondi R/A, Dhaka-1209',
        postalCode: '1209',
        addressType: 'Home' as const,
        isDefault: true
      },
      {
        id: 'addr-2',
        name: 'Tanvir Ahmed (Work)',
        phone: '01712345678',
        division: 'dhaka',
        district: 'dhaka-city',
        upazila: 'gulshan',
        area: 'Gulshan Avenue',
        fullAddress: 'Level 14, Simpletree Anarkali, 89 Gulshan Avenue, Dhaka-1212',
        postalCode: '1212',
        addressType: 'Office' as const,
        isDefault: false
      }
    ]
  },
  {
    id: 'usr-002',
    name: 'Farhana Kabir',
    email: 'farhana.kabir@example.com',
    phone: '01812345678',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=160&q=80',
    dateOfBirth: '1995-10-22',
    gender: 'female' as const,
    status: 'active' as const,
    createdAt: '2026-02-02',
    ordersCount: 2,
    totalSpent: 6400,
    passwordPlain: 'Customer@2026',
    addresses: [
      {
        id: 'addr-3',
        name: 'Farhana Kabir',
        phone: '01812345678',
        division: 'chattogram',
        district: 'chattogram-city',
        upazila: 'panchlaish',
        area: 'Panchlaish R/A',
        fullAddress: 'House 18, Road 2, Panchlaish R/A, Chattogram-4000',
        postalCode: '4000',
        addressType: 'Home' as const,
        isDefault: true
      }
    ]
  },
  {
    id: 'usr-003',
    name: 'Mahmudul Hasan',
    email: 'mahmud.h@example.com',
    phone: '01912345678',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&q=80',
    dateOfBirth: '1988-12-03',
    gender: 'male' as const,
    status: 'active' as const,
    createdAt: '2026-02-10',
    ordersCount: 5,
    totalSpent: 22400,
    passwordPlain: 'Customer@2026',
    addresses: [
      {
        id: 'addr-4',
        name: 'Mahmudul Hasan',
        phone: '01912345678',
        division: 'sylhet',
        district: 'sylhet-district',
        upazila: 'sylhet-sadar',
        area: 'Zindabazar',
        fullAddress: 'Holding 34, West Zindabazar, Sylhet-3100',
        postalCode: '3100',
        addressType: 'Home' as const,
        isDefault: true
      }
    ]
  },
  {
    id: 'usr-004',
    name: 'Sumaiya Akter',
    email: 'sumaiya.akter@example.com',
    phone: '01612345678',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=160&q=80',
    dateOfBirth: '1998-04-18',
    gender: 'female' as const,
    status: 'active' as const,
    createdAt: '2026-02-18',
    ordersCount: 3,
    totalSpent: 15200,
    passwordPlain: 'Customer@2026',
    addresses: [
      {
        id: 'addr-5',
        name: 'Sumaiya Akter',
        phone: '01612345678',
        division: 'dhaka',
        district: 'dhaka-city',
        upazila: 'uttara',
        area: 'Sector 4',
        fullAddress: 'Road 7, Sector 4, Uttara, Dhaka-1230',
        postalCode: '1230',
        addressType: 'Home' as const,
        isDefault: true
      }
    ]
  },
  {
    id: 'usr-005',
    name: 'Zubair Rahman',
    email: 'zubair.rahman@example.com',
    phone: '01512345678',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=160&q=80',
    dateOfBirth: '1990-09-08',
    gender: 'male' as const,
    status: 'deactivated' as const, // Demonstrates deactivated account handling
    createdAt: '2026-03-05',
    ordersCount: 1,
    totalSpent: 2650,
    passwordPlain: 'Customer@2026',
    addresses: [
      {
        id: 'addr-6',
        name: 'Zubair Rahman',
        phone: '01512345678',
        division: 'rajshahi',
        district: 'rajshahi-district',
        upazila: 'boalia',
        area: 'Shaheb Bazar',
        fullAddress: 'Ward 12, Boalia, Rajshahi-6000',
        postalCode: '6000',
        addressType: 'Home' as const,
        isDefault: true
      }
    ]
  }
];

export class UserStorageService {
  private static initialized = false;

  /**
   * Initializes the user database with salted SHA-256 hashed accounts
   */
  public static async init(): Promise<void> {
    if (this.initialized) return;

    try {
      const existing = localStorage.getItem(USERS_STORAGE_KEY);
      if (!existing) {
        const seededUsers: StoredUserAccount[] = [];
        for (const raw of SEED_USERS_RAW) {
          const salt = generateSalt(16);
          const passwordHash = await hashPassword(raw.passwordPlain, salt);
          const { passwordPlain: _, ...userData } = raw;
          seededUsers.push({
            ...userData,
            passwordHash,
            salt
          });
        }
        localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(seededUsers));
      }
      this.initialized = true;
    } catch (e) {
      console.error('Failed to initialize user database:', e);
    }
  }

  /**
   * Retrieves all registered user accounts (excluding passwords from return type where needed)
   */
  public static getAllUsers(): StoredUserAccount[] {
    try {
      const data = localStorage.getItem(USERS_STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  /**
   * Saves users array to storage
   */
  private static saveUsers(users: StoredUserAccount[]): void {
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
  }

  /**
   * Strips passwordHash and salt to produce safe UserProfile
   */
  public static toSafeProfile(user: StoredUserAccount): UserProfile {
    const { passwordHash: _, salt: __, ...safe } = user;
    return safe;
  }

  /**
   * Finds a user by ID
   */
  public static getUserById(id: string): UserProfile | null {
    const users = this.getAllUsers();
    const found = users.find((u) => u.id === id);
    return found ? this.toSafeProfile(found) : null;
  }

  /**
   * Finds a user by email or Bangladeshi phone number
   */
  public static findByIdentifier(identifier: string): StoredUserAccount | null {
    const users = this.getAllUsers();
    const cleanId = identifier.trim().toLowerCase();

    // Check email match
    const byEmail = users.find((u) => u.email.toLowerCase() === cleanId);
    if (byEmail) return byEmail;

    // Check phone match
    const validation = validateBDMobile(identifier);
    if (validation.isValid) {
      const byPhone = users.find((u) => u.phone === validation.normalized);
      if (byPhone) return byPhone;
    }

    // Direct phone string compare
    return users.find((u) => u.phone === identifier.trim()) || null;
  }

  /**
   * Registers a new customer with validation and password hashing
   */
  public static async registerCustomer(params: {
    name: string;
    email: string;
    phone: string;
    password: string;
    avatar?: string;
    dateOfBirth?: string;
    gender?: 'male' | 'female' | 'other';
  }): Promise<{ success: boolean; user?: UserProfile; error?: string }> {
    await this.init();

    const users = this.getAllUsers();
    const cleanEmail = params.email.trim().toLowerCase();
    const phoneValidation = validateBDMobile(params.phone);

    if (!phoneValidation.isValid) {
      return { success: false, error: phoneValidation.error || 'Invalid Bangladeshi mobile number.' };
    }

    // Check duplicate email
    if (cleanEmail && users.some((u) => u.email.toLowerCase() === cleanEmail)) {
      return {
        success: false,
        error: 'An account with this email address already exists. Please log in.'
      };
    }

    // Check duplicate phone
    if (users.some((u) => u.phone === phoneValidation.normalized)) {
      return {
        success: false,
        error: 'This mobile number is already registered. Please log in or use another number.'
      };
    }

    // Generate cryptographic salt and hash password
    const salt = generateSalt(16);
    const passwordHash = await hashPassword(params.password, salt);

    const defaultAvatar =
      params.avatar ||
      `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(params.name)}`;

    const newAccount: StoredUserAccount = {
      id: 'usr-' + Date.now().toString(36) + Math.random().toString(36).substring(2, 6),
      name: params.name.trim(),
      email: cleanEmail,
      phone: phoneValidation.normalized,
      avatar: defaultAvatar,
      dateOfBirth: params.dateOfBirth,
      gender: params.gender,
      status: 'active',
      createdAt: new Date().toISOString().split('T')[0],
      ordersCount: 0,
      totalSpent: 0,
      addresses: [],
      passwordHash,
      salt
    };

    users.push(newAccount);
    this.saveUsers(users);

    return {
      success: true,
      user: this.toSafeProfile(newAccount)
    };
  }

  /**
   * Authenticates customer credentials securely
   */
  public static async authenticateCustomer(
    identifier: string,
    passwordPlain: string
  ): Promise<{ success: boolean; user?: UserProfile; error?: string }> {
    await this.init();

    const account = this.findByIdentifier(identifier);
    if (!account) {
      return {
        success: false,
        error: 'Invalid credentials. Please verify your email/phone and password.'
      };
    }

    // Check account status
    if (account.status === 'deactivated') {
      return {
        success: false,
        error: 'Your account has been deactivated. Please contact support at support@bdmart.com.bd.'
      };
    }

    // Verify hashed password
    const isValid = await verifyPassword(passwordPlain, account.salt, account.passwordHash);
    if (!isValid) {
      return {
        success: false,
        error: 'Invalid credentials. Please verify your email/phone and password.'
      };
    }

    return {
      success: true,
      user: this.toSafeProfile(account)
    };
  }

  /**
   * Customer session storage (supports Remember Me)
   */
  public static saveSession(user: UserProfile, rememberMe: boolean): void {
    const sessionData = JSON.stringify(user);
    if (rememberMe) {
      localStorage.setItem(CUSTOMER_SESSION_KEY, sessionData);
      sessionStorage.removeItem(CUSTOMER_SESSION_KEY);
    } else {
      sessionStorage.setItem(CUSTOMER_SESSION_KEY, sessionData);
      localStorage.removeItem(CUSTOMER_SESSION_KEY);
    }
  }

  public static getSession(): UserProfile | null {
    try {
      const local = localStorage.getItem(CUSTOMER_SESSION_KEY);
      if (local) return JSON.parse(local);
      const session = sessionStorage.getItem(CUSTOMER_SESSION_KEY);
      if (session) return JSON.parse(session);
      return null;
    } catch {
      return null;
    }
  }

  public static clearSession(): void {
    localStorage.removeItem(CUSTOMER_SESSION_KEY);
    sessionStorage.removeItem(CUSTOMER_SESSION_KEY);
  }

  /**
   * Request password reset OTP
   * Does NOT reveal whether the account exists to prevent user enumeration attacks
   */
  public static requestPasswordReset(identifier: string): {
    success: boolean;
    message: string;
    simulatedCode?: string; // Provided for test demo verification
  } {
    const account = this.findByIdentifier(identifier);
    const code = generateOtpCode();
    const expiry = Date.now() + 15 * 60 * 1000; // 15 mins

    // Save OTP under identifier key
    const currentOtps = JSON.parse(localStorage.getItem(RESET_OTP_KEY) || '{}');
    const cleanKey = identifier.trim().toLowerCase();
    currentOtps[cleanKey] = { code, expiry };
    localStorage.setItem(RESET_OTP_KEY, JSON.stringify(currentOtps));

    // Message is generic according to security requirements
    return {
      success: true,
      message: 'If an account exists with this email or mobile number, a 6-digit verification code has been generated.',
      simulatedCode: account ? code : undefined
    };
  }

  /**
   * Verifies the 6-digit reset OTP
   */
  public static verifyResetCode(identifier: string, code: string): boolean {
    try {
      const otps = JSON.parse(localStorage.getItem(RESET_OTP_KEY) || '{}');
      const cleanKey = identifier.trim().toLowerCase();
      const entry = otps[cleanKey];
      if (!entry) return false;
      if (Date.now() > entry.expiry) return false;
      return entry.code === code.trim();
    } catch {
      return false;
    }
  }

  /**
   * Resets password using valid OTP code
   */
  public static async resetPasswordWithOtp(
    identifier: string,
    code: string,
    newPasswordPlain: string
  ): Promise<{ success: boolean; error?: string }> {
    if (!this.verifyResetCode(identifier, code)) {
      return { success: false, error: 'Invalid or expired verification code.' };
    }

    const users = this.getAllUsers();
    const accountIndex = users.findIndex((u) => {
      const clean = identifier.trim().toLowerCase();
      return u.email.toLowerCase() === clean || u.phone === clean;
    });

    if (accountIndex === -1) {
      return { success: false, error: 'Account not found.' };
    }

    const salt = generateSalt(16);
    const passwordHash = await hashPassword(newPasswordPlain, salt);

    users[accountIndex].passwordHash = passwordHash;
    users[accountIndex].salt = salt;
    this.saveUsers(users);

    // Clear used OTP
    const otps = JSON.parse(localStorage.getItem(RESET_OTP_KEY) || '{}');
    delete otps[identifier.trim().toLowerCase()];
    localStorage.setItem(RESET_OTP_KEY, JSON.stringify(otps));

    return { success: true };
  }

  /**
   * Updates customer profile
   */
  public static updateProfile(
    userId: string,
    updatedFields: Partial<UserProfile>
  ): UserProfile | null {
    const users = this.getAllUsers();
    const index = users.findIndex((u) => u.id === userId);
    if (index === -1) return null;

    users[index] = {
      ...users[index],
      ...updatedFields
    };
    this.saveUsers(users);

    const safe = this.toSafeProfile(users[index]);
    // Also update active session if this is the logged-in user
    const currentSession = this.getSession();
    if (currentSession && currentSession.id === userId) {
      const isLocal = !!localStorage.getItem(CUSTOMER_SESSION_KEY);
      this.saveSession(safe, isLocal);
    }

    return safe;
  }

  /**
   * Customer changes their own password
   */
  public static async changePassword(
    userId: string,
    currentPasswordPlain: string,
    newPasswordPlain: string
  ): Promise<{ success: boolean; error?: string }> {
    const users = this.getAllUsers();
    const user = users.find((u) => u.id === userId);
    if (!user) return { success: false, error: 'User not found' };

    const isMatch = await verifyPassword(currentPasswordPlain, user.salt, user.passwordHash);
    if (!isMatch) {
      return { success: false, error: 'Current password does not match.' };
    }

    const newSalt = generateSalt(16);
    const newHash = await hashPassword(newPasswordPlain, newSalt);

    user.passwordHash = newHash;
    user.salt = newSalt;
    this.saveUsers(users);

    return { success: true };
  }

  /**
   * Address Book Management
   */
  public static addAddress(userId: string, addressData: Omit<Address, 'id'>): Address[] {
    const users = this.getAllUsers();
    const user = users.find((u) => u.id === userId);
    if (!user) return [];

    const newAddress: Address = {
      ...addressData,
      id: 'addr-' + Date.now()
    };

    let updatedAddresses = user.addresses || [];
    if (newAddress.isDefault) {
      updatedAddresses = updatedAddresses.map((a) => ({ ...a, isDefault: false }));
    }
    updatedAddresses.push(newAddress);

    user.addresses = updatedAddresses;
    this.saveUsers(users);
    this.updateProfile(userId, { addresses: updatedAddresses });
    return updatedAddresses;
  }

  public static updateAddress(
    userId: string,
    addressId: string,
    updatedFields: Partial<Address>
  ): Address[] {
    const users = this.getAllUsers();
    const user = users.find((u) => u.id === userId);
    if (!user) return [];

    let updated = (user.addresses || []).map((a) =>
      a.id === addressId ? { ...a, ...updatedFields } : a
    );

    if (updatedFields.isDefault) {
      updated = updated.map((a) =>
        a.id === addressId ? { ...a, isDefault: true } : { ...a, isDefault: false }
      );
    }

    user.addresses = updated;
    this.saveUsers(users);
    this.updateProfile(userId, { addresses: updated });
    return updated;
  }

  public static deleteAddress(userId: string, addressId: string): Address[] {
    const users = this.getAllUsers();
    const user = users.find((u) => u.id === userId);
    if (!user) return [];

    const updated = (user.addresses || []).filter((a) => a.id !== addressId);
    user.addresses = updated;
    this.saveUsers(users);
    this.updateProfile(userId, { addresses: updated });
    return updated;
  }

  public static setDefaultAddress(userId: string, addressId: string): Address[] {
    return this.updateAddress(userId, addressId, { isDefault: true });
  }

  /**
   * Admin Operations: Toggle user status (active/deactivated)
   */
  public static toggleUserStatus(userId: string): { user?: UserProfile; error?: string } {
    const users = this.getAllUsers();
    const index = users.findIndex((u) => u.id === userId);
    if (index === -1) return { error: 'Customer not found' };

    const newStatus = users[index].status === 'active' ? 'deactivated' : 'active';
    users[index].status = newStatus;
    this.saveUsers(users);

    const safe = this.toSafeProfile(users[index]);
    // If deactivated and logged in, invalidate their active session
    if (newStatus === 'deactivated') {
      const session = this.getSession();
      if (session && session.id === userId) {
        this.clearSession();
      }
    }

    return { user: safe };
  }
}

// Auto-initialize on module load
UserStorageService.init();
