import React, { useState, useEffect } from 'react';
import {
  Users,
  UserPlus,
  Key,
  ShieldOff,
  ShieldCheck,
  Trash2,
  Lock,
  Search,
  Check,
  AlertCircle,
  Eye,
  EyeOff,
  UserCheck,
  ShieldAlert,
  RefreshCw
} from 'lucide-react';
import { UserAccount } from '../types';
import {
  getUserAccounts,
  createUserAccount,
  updateUserPassword,
  toggleUserStatus,
  deleteUserAccount
} from '../utils/crypto';

interface UserAdminModuleProps {
  isDarkMode?: boolean;
}

export const UserAdminModule: React.FC<UserAdminModuleProps> = ({ isDarkMode = false }) => {
  const [accounts, setAccounts] = useState<UserAccount[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // New user form state
  const [newUsername, setNewUsername] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [newRole, setNewRole] = useState<'admin' | 'teacher' | 'student'>('teacher');
  const [createMessage, setCreateMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [isCreating, setIsCreating] = useState<boolean>(false);

  // Edit password modal/inline state
  const [editingUserId, setEditingUserId] = useState<string | null>(null);
  const [editPasswordInput, setEditPasswordInput] = useState<string>('');
  const [editMessage, setEditMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [showPasswordMap, setShowPasswordMap] = useState<Record<string, boolean>>({});

  // Delete confirmation state
  const [userToDelete, setUserToDelete] = useState<UserAccount | null>(null);

  const loadUsers = async () => {
    setLoading(true);
    try {
      const users = await getUserAccounts();
      setAccounts(users);
    } catch (err) {
      console.error('Failed to load user accounts:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreateMessage(null);

    if (!newUsername.trim() || !newPassword.trim()) {
      setCreateMessage({ type: 'error', text: 'Please fill in both username and password.' });
      return;
    }

    setIsCreating(true);
    try {
      const res = await createUserAccount(newUsername, newPassword, newRole);
      if (res.success) {
        setCreateMessage({ type: 'success', text: res.message });
        setNewUsername('');
        setNewPassword('');
        setNewRole('teacher');
        await loadUsers();
      } else {
        setCreateMessage({ type: 'error', text: res.message });
      }
    } catch (err) {
      console.error('Error creating user:', err);
      setCreateMessage({ type: 'error', text: 'An unexpected error occurred while creating user.' });
    } finally {
      setIsCreating(false);
    }
  };

  const handleToggleStatus = async (user: UserAccount) => {
    try {
      const res = await toggleUserStatus(user.id);
      if (res.success) {
        await loadUsers();
      }
    } catch (err) {
      console.error('Error toggling user status:', err);
    }
  };

  const handleSavePassword = async (userId: string) => {
    setEditMessage(null);
    if (!editPasswordInput || editPasswordInput.length < 3) {
      setEditMessage({ type: 'error', text: 'Password must be at least 3 characters long.' });
      return;
    }

    try {
      const res = await updateUserPassword(userId, editPasswordInput);
      if (res.success) {
        setEditMessage({ type: 'success', text: res.message });
        setEditingUserId(null);
        setEditPasswordInput('');
        await loadUsers();
      } else {
        setEditMessage({ type: 'error', text: res.message });
      }
    } catch (err) {
      console.error('Error updating password:', err);
      setEditMessage({ type: 'error', text: 'Failed to update password.' });
    }
  };

  const handleDeleteUser = async () => {
    if (!userToDelete) return;

    try {
      const res = await deleteUserAccount(userToDelete.id);
      if (res.success) {
        setUserToDelete(null);
        await loadUsers();
      }
    } catch (err) {
      console.error('Error deleting user:', err);
    }
  };

  const toggleShowPassword = (userId: string) => {
    setShowPasswordMap((prev) => ({ ...prev, [userId]: !prev[userId] }));
  };

  const filteredAccounts = accounts.filter((acc) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      acc.username.toLowerCase().includes(q) ||
      acc.role.toLowerCase().includes(q) ||
      acc.status.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Module Header Card */}
      <div
        className={`p-5 rounded-2xl border transition-all ${
          isDarkMode
            ? 'bg-[#182430] border-[#2A3B4A] text-[#F2EFE7]'
            : 'bg-white border-[#DBEAFE] text-[#0F172A] shadow-lg shadow-blue-900/5'
        }`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div
              className={`p-3 rounded-2xl ${
                isDarkMode ? 'bg-[#E8A33D]/20 text-[#E8A33D]' : 'bg-[#EFF6FF] text-[#2563EB]'
              }`}
            >
              <Users className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-heading font-black tracking-tight">
                User Access & Password Management
              </h2>
              <p className={`text-xs ${isDarkMode ? 'text-[#9AA5AE]' : 'text-[#64748B]'}`}>
                Create logins, change user passwords, enable/disable access, and manage administrative privileges.
              </p>
            </div>
          </div>

          <button
            onClick={loadUsers}
            className={`p-2.5 rounded-xl border flex items-center gap-1.5 text-xs font-mono font-bold transition-all cursor-pointer ${
              isDarkMode
                ? 'bg-[#1F2E3C] border-[#2A3B4A] text-[#E8A33D] hover:bg-[#2A3B4A]'
                : 'bg-[#F8FAFC] border-[#CBD5E1] text-[#2563EB] hover:bg-[#EFF6FF]'
            }`}
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* Create New User Section */}
      <div
        className={`p-5 rounded-2xl border transition-all ${
          isDarkMode
            ? 'bg-[#182430] border-[#2A3B4A] text-[#F2EFE7]'
            : 'bg-white border-[#DBEAFE] text-[#0F172A] shadow-lg shadow-blue-900/5'
        }`}
      >
        <div className="flex items-center gap-2 mb-4">
          <UserPlus className={`w-5 h-5 ${isDarkMode ? 'text-[#E8A33D]' : 'text-[#2563EB]'}`} />
          <h3 className="font-heading font-bold text-base">Create New User Account</h3>
        </div>

        <form onSubmit={handleCreateUser} className="grid grid-cols-1 md:grid-cols-4 gap-3 items-end">
          {/* Username Input */}
          <div>
            <label className={`block text-xs font-mono font-bold uppercase tracking-wider mb-1 ${
              isDarkMode ? 'text-[#9AA5AE]' : 'text-[#64748B]'
            }`}>
              Username
            </label>
            <input
              type="text"
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
              placeholder="e.g. maria or teacher2"
              className={`w-full px-3.5 py-2.5 rounded-xl text-sm border font-medium focus:outline-none focus:ring-2 ${
                isDarkMode
                  ? 'bg-[#1F2E3C] border-[#2A3B4A] text-[#F2EFE7] placeholder-[#9AA5AE] focus:border-[#E8A33D]'
                  : 'bg-[#F8FAFC] border-[#CBD5E1] text-[#0F172A] placeholder-[#94A3B8] focus:border-[#2563EB]'
              }`}
            />
          </div>

          {/* Password Input */}
          <div>
            <label className={`block text-xs font-mono font-bold uppercase tracking-wider mb-1 ${
              isDarkMode ? 'text-[#9AA5AE]' : 'text-[#64748B]'
            }`}>
              Password
            </label>
            <input
              type="text"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter password"
              className={`w-full px-3.5 py-2.5 rounded-xl text-sm border font-medium focus:outline-none focus:ring-2 ${
                isDarkMode
                  ? 'bg-[#1F2E3C] border-[#2A3B4A] text-[#F2EFE7] placeholder-[#9AA5AE] focus:border-[#E8A33D]'
                  : 'bg-[#F8FAFC] border-[#CBD5E1] text-[#0F172A] placeholder-[#94A3B8] focus:border-[#2563EB]'
              }`}
            />
          </div>

          {/* Role Select */}
          <div>
            <label className={`block text-xs font-mono font-bold uppercase tracking-wider mb-1 ${
              isDarkMode ? 'text-[#9AA5AE]' : 'text-[#64748B]'
            }`}>
              User Role
            </label>
            <select
              value={newRole}
              onChange={(e) => setNewRole(e.target.value as any)}
              className={`w-full px-3.5 py-2.5 rounded-xl text-sm border font-medium focus:outline-none focus:ring-2 cursor-pointer ${
                isDarkMode
                  ? 'bg-[#1F2E3C] border-[#2A3B4A] text-[#F2EFE7] focus:border-[#E8A33D]'
                  : 'bg-[#F8FAFC] border-[#CBD5E1] text-[#0F172A] focus:border-[#2563EB]'
              }`}
            >
              <option value="teacher">Teacher</option>
              <option value="student">Student</option>
              <option value="admin">Administrator</option>
            </select>
          </div>

          {/* Create Button */}
          <div>
            <button
              type="submit"
              disabled={isCreating}
              className={`w-full py-2.5 px-4 rounded-xl font-heading font-extrabold text-sm transition-all shadow-md active:scale-95 flex items-center justify-center gap-2 cursor-pointer ${
                isDarkMode
                  ? 'bg-[#E8A33D] hover:bg-[#D69332] text-[#101820]'
                  : 'bg-[#2563EB] hover:bg-[#1D4ED8] text-white'
              }`}
            >
              <UserPlus className="w-4 h-4" />
              <span>Create Account</span>
            </button>
          </div>
        </form>

        {/* Feedback Alert */}
        {createMessage && (
          <div
            className={`mt-3 p-3 rounded-xl text-xs flex items-center gap-2 font-medium border ${
              createMessage.type === 'success'
                ? isDarkMode
                  ? 'bg-[#4FB8A6]/15 border-[#4FB8A6]/40 text-[#4FB8A6]'
                  : 'bg-[#ECFDF5] border-[#A7F3D0] text-[#065F46]'
                : isDarkMode
                ? 'bg-[#D9534F]/15 border-[#D9534F]/40 text-[#D9534F]'
                : 'bg-[#FEF2F2] border-[#FECACA] text-[#991B1B]'
            }`}
          >
            {createMessage.type === 'success' ? (
              <Check className="w-4 h-4 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 shrink-0" />
            )}
            <span>{createMessage.text}</span>
          </div>
        )}
      </div>

      {/* User Accounts List */}
      <div
        className={`p-5 rounded-2xl border transition-all ${
          isDarkMode
            ? 'bg-[#182430] border-[#2A3B4A] text-[#F2EFE7]'
            : 'bg-white border-[#DBEAFE] text-[#0F172A] shadow-lg shadow-blue-900/5'
        }`}
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2">
            <UserCheck className={`w-5 h-5 ${isDarkMode ? 'text-[#E8A33D]' : 'text-[#2563EB]'}`} />
            <h3 className="font-heading font-bold text-base">
              Existing Accounts ({filteredAccounts.length})
            </h3>
          </div>

          {/* Search Bar */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 absolute left-3 top-3 text-[#9AA5AE]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search user or role..."
              className={`w-full pl-9 pr-3 py-1.5 rounded-xl text-xs border font-medium focus:outline-none ${
                isDarkMode
                  ? 'bg-[#1F2E3C] border-[#2A3B4A] text-[#F2EFE7] placeholder-[#9AA5AE]'
                  : 'bg-[#F8FAFC] border-[#CBD5E1] text-[#0F172A] placeholder-[#94A3B8]'
              }`}
            />
          </div>
        </div>

        {/* Global edit message if set */}
        {editMessage && (
          <div
            className={`mb-4 p-3 rounded-xl text-xs flex items-center justify-between font-medium border ${
              editMessage.type === 'success'
                ? isDarkMode
                  ? 'bg-[#4FB8A6]/15 border-[#4FB8A6]/40 text-[#4FB8A6]'
                  : 'bg-[#ECFDF5] border-[#A7F3D0] text-[#065F46]'
                : isDarkMode
                ? 'bg-[#D9534F]/15 border-[#D9534F]/40 text-[#D9534F]'
                : 'bg-[#FEF2F2] border-[#FECACA] text-[#991B1B]'
            }`}
          >
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4" />
              <span>{editMessage.text}</span>
            </div>
            <button
              onClick={() => setEditMessage(null)}
              className="text-xs underline font-mono cursor-pointer"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* User Table / List */}
        <div className="space-y-3">
          {filteredAccounts.length === 0 ? (
            <div className="py-8 text-center text-xs font-mono text-[#9AA5AE]">
              No user accounts found matching "{searchQuery}".
            </div>
          ) : (
            filteredAccounts.map((user) => {
              const isEditing = editingUserId === user.id;
              const isShowPass = showPasswordMap[user.id] || false;

              return (
                <div
                  key={user.id}
                  className={`p-4 rounded-xl border transition-all space-y-3 ${
                    user.status === 'disabled'
                      ? isDarkMode
                        ? 'bg-[#141E28]/60 border-[#2A3B4A]/50 opacity-75'
                        : 'bg-[#F8FAFC] border-[#E2E8F0] opacity-80'
                      : isDarkMode
                      ? 'bg-[#1F2E3C] border-[#2A3B4A]'
                      : 'bg-[#F8FAFC] border-[#E2E8F0]'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    {/* User Info Header */}
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-9 h-9 rounded-full flex items-center justify-center font-heading font-black text-sm uppercase ${
                          user.role === 'admin'
                            ? 'bg-[#E8A33D] text-[#101820]'
                            : user.role === 'teacher'
                            ? 'bg-[#2563EB] text-white'
                            : 'bg-[#10B981] text-white'
                        }`}
                      >
                        {user.username.charAt(0)}
                      </div>

                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-heading font-extrabold text-sm">
                            {user.username}
                          </span>

                          {/* Role Tag */}
                          <span
                            className={`px-2 py-0.5 rounded-md text-[10px] font-mono font-bold uppercase tracking-wider ${
                              user.role === 'admin'
                                ? 'bg-amber-500/20 text-amber-500 border border-amber-500/30'
                                : user.role === 'teacher'
                                ? 'bg-blue-500/20 text-blue-500 border border-blue-500/30'
                                : 'bg-emerald-500/20 text-emerald-500 border border-emerald-500/30'
                            }`}
                          >
                            {user.role}
                          </span>

                          {/* Status Tag */}
                          <span
                            className={`px-2 py-0.5 rounded-md text-[10px] font-mono font-bold uppercase tracking-wider flex items-center gap-1 ${
                              user.status === 'active'
                                ? 'bg-emerald-500/20 text-emerald-500 border border-emerald-500/30'
                                : 'bg-red-500/20 text-red-500 border border-red-500/30'
                            }`}
                          >
                            <span
                              className={`w-1.5 h-1.5 rounded-full ${
                                user.status === 'active' ? 'bg-emerald-500' : 'bg-red-500'
                              }`}
                            />
                            {user.status === 'active' ? 'Active' : 'Disabled'}
                          </span>
                        </div>

                        <div className="text-[11px] font-mono text-[#9AA5AE] mt-0.5 flex flex-wrap items-center gap-2">
                          <span>Created: {user.createdAt || 'N/A'}</span>
                          {user.lastLogin && (
                            <>
                              <span>•</span>
                              <span>Last login: {new Date(user.lastLogin).toLocaleDateString()}</span>
                            </>
                          )}
                          {user.plainTextPasswordHint && (
                            <>
                              <span>•</span>
                              <span className="flex items-center gap-1 text-amber-500/90 font-mono">
                                Pass: {isShowPass ? user.plainTextPasswordHint : '••••••••'}
                                <button
                                  type="button"
                                  onClick={() => toggleShowPassword(user.id)}
                                  className="hover:text-amber-400 p-0.5 cursor-pointer ml-1"
                                  title="Toggle password view"
                                >
                                  {isShowPass ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                                </button>
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Quick Action Buttons */}
                    <div className="flex items-center gap-2 self-end sm:self-center">
                      {/* Change Password Toggle */}
                      <button
                        onClick={() => {
                          setEditingUserId(isEditing ? null : user.id);
                          setEditPasswordInput('');
                        }}
                        className={`px-3 py-1.5 rounded-lg text-xs font-heading font-bold flex items-center gap-1.5 transition-all cursor-pointer border ${
                          isEditing
                            ? isDarkMode
                              ? 'bg-[#E8A33D] text-[#101820] border-[#E8A33D]'
                              : 'bg-[#2563EB] text-white border-[#2563EB]'
                            : isDarkMode
                            ? 'bg-[#141E28] border-[#2A3B4A] text-[#F2EFE7] hover:border-[#E8A33D]'
                            : 'bg-white border-[#CBD5E1] text-[#0F172A] hover:border-[#2563EB]'
                        }`}
                      >
                        <Key className="w-3.5 h-3.5" />
                        <span>{isEditing ? 'Cancel' : 'Set Password'}</span>
                      </button>

                      {/* Enable/Disable Access Toggle */}
                      <button
                        onClick={() => handleToggleStatus(user)}
                        title={user.status === 'active' ? 'Disable Access' : 'Enable Access'}
                        className={`px-3 py-1.5 rounded-lg text-xs font-heading font-bold flex items-center gap-1.5 transition-all cursor-pointer border ${
                          user.status === 'active'
                            ? 'bg-amber-500/10 border-amber-500/30 text-amber-500 hover:bg-amber-500/20'
                            : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-500 hover:bg-emerald-500/20'
                        }`}
                      >
                        {user.status === 'active' ? (
                          <>
                            <ShieldOff className="w-3.5 h-3.5" />
                            <span>Disable Access</span>
                          </>
                        ) : (
                          <>
                            <ShieldCheck className="w-3.5 h-3.5" />
                            <span>Enable Access</span>
                          </>
                        )}
                      </button>

                      {/* Delete User */}
                      <button
                        onClick={() => setUserToDelete(user)}
                        className={`p-1.5 rounded-lg transition-all cursor-pointer border ${
                          isDarkMode
                            ? 'bg-red-500/10 border-red-500/30 text-red-400 hover:bg-red-500/20'
                            : 'bg-red-50 border-red-200 text-red-600 hover:bg-red-100'
                        }`}
                        title="Delete User"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Inline Change Password Drawer */}
                  {isEditing && (
                    <div
                      className={`p-3 rounded-lg border mt-2 flex flex-col sm:flex-row items-center gap-2 ${
                        isDarkMode ? 'bg-[#141E28] border-[#2A3B4A]' : 'bg-white border-[#CBD5E1]'
                      }`}
                    >
                      <div className="relative flex-1 w-full">
                        <Lock className="w-3.5 h-3.5 absolute left-3 top-2.5 text-[#9AA5AE]" />
                        <input
                          type="text"
                          value={editPasswordInput}
                          onChange={(e) => setEditPasswordInput(e.target.value)}
                          placeholder={`Enter new password for ${user.username}`}
                          className={`w-full pl-8 pr-3 py-1.5 rounded-md text-xs border font-mono ${
                            isDarkMode
                              ? 'bg-[#1F2E3C] border-[#2A3B4A] text-[#F2EFE7] focus:border-[#E8A33D]'
                              : 'bg-[#F8FAFC] border-[#CBD5E1] text-[#0F172A] focus:border-[#2563EB]'
                          }`}
                        />
                      </div>
                      <button
                        onClick={() => handleSavePassword(user.id)}
                        className={`w-full sm:w-auto px-4 py-1.5 rounded-md text-xs font-bold font-heading transition-all cursor-pointer shrink-0 ${
                          isDarkMode
                            ? 'bg-[#E8A33D] hover:bg-[#D69332] text-[#101820]'
                            : 'bg-[#2563EB] hover:bg-[#1D4ED8] text-white'
                        }`}
                      >
                        Save New Password
                      </button>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Delete User Confirmation Modal */}
      {userToDelete && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div
            className={`max-w-md w-full p-6 rounded-2xl border shadow-2xl animate-scale-in space-y-4 ${
              isDarkMode
                ? 'bg-[#182430] border-[#2A3B4A] text-[#F2EFE7]'
                : 'bg-white border-[#E2E8F0] text-[#0F172A]'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-full bg-red-500/15 text-red-500">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-heading font-black text-lg">Confirm Delete User</h3>
                <p className={`text-xs ${isDarkMode ? 'text-[#9AA5AE]' : 'text-[#64748B]'}`}>
                  This action cannot be undone.
                </p>
              </div>
            </div>

            <p className="text-sm font-medium">
              Are you sure you want to permanently delete the account for{' '}
              <strong className="text-amber-500">"{userToDelete.username}"</strong>?
            </p>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setUserToDelete(null)}
                className={`px-4 py-2 rounded-xl text-xs font-bold font-heading border transition-all cursor-pointer ${
                  isDarkMode
                    ? 'bg-[#1F2E3C] border-[#2A3B4A] text-[#F2EFE7]'
                    : 'bg-[#F8FAFC] border-[#CBD5E1] text-[#0F172A]'
                }`}
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteUser}
                className="px-4 py-2 rounded-xl text-xs font-bold font-heading bg-red-600 hover:bg-red-700 text-white shadow-md cursor-pointer transition-all"
              >
                Yes, Delete User
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
