import React, { createContext, useContext, useState, useEffect } from 'react';
import { PortfolioProject, SiteSettings, OrderSubmission, ContactInquiry, OrderStatus } from '../types';
import { INITIAL_PROJECTS, INITIAL_SETTINGS } from '../data/initialData';

interface OrderPrefill {
  category?: PortfolioProject['category'];
  designStyle?: PortfolioProject['style'];
  productName?: string;
}

interface AppContextType {
  projects: PortfolioProject[];
  settings: SiteSettings;
  orders: OrderSubmission[];
  inquiries: ContactInquiry[];
  
  // Staging for Preview -> Confirm -> Publish
  stagedProjects: PortfolioProject[];
  stagedSettings: SiteSettings;
  hasUnpublishedChanges: boolean;

  // UI state
  activeModalProject: PortfolioProject | null;
  setActiveModalProject: (p: PortfolioProject | null) => void;
  orderPrefill: OrderPrefill | null;
  setOrderPrefill: (prefill: OrderPrefill | null) => void;
  isAdminOpen: boolean;
  setIsAdminOpen: (open: boolean) => void;
  isAdminAuthenticated: boolean;
  isPrivacyOpen: boolean;
  setIsPrivacyOpen: (open: boolean) => void;

  // Actions
  loginAdmin: (pin: string) => boolean;
  logoutAdmin: () => void;
  submitOrder: (order: Omit<OrderSubmission, 'id' | 'createdAt' | 'status'>) => OrderSubmission;
  updateOrderStatus: (orderId: string, status: OrderStatus, notes?: string) => void;
  deleteOrder: (orderId: string) => void;
  submitInquiry: (inquiry: Omit<ContactInquiry, 'id' | 'createdAt'>) => void;
  
  // Admin Editing (Staged)
  stageProjectUpdate: (project: PortfolioProject) => void;
  stageProjectAdd: (project: PortfolioProject) => void;
  stageProjectDelete: (id: string) => void;
  stageSettingsUpdate: (settings: Partial<SiteSettings>) => void;
  publishStagedChanges: () => void;
  discardStagedChanges: () => void;
  
