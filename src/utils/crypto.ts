/**
 * Client-Side Authentication Gate & User Account Management
 * 
 * Manages dynamic user accounts, password hashing (SHA-256), active/disabled status toggles,
 * and CRUD operations for user access control.
 */

import { UserAccount, LoginResult } from '../types';
import { safeGet, safeSet } from './storage';

export const USERS_STORAGE_KEY = 'erc_user_accounts_v1';

export async function hashSHA256(text: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(text.trim());
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hexHash = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hexHash;
}

// Seed default users if none are stored
const DEFAULT_USERS: UserAccount[] = [
  {
    id: 'user-admin',
    username: 'admin',
    passwordHash: '8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918', // sha256("admin")
    plainTextPasswordHint: 'admin',
    role: 'admin',
    status: 'active',
    createdAt: new Date().toISOString().slice(0, 10),
  },
  {
    id: 'user-teacher',
    username: 'teacher',
    passwordHash: '9709d7a224a1b8c281e0500bf754e38e68cf1dd00f3e8f81ed6b6d5f70bb0784', // sha256("practice")
    plainTextPasswordHint: 'practice',
    role: 'teacher',
    status: 'active',
    createdAt: new Date().toISOString().slice(0, 10),
  },
];

export async function getUserAccounts(): Promise<UserAccount[]> {
  const accounts = await safeGet<UserAccount[]>(USERS_STORAGE_KEY, []);
  if (!accounts || accounts.length === 0) {
    await safeSet(USERS_STORAGE_KEY, DEFAULT_USERS);
    return DEFAULT_USERS;
  }
  return accounts;
}

export async function saveUserAccounts(accounts: UserAccount[]): Promise<void> {
  await safeSet(USERS_STORAGE_KEY, accounts);
}

export async function verifyCredentialsDetailed(
  usernameInput: string,
  passwordInput: string
): Promise<LoginResult> {
  const accounts = await getUserAccounts();
  const cleanUsername = usernameInput.trim().toLowerCase();
  const inputPassHash = await hashSHA256(passwordInput);

  const matchedUser = accounts.find(u => u.username.toLowerCase() === cleanUsername);

  if (!matchedUser) {
    // Fallback default checks for legacy
    if (cleanUsername === 'admin' && inputPassHash === '8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918') {
      return {
        success: true,
        user: DEFAULT_USERS[0],
      };
    }
    if (cleanUsername === 'teacher' && inputPassHash === '9709d7a224a1b8c281e0500bf754e38e68cf1dd00f3e8f81ed6b6d5f70bb0784') {
      return {
        success: true,
        user: DEFAULT_USERS[1],
      };
    }
    return { success: false, reason: 'invalid' };
  }

  // Check if account is disabled
  if (matchedUser.status === 'disabled') {
    return { success: false, reason: 'disabled', user: matchedUser };
  }

  // Check password hash
  if (matchedUser.passwordHash === inputPassHash) {
    // Update lastLogin timestamp
    const nowStr = new Date().toISOString();
    const updated = accounts.map(u =>
      u.id === matchedUser.id ? { ...u, lastLogin: nowStr } : u
    );
    await saveUserAccounts(updated);

    return {
      success: true,
      user: { ...matchedUser, lastLogin: nowStr },
    };
  }

  return { success: false, reason: 'invalid' };
}

// Wrapper for backwards compatibility
export async function verifyCredentials(
  usernameInput: string,
  passwordInput: string
): Promise<boolean> {
  const result = await verifyCredentialsDetailed(usernameInput, passwordInput);
  return result.success;
}

export async function createUserAccount(
  username: string,
  password: string,
  role: 'admin' | 'teacher' | 'student' = 'teacher'
): Promise<{ success: boolean; message: string; user?: UserAccount }> {
  const cleanUsername = username.trim().toLowerCase();
  if (!cleanUsername) {
    return { success: false, message: 'Username cannot be empty.' };
  }
  if (!password || password.length < 3) {
    return { success: false, message: 'Password must be at least 3 characters long.' };
  }

  const accounts = await getUserAccounts();
  const exists = accounts.some(u => u.username.toLowerCase() === cleanUsername);
  if (exists) {
    return { success: false, message: `Username "${cleanUsername}" already exists.` };
  }

  const passwordHash = await hashSHA256(password);
  const newUser: UserAccount = {
    id: `user-${Date.now()}`,
    username: cleanUsername,
    passwordHash,
    plainTextPasswordHint: password,
    role,
    status: 'active',
    createdAt: new Date().toISOString().slice(0, 10),
  };

  const updated = [...accounts, newUser];
  await saveUserAccounts(updated);
  return { success: true, message: 'User account created successfully!', user: newUser };
}

export async function updateUserPassword(
  userId: string,
  newPassword: string
): Promise<{ success: boolean; message: string }> {
  if (!newPassword || newPassword.length < 3) {
    return { success: false, message: 'Password must be at least 3 characters long.' };
  }

  const accounts = await getUserAccounts();
  const passwordHash = await hashSHA256(newPassword);

  let found = false;
  const updated = accounts.map(u => {
    if (u.id === userId) {
      found = true;
      return {
        ...u,
        passwordHash,
        plainTextPasswordHint: newPassword,
      };
    }
    return u;
  });

  if (!found) {
    return { success: false, message: 'User account not found.' };
  }

  await saveUserAccounts(updated);
  return { success: true, message: 'Password updated successfully!' };
}

export async function toggleUserStatus(userId: string): Promise<{ success: boolean; newStatus?: 'active' | 'disabled' }> {
  const accounts = await getUserAccounts();
  let newStatus: 'active' | 'disabled' = 'active';

  const updated = accounts.map(u => {
    if (u.id === userId) {
      newStatus = u.status === 'active' ? 'disabled' : 'active';
      return { ...u, status: newStatus };
    }
    return u;
  });

  await saveUserAccounts(updated);
  return { success: true, newStatus };
}

export async function deleteUserAccount(userId: string): Promise<{ success: boolean; message: string }> {
  const accounts = await getUserAccounts();
  const filtered = accounts.filter(u => u.id !== userId);

  if (filtered.length === accounts.length) {
    return { success: false, message: 'User account not found.' };
  }

  await saveUserAccounts(filtered);
  return { success: true, message: 'User account deleted successfully.' };
}

