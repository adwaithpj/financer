import { UserRole } from '@/types/userRole';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CommonState {
  name: string;
  isLoading: boolean;
  role: UserRole;
  search: string;
  sortBy: 'date' | 'amount';
  sortOrder: 'asc' | 'desc';
  dateFrom: string;
  dateTo: string;
  groupByMonth: boolean;
  collapsed: boolean;
  /** Slide-out nav open (screens below lg breakpoint). */
  mobileNavOpen: boolean;
  welcomeMessage: string;

  setName: (n: string) => void;
  setIsLoading: (isLoading: boolean) => void;
  setRole: (role: UserRole) => void;
  setSearch: (search: string) => void;
  setSortBy: (sortBy: 'date' | 'amount') => void;
  setSortOrder: (sortOrder: 'asc' | 'desc') => void;
  setDateFrom: (dateFrom: string) => void;
  setDateTo: (dateTo: string) => void;
  setGroupByMonth: (groupByMonth: boolean) => void;
  setCollapsed: (collapsed: boolean) => void;
  setMobileNavOpen: (open: boolean) => void;
  setWelcomeMessage: (welcomeMessage: string) => void;
}

export const useCommonStore = create<CommonState>()(
  persist(
    (set) => ({
      name: '',
      isLoading: false,
      role: 'viewer',
      search: '',
      sortBy: 'date',
      sortOrder: 'desc',
      dateFrom: '',
      dateTo: '',
      groupByMonth: false,
      collapsed: false,
      mobileNavOpen: false,
      welcomeMessage: '',

      setName: (n: string) => set({ name: n }),
      setIsLoading: (isLoading) => set({ isLoading }),
      setRole: (role) => set({ role }),
      setSearch: (search) => set({ search }),
      setSortBy: (sortBy) => set({ sortBy }),
      setSortOrder: (sortOrder) => set({ sortOrder }),
      setDateFrom: (dateFrom) => set({ dateFrom }),
      setDateTo: (dateTo) => set({ dateTo }),
      setGroupByMonth: (groupByMonth) => set({ groupByMonth }),
      setCollapsed: (collapsed) => set({ collapsed }),
      setMobileNavOpen: (mobileNavOpen) => set({ mobileNavOpen }),
      setWelcomeMessage: (welcomeMessage) => set({ welcomeMessage }),
    }),
    {
      name: 'common-storage',
      partialize: (state) => ({
        role: state.role,
        groupByMonth: state.groupByMonth,
        welcomeMessage: state.welcomeMessage,
      }),
    }
  )
);