  // Backup & Restore
  exportBackupData: () => string;
  importBackupData: (jsonStr: string) => boolean;
  resetToDefaults: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEYS = {
  PROJECTS: 'bs_portfolio_projects_v1',
  SETTINGS: 'bs_site_settings_v1',
  ORDERS: 'bs_orders_queue_v1',
  INQUIRIES: 'bs_inquiries_v1',
  ADMIN_AUTH: 'bs_admin_auth_v1',
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Live published state
  const [projects, setProjects] = useState<PortfolioProject[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PROJECTS);
      return saved ? JSON.parse(saved) : INITIAL_PROJECTS;
    } catch {
      return INITIAL_PROJECTS;
    }
  });

  const [settings, setSettings] = useState<SiteSettings>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      return saved ? JSON.parse(saved) : INITIAL_SETTINGS;
    } catch {
      return INITIAL_SETTINGS;
    }
  });

  const [orders, setOrders] = useState<OrderSubmission[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ORDERS);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [inquiries, setInquiries] = useState<ContactInquiry[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.INQUIRIES);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Staged modifications in Admin
  const [stagedProjects, setStagedProjects] = useState<PortfolioProject[]>(projects);
  const [stagedSettings, setStagedSettings] = useState<SiteSettings>(settings);
  const [hasUnpublishedChanges, setHasUnpublishedChanges] = useState(false);

  // Sync staging with live initially
  useEffect(() => {
    setStagedProjects(projects);
  }, [projects]);

  useEffect(() => {
    setStagedSettings(settings);
  }, [settings]);

  // Persist live updates
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(projects));
    } catch (e) {
      console.error('Failed to save projects to localStorage', e);
    }
  }, [projects]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
    } catch (e) {
      console.error('Failed to save settings to localStorage', e);
    }
  }, [settings]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
    } catch (e) {
      console.error('Failed to save orders to localStorage', e);
    }
  }, [orders]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(inquiries));
    } catch (e) {
      console.error('Failed to save inquiries to localStorage', e);
    }
  }, [inquiries]);

  // UI state
  const [activeModalProject, setActiveModalProject] = useState<PortfolioProject | null>(null);
  const [orderPrefill, setOrderPrefill] = useState<OrderPrefill | null>(null);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem(STORAGE_KEYS.ADMIN_AUTH) === 'true';
  });
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);

  const loginAdmin = (pin: string): boolean => {
    if (pin.trim() === settings.adminPin.trim()) {
      setIsAdminAuthenticated(true);
      sessionStorage.setItem(STORAGE_KEYS.ADMIN_AUTH, 'true');
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminAuthenticated(false);
    sessionStorage.removeItem(STORAGE_KEYS.ADMIN_AUTH);
  };

  const submitOrder = (orderData: Omit<OrderSubmission, 'id' | 'createdAt' | 'status'>): OrderSubmission => {
    const newOrder: OrderSubmission = {
      ...orderData,
      id: `ORD-${Date.now().toString().slice(-6)}`,
      createdAt: new Date().toISOString(),
      status: 'New',
    };
    setOrders((prev) => [newOrder, ...prev]);
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus, notes?: string) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status, ...(notes !== undefined ? { notes } : {}) } : o))
    );
  };

  const deleteOrder = (orderId: string) => {
    setOrders((prev) => prev.filter((o) => o.id !== orderId));
  };

  const submitInquiry = (inquiryData: Omit<ContactInquiry, 'id' | 'createdAt'>) => {
    const newInquiry: ContactInquiry = {
      ...inquiryData,
      id: `INQ-${Date.now().toString().slice(-6)}`,
      createdAt: new Date().toISOString(),
    };
    setInquiries((prev) => [newInquiry, ...prev]);
  };

  // Staging actions
  const stageProjectUpdate = (updated: PortfolioProject) => {
    setStagedProjects((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
    setHasUnpublishedChanges(true);
  };

  const stageProjectAdd = (newProj: PortfolioProject) => {
    setStagedProjects((prev) => [newProj, ...prev]);
    setHasUnpublishedChanges(true);
  };

  const stageProjectDelete = (id: string) => {
    setStagedProjects((prev) => prev.filter((p) => p.id !== id));
    setHasUnpublishedChanges(true);
  };

  const stageSettingsUpdate = (partial: Partial<SiteSettings>) => {
    setStagedSettings((prev) => ({ ...prev, ...partial }));
    setHasUnpublishedChanges(true);
  };

  const publishStagedChanges = () => {
    setProjects(stagedProjects);
    setSettings(stagedSettings);
    setHasUnpublishedChanges(false);
  };

  const discardStagedChanges = () => {
    setStagedProjects(projects);
    setStagedSettings(settings);
    setHasUnpublishedChanges(false);
  };

  const exportBackupData = (): string => {
    const backup = {
      version: '1.0',
      exportDate: new Date().toISOString(),
      settings,
      projects,
      orders,
      inquiries,
    };
    return JSON.stringify(backup, null, 2);
  };

  const importBackupData = (jsonStr: string): boolean => {
    try {
      const parsed = JSON.parse(jsonStr);
      if (parsed.projects && Array.isArray(parsed.projects)) {
        setProjects(parsed.projects);
        setStagedProjects(parsed.projects);
      }
      if (parsed.settings && typeof parsed.settings === 'object') {
        setSettings(parsed.settings);
        setStagedSettings(parsed.settings);
      }
      if (parsed.orders && Array.isArray(parsed.orders)) {
        setOrders(parsed.orders);
      }
      if (parsed.inquiries && Array.isArray(parsed.inquiries)) {
        setInquiries(parsed.inquiries);
      }
      setHasUnpublishedChanges(false);
      return true;
    } catch (e) {
      console.error('Failed to parse backup JSON', e);
      return false;
    }
  };

  const resetToDefaults = () => {
    setProjects(INITIAL_PROJECTS);
    setStagedProjects(INITIAL_PROJECTS);
    setSettings(INITIAL_SETTINGS);
    setStagedSettings(INITIAL_SETTINGS);
    setOrders([]);
    setInquiries([]);
    setHasUnpublishedChanges(false);
    localStorage.removeItem(STORAGE_KEYS.PROJECTS);
    localStorage.removeItem(STORAGE_KEYS.SETTINGS);
    localStorage.removeItem(STORAGE_KEYS.ORDERS);
    localStorage.removeItem(STORAGE_KEYS.INQUIRIES);
  };

  return (
    <AppContext.Provider
      value={{
        projects,
        settings,
        orders,
        inquiries,
        stagedProjects,
        stagedSettings,
        hasUnpublishedChanges,
        activeModalProject,
        setActiveModalProject,
        orderPrefill,
        setOrderPrefill,
        isAdminOpen,
        setIsAdminOpen,
        isAdminAuthenticated,
        isPrivacyOpen,
        setIsPrivacyOpen,
        loginAdmin,
        logoutAdmin,
        submitOrder,
        updateOrderStatus,
        deleteOrder,
        submitInquiry,
        stageProjectUpdate,
        stageProjectAdd,
        stageProjectDelete,
        stageSettingsUpdate,
        publishStagedChanges,
        discardStagedChanges,
        exportBackupData,
        importBackupData,
        resetToDefaults,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
