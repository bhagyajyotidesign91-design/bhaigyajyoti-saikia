import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PortfolioProject, OrderStatus, ProductCategory, DesignStyle } from '../types';
import {
  X,
  Lock,
  LogOut,
  FolderKanban,
  FileText,
  DollarSign,
  ShoppingBag,
  Settings,
  Plus,
  Trash2,
  Edit2,
  Check,
  AlertTriangle,
  Download,
  Upload,
  RefreshCw,
  ExternalLink,
  Eye,
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const {
    isAdminOpen,
    setIsAdminOpen,
    isAdminAuthenticated,
    loginAdmin,
    logoutAdmin,
    settings,
    projects,
    orders,
    updateOrderStatus,
    deleteOrder,
    stagedProjects,
    stagedSettings,
    hasUnpublishedChanges,
    stageProjectUpdate,
    stageProjectAdd,
    stageProjectDelete,
    stageSettingsUpdate,
    publishStagedChanges,
    discardStagedChanges,
    exportBackupData,
    importBackupData,
    resetToDefaults,
  } = useApp();

  const [pinInput, setPinInput] = useState('');
  const [authError, setAuthError] = useState(false);
  const [activeTab, setActiveTab] = useState<'orders' | 'portfolio' | 'content' | 'pricing' | 'settings'>('orders');
  
  // Staging Publish Confirmation modal
  const [showPublishConfirm, setShowPublishConfirm] = useState(false);
  const [publishSuccessNotice, setPublishSuccessNotice] = useState(false);

  // Edit Project Modal state
  const [editingProject, setEditingProject] = useState<PortfolioProject | null>(null);
  const [isNewProject, setIsNewProject] = useState(false);

  // Backup state
  const [backupNotice, setBackupNotice] = useState<string | null>(null);
  const [importJsonText, setImportJsonText] = useState('');

  if (!isAdminOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginAdmin(pinInput)) {
      setAuthError(false);
      setPinInput('');
    } else {
      setAuthError(true);
    }
  };

  const handlePublish = () => {
    publishStagedChanges();
    setShowPublishConfirm(false);
    setPublishSuccessNotice(true);
    setTimeout(() => setPublishSuccessNotice(false), 3000);
  };

  const handleDownloadBackup = () => {
    const dataStr = exportBackupData();
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `bhagyajyoti_portfolio_backup_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
    setBackupNotice('Backup file successfully exported.');
    setTimeout(() => setBackupNotice(null), 3000);
  };

  const handleRestoreBackup = () => {
    if (!importJsonText.trim()) return;
    if (importBackupData(importJsonText)) {
      setBackupNotice('Backup restored successfully!');
      setImportJsonText('');
      setTimeout(() => setBackupNotice(null), 3000);
    } else {
      setBackupNotice('Error: Invalid backup JSON format.');
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-5xl bg-[#16131F] border border-[#272233] rounded-3xl shadow-2xl overflow-hidden my-auto flex flex-col max-h-[90vh]">
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#272233] bg-[#120F1B]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#8B5CF6]/20 text-[#8B5CF6] flex items-center justify-center">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">Private Admin Control Portal</h2>
              <p className="text-[10px] text-slate-400">Single administrator access · English only</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {isAdminAuthenticated && (
              <button
                onClick={logoutAdmin}
                className="text-xs text-rose-400 hover:text-rose-300 flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-rose-500/10 transition-colors"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Logout</span>
              </button>
            )}
            <button
              onClick={() => setIsAdminOpen(false)}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/10"
              aria-label="Close Admin Modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Auth Screen (If not logged in) */}
        {!isAdminAuthenticated ? (
          <div className="p-8 sm:p-12 text-center max-w-md mx-auto my-auto space-y-6">
            <div className="w-14 h-14 rounded-2xl bg-[#0D0B12] border border-[#272233] flex items-center justify-center text-[#8B5CF6] mx-auto">
              <Lock className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">Administrator Verification</h3>
              <p className="text-xs text-slate-400 mt-1">
                Enter your secure administrator PIN to manage portfolio projects, client orders, and site settings.
              </p>
              <p className="text-[11px] text-[#A78BFA] mt-1 font-mono">
                (Default Testing PIN: 1234)
              </p>
            </div>

            {authError && (
              <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs">
                Incorrect security PIN. Please try again.
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <input
                type="password"
                maxLength={8}
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                placeholder="Enter PIN (e.g. 1234)"
                autoFocus
                className="w-full text-center tracking-widest text-lg font-mono px-4 py-3 bg-[#0D0B12] border border-[#272233] rounded-xl text-white placeholder-slate-600 focus:outline-none focus:border-[#8B5CF6]"
              />
              <button
                type="submit"
                className="w-full py-3.5 px-6 text-xs font-bold uppercase tracking-wider text-white bg-[#8B5CF6] hover:bg-[#7C3AED] rounded-xl shadow-lg transition-all"
              >
                Access Dashboard
              </button>
            </form>
          </div>
        ) : (
          /* Authenticated Dashboard */
          <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
            {/* Left Nav Shortcuts */}
            <div className="w-full md:w-56 bg-[#120F1B] border-b md:border-b-0 md:border-r border-[#272233] p-4 flex md:flex-col gap-1.5 overflow-x-auto shrink-0">
              <button
                onClick={() => setActiveTab('orders')}
                className={`flex items-center gap-2.5 px-3.5 py-2.5 text-xs font-semibold rounded-xl text-left whitespace-nowrap transition-colors ${
                  activeTab === 'orders' ? 'bg-[#8B5CF6] text-white' : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Orders ({orders.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('portfolio')}
                className={`flex items-center gap-2.5 px-3.5 py-2.5 text-xs font-semibold rounded-xl text-left whitespace-nowrap transition-colors ${
                  activeTab === 'portfolio' ? 'bg-[#8B5CF6] text-white' : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <FolderKanban className="w-4 h-4" />
                <span>Portfolio ({stagedProjects.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('content')}
                className={`flex items-center gap-2.5 px-3.5 py-2.5 text-xs font-semibold rounded-xl text-left whitespace-nowrap transition-colors ${
                  activeTab === 'content' ? 'bg-[#8B5CF6] text-white' : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <FileText className="w-4 h-4" />
                <span>Site Content</span>
              </button>

              <button
                onClick={() => setActiveTab('pricing')}
                className={`flex items-center gap-2.5 px-3.5 py-2.5 text-xs font-semibold rounded-xl text-left whitespace-nowrap transition-colors ${
                  activeTab === 'pricing' ? 'bg-[#8B5CF6] text-white' : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <DollarSign className="w-4 h-4" />
                <span>Pricing (₹{stagedSettings.adPrice})</span>
              </button>

              <button
                onClick={() => setActiveTab('settings')}
                className={`flex items-center gap-2.5 px-3.5 py-2.5 text-xs font-semibold rounded-xl text-left whitespace-nowrap transition-colors ${
                  activeTab === 'settings' ? 'bg-[#8B5CF6] text-white' : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Settings className="w-4 h-4" />
                <span>Backup & Security</span>
              </button>

              {/* Staged Changes Indicator (Preview -> Confirm -> Publish) */}
              {hasUnpublishedChanges && (
                <div className="mt-auto pt-4 border-t border-white/10 hidden md:block">
                  <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-[11px] mb-2">
                    Unpublished changes staged.
                  </div>
                  <button
                    onClick={() => setShowPublishConfirm(true)}
                    className="w-full py-2 px-3 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 rounded-lg shadow transition-all text-center"
                  >
                    Confirm & Publish
                  </button>
                  <button
                    onClick={discardStagedChanges}
                    className="w-full mt-1.5 py-1 text-[10px] text-slate-400 hover:text-slate-200 text-center"
                  >
                    Discard Changes
                  </button>
                </div>
              )}
            </div>

            {/* Right Work Area */}
            <div className="flex-1 p-6 overflow-y-auto space-y-6">
              {publishSuccessNotice && (
                <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
                  <Check className="w-4 h-4" />
                  <span>Changes successfully published to the live website!</span>
                </div>
              )}

              {/* 1. ORDERS TAB */}
              {activeTab === 'orders' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-white">Received Design Orders</h3>
                      <p className="text-xs text-slate-400">Track client orders, product photos, and status.</p>
                    </div>
                  </div>

                  {orders.length === 0 ? (
                    <div className="p-12 text-center bg-[#0D0B12] rounded-2xl border border-[#272233] space-y-2">
                      <ShoppingBag className="w-8 h-8 text-slate-600 mx-auto" />
                      <div className="text-sm font-semibold text-slate-300">No Orders Received Yet</div>
                      <p className="text-xs text-slate-500 max-w-sm mx-auto">
                        When clients submit the 11-field order form, their structured creative brief will appear here.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {orders.map((ord) => (
                        <div
                          key={ord.id}
                          className="bg-[#0D0B12] border border-[#272233] rounded-2xl p-5 space-y-3"
                        >
                          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/5 pb-3">
                            <div className="flex items-center gap-2">
                              <span className="font-mono text-xs font-bold text-[#8B5CF6]">{ord.id}</span>
                              <span className="text-slate-600">·</span>
                              <span className="text-xs font-semibold text-white">{ord.customerName}</span>
                              <span className="text-slate-600">·</span>
                              <span className="text-xs font-mono text-emerald-400">{ord.whatsappNumber}</span>
                            </div>

                            <div className="flex items-center gap-2">
                              {/* Status Badge & Selector */}
                              <select
                                value={ord.status}
                                onChange={(e) => updateOrderStatus(ord.id, e.target.value as OrderStatus)}
                                className={`text-xs font-semibold px-2.5 py-1 rounded-lg border focus:outline-none ${
                                  ord.status === 'Completed'
                                    ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                                    : ord.status === 'In Progress'
                                    ? 'bg-sky-500/10 border-sky-500/30 text-sky-300'
                                    : 'bg-amber-500/10 border-amber-500/30 text-amber-300'
                                }`}
                              >
                                <option value="New">Status: New</option>
                                <option value="In Progress">Status: In Progress</option>
                                <option value="Completed">Status: Completed</option>
                              </select>

                              <button
                                onClick={() => deleteOrder(ord.id)}
                                title="Delete Order"
                                className="p-1.5 text-slate-500 hover:text-rose-400 transition-colors"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>

                          {/* Order Details Grid */}
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-slate-300">
                            <div>
                              <span className="text-slate-500 block text-[10px]">Product:</span>
                              <span className="font-medium text-white">{ord.productName}</span>
                            </div>
                            <div>
                              <span className="text-slate-500 block text-[10px]">Category & Style:</span>
                              <span>{ord.category} · {ord.designStyle}</span>
                            </div>
                            <div>
                              <span className="text-slate-500 block text-[10px]">Audience & Platform:</span>
                              <span>{ord.targetAudience} · {ord.adPlatform}</span>
                            </div>
                            <div>
                              <span className="text-slate-500 block text-[10px]">Price:</span>
                              <span className="font-bold text-white">₹{ord.totalPrice}</span>
                            </div>
                          </div>

                          {/* Client Photo Previews */}
                          {ord.photos.length > 0 && (
                            <div className="pt-2 border-t border-white/5">
                              <span className="text-[11px] text-slate-400 font-semibold block mb-1.5">
                                Uploaded Product Photos ({ord.photos.length}):
                              </span>
                              <div className="flex gap-2">
                                {ord.photos.map((ph) => (
                                  <a
                                    key={ph.id}
                                    href={ph.dataUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="w-14 h-14 rounded-lg overflow-hidden border border-[#272233] relative group"
                                  >
                                    <img src={ph.dataUrl} alt={ph.name} className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white">
                                      <ExternalLink className="w-3.5 h-3.5" />
                                    </div>
                                  </a>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* 2. PORTFOLIO MANAGEMENT TAB */}
              {activeTab === 'portfolio' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-white">Portfolio Projects</h3>
                      <p className="text-xs text-slate-400">Edit titles, rationales, and badges before publishing.</p>
                    </div>
                    <button
                      onClick={() => {
                        const newP: PortfolioProject = {
                          id: `proj-${Date.now()}`,
                          title: 'New Product Concept Ad',
                          category: 'Fashion',
                          style: 'Modern & Creative',
                          badge: 'Concept Design',
                          tagline: 'Brand Statement',
                          description: 'Detailed advertising description.',
                          designGoal: 'Creative objective and conversion goal.',
                          colorPalette: [{ name: 'Violet', hex: '#8B5CF6' }, { name: 'White', hex: '#FFFFFF' }],
                          targetAudience: 'Online shoppers',
                          rationale: 'Strategic color and layout composition.',
                          creativeTheme: 'sneaker',
                          headlineText: 'NEW RELEASE',
                          subText: 'High quality craft for modern lifestyles',
                          featured: false,
                        };
                        setEditingProject(newP);
                        setIsNewProject(true);
                      }}
                      className="px-3.5 py-2 text-xs font-bold text-white bg-[#8B5CF6] hover:bg-[#7C3AED] rounded-xl flex items-center gap-1.5 shadow"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add Project</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {stagedProjects.map((p) => (
                      <div
                        key={p.id}
                        className="bg-[#0D0B12] border border-[#272233] rounded-2xl p-4 flex flex-col justify-between space-y-3"
                      >
                        <div>
                          <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
                            <span>{p.category} · {p.style}</span>
                            <span className="font-mono text-[10px] uppercase text-[#A78BFA]">{p.badge}</span>
                          </div>
                          <h4 className="text-sm font-bold text-white line-clamp-1">{p.title}</h4>
                          <p className="text-xs text-slate-400 line-clamp-2 mt-1">{p.description}</p>
                        </div>

                        <div className="flex items-center justify-end gap-2 pt-2 border-t border-white/5">
                          <button
                            onClick={() => {
                              setEditingProject(p);
                              setIsNewProject(false);
                            }}
                            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/5 flex items-center gap-1 text-xs"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                            <span>Edit</span>
                          </button>
                          <button
                            onClick={() => stageProjectDelete(p.id)}
                            className="p-1.5 text-rose-400 hover:text-rose-300 rounded-lg hover:bg-rose-500/10 flex items-center gap-1 text-xs"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Delete</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 3. CONTENT MANAGEMENT TAB */}
              {activeTab === 'content' && (
                <div className="space-y-5">
                  <div>
                    <h3 className="text-lg font-bold text-white">Site Copy & Contact Channels</h3>
                    <p className="text-xs text-slate-400">Updates are staged. Click Confirm & Publish to push live.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-300">Designer Brand Name</label>
                      <input
                        type="text"
                        value={stagedSettings.brandName}
                        onChange={(e) => stageSettingsUpdate({ brandName: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-[#0D0B12] border border-[#272233] rounded-xl text-xs text-white"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-300">Professional Role Title</label>
                      <input
                        type="text"
                        value={stagedSettings.roleTitle}
                        onChange={(e) => stageSettingsUpdate({ roleTitle: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-[#0D0B12] border border-[#272233] rounded-xl text-xs text-white"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300">Hero Main Headline</label>
                    <input
                      type="text"
                      value={stagedSettings.heroHeadline}
                      onChange={(e) => stageSettingsUpdate({ heroHeadline: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#0D0B12] border border-[#272233] rounded-xl text-xs text-white"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300">Hero Subtitle</label>
                    <input
                      type="text"
                      value={stagedSettings.heroSubtitle}
                      onChange={(e) => stageSettingsUpdate({ heroSubtitle: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#0D0B12] border border-[#272233] rounded-xl text-xs text-white"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-300">WhatsApp Business Number</label>
                      <input
                        type="text"
                        value={stagedSettings.whatsappNumber}
                        onChange={(e) => stageSettingsUpdate({ whatsappNumber: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-[#0D0B12] border border-[#272233] rounded-xl text-xs text-white"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-300">Instagram Handle</label>
                      <input
                        type="text"
                        value={stagedSettings.instagramHandle}
                        onChange={(e) => stageSettingsUpdate({ instagramHandle: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-[#0D0B12] border border-[#272233] rounded-xl text-xs text-white"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300">About Section Introduction</label>
                    <textarea
                      rows={4}
                      value={stagedSettings.aboutBio}
                      onChange={(e) => stageSettingsUpdate({ aboutBio: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#0D0B12] border border-[#272233] rounded-xl text-xs text-white resize-none"
                    />
                  </div>
                </div>
              )}

              {/* 4. PRICING MANAGEMENT TAB */}
              {activeTab === 'pricing' && (
                <div className="space-y-5 max-w-lg">
                  <div>
                    <h3 className="text-lg font-bold text-white">Pricing & Turnaround Settings</h3>
                    <p className="text-xs text-slate-400">Control the single core offering and delivery timeframe.</p>
                  </div>

                  <div className="space-y-4 bg-[#0D0B12] p-5 rounded-2xl border border-[#272233]">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-300">Ad Design Price (₹ INR)</label>
                      <input
                        type="number"
                        min={1}
                        value={stagedSettings.adPrice}
                        onChange={(e) => stageSettingsUpdate({ adPrice: Number(e.target.value) })}
                        className="w-full px-3.5 py-2.5 bg-[#16131F] border border-[#272233] rounded-xl text-sm font-bold text-white"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-300">Turnaround Guarantee (Hours)</label>
                      <input
                        type="number"
                        min={1}
                        value={stagedSettings.deliveryTimeHours}
                        onChange={(e) => stageSettingsUpdate({ deliveryTimeHours: Number(e.target.value) })}
                        className="w-full px-3.5 py-2.5 bg-[#16131F] border border-[#272233] rounded-xl text-sm font-bold text-white"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* 5. SETTINGS, BACKUP & RESTORATION */}
              {activeTab === 'settings' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-bold text-white">Backup, Restoration & Security</h3>
                    <p className="text-xs text-slate-400">
                      Export full system data backups and manage administrator security PIN.
                    </p>
                  </div>

                  {backupNotice && (
                    <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs">
                      {backupNotice}
                    </div>
                  )}

                  {/* Change Admin PIN */}
                  <div className="p-5 rounded-2xl bg-[#0D0B12] border border-[#272233] space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-white">Change Admin Security PIN</h4>
                    <div className="flex gap-3 max-w-sm">
                      <input
                        type="text"
                        value={stagedSettings.adminPin}
                        onChange={(e) => stageSettingsUpdate({ adminPin: e.target.value })}
                        placeholder="New PIN"
                        className="px-3.5 py-2 bg-[#16131F] border border-[#272233] rounded-xl text-xs text-white font-mono"
                      />
                      <span className="text-[11px] text-slate-500 self-center">Remember your PIN</span>
                    </div>
                  </div>

                  {/* Backup Export */}
                  <div className="p-5 rounded-2xl bg-[#0D0B12] border border-[#272233] space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-white">Daily System Backup</h4>
                    <p className="text-xs text-slate-400">
                      Export projects, settings, and orders to a JSON archive for off-site backup.
                    </p>
                    <button
                      onClick={handleDownloadBackup}
                      className="px-4 py-2.5 bg-[#8B5CF6] hover:bg-[#7C3AED] text-white text-xs font-bold rounded-xl flex items-center gap-2 shadow"
                    >
                      <Download className="w-4 h-4" />
                      <span>Download JSON Backup Archive</span>
                    </button>
                  </div>

                  {/* Backup Restore Test */}
                  <div className="p-5 rounded-2xl bg-[#0D0B12] border border-[#272233] space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-white">Test Backup Restore</h4>
                    <p className="text-xs text-slate-400">
                      Paste a valid backup JSON string below to verify restoration capability before launch.
                    </p>
                    <textarea
                      rows={3}
                      value={importJsonText}
                      onChange={(e) => setImportJsonText(e.target.value)}
                      placeholder='Paste JSON backup here {"version":"1.0", ...}'
                      className="w-full px-3 py-2 bg-[#16131F] border border-[#272233] rounded-xl text-xs text-slate-300 font-mono resize-none"
                    />
                    <button
                      onClick={handleRestoreBackup}
                      disabled={!importJsonText.trim()}
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white text-xs font-bold rounded-xl flex items-center gap-2"
                    >
                      <Upload className="w-4 h-4" />
                      <span>Restore from JSON</span>
                    </button>
                  </div>

                  {/* Reset Defaults */}
                  <div className="p-5 rounded-2xl bg-[#0D0B12] border border-rose-500/20 space-y-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-rose-400">Reset to Initial Concept Defaults</h4>
                    <p className="text-xs text-slate-500">
                      Clears custom localStorage edits and restores initial 8 concept projects and default ₹99 settings.
                    </p>
                    <button
                      onClick={() => {
                        if (confirm('Are you sure you want to restore initial demo defaults?')) {
                          resetToDefaults();
                        }
                      }}
                      className="px-4 py-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 text-xs font-bold rounded-xl border border-rose-500/30"
                    >
                      Reset to Factory Defaults
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Publish Confirmation Modal */}
        {showPublishConfirm && (
          <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="bg-[#16131F] border border-[#272233] rounded-2xl p-6 max-w-md w-full space-y-4">
              <div className="flex items-center gap-2 text-amber-400">
                <AlertTriangle className="w-5 h-5" />
                <h4 className="text-base font-bold text-white">Confirm & Publish Changes</h4>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                You are about to publish all staged edits to the live website. Public visitors will immediately see the updated portfolio and content.
              </p>
              <div className="flex justify-end gap-3 pt-2">
                <button
                  onClick={() => setShowPublishConfirm(false)}
                  className="px-4 py-2 text-xs text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  onClick={handlePublish}
                  className="px-5 py-2.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 rounded-xl shadow"
                >
                  Yes, Publish Now
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Edit Project Dialog */}
        {editingProject && (
          <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="bg-[#16131F] border border-[#272233] rounded-2xl p-6 max-w-lg w-full space-y-4 max-h-[85vh] overflow-y-auto">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <h4 className="text-base font-bold text-white">
                  {isNewProject ? 'Add New Project' : 'Edit Project'}
                </h4>
                <button onClick={() => setEditingProject(null)} className="text-slate-400 hover:text-white">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="text-slate-400 block mb-1">Title</label>
                  <input
                    type="text"
                    value={editingProject.title}
                    onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                    className="w-full px-3 py-2 bg-[#0D0B12] border border-[#272233] rounded-lg text-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-slate-400 block mb-1">Category</label>
                    <select
                      value={editingProject.category}
                      onChange={(e) => setEditingProject({ ...editingProject, category: e.target.value as ProductCategory })}
                      className="w-full px-3 py-2 bg-[#0D0B12] border border-[#272233] rounded-lg text-white"
                    >
                      <option value="Fashion">Fashion</option>
                      <option value="Food">Food</option>
                      <option value="Beauty">Beauty</option>
                      <option value="Electronics">Electronics</option>
                      <option value="Other Products">Other Products</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-slate-400 block mb-1">Design Style</label>
                    <select
                      value={editingProject.style}
                      onChange={(e) => setEditingProject({ ...editingProject, style: e.target.value as DesignStyle })}
                      className="w-full px-3 py-2 bg-[#0D0B12] border border-[#272233] rounded-lg text-white"
                    >
                      <option value="Modern & Creative">Modern & Creative</option>
                      <option value="Premium & Luxury">Premium & Luxury</option>
                      <option value="Minimal & Clean">Minimal & Clean</option>
                      <option value="Bold Sale/Offer">Bold Sale/Offer</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-slate-400 block mb-1">Badge (Must be Concept Design or Demo Work)</label>
                  <select
                    value={editingProject.badge}
                    onChange={(e) => setEditingProject({ ...editingProject, badge: e.target.value as 'Concept Design' | 'Demo Work' })}
                    className="w-full px-3 py-2 bg-[#0D0B12] border border-[#272233] rounded-lg text-white"
                  >
                    <option value="Concept Design">Concept Design</option>
                    <option value="Demo Work">Demo Work</option>
                  </select>
                </div>

                <div>
                  <label className="text-slate-400 block mb-1">Description</label>
                  <textarea
                    rows={2}
                    value={editingProject.description}
                    onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
                    className="w-full px-3 py-2 bg-[#0D0B12] border border-[#272233] rounded-lg text-white resize-none"
                  />
                </div>

                <div>
                  <label className="text-slate-400 block mb-1">Design Goal</label>
                  <input
                    type="text"
                    value={editingProject.designGoal}
                    onChange={(e) => setEditingProject({ ...editingProject, designGoal: e.target.value })}
                    className="w-full px-3 py-2 bg-[#0D0B12] border border-[#272233] rounded-lg text-white"
                  />
                </div>

                <div>
                  <label className="text-slate-400 block mb-1">Design Rationale</label>
                  <input
                    type="text"
                    value={editingProject.rationale}
                    onChange={(e) => setEditingProject({ ...editingProject, rationale: e.target.value })}
                    className="w-full px-3 py-2 bg-[#0D0B12] border border-[#272233] rounded-lg text-white"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-white/10">
                <button
                  onClick={() => setEditingProject(null)}
                  className="px-4 py-2 text-xs text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    if (isNewProject) {
                      stageProjectAdd(editingProject);
                    } else {
                      stageProjectUpdate(editingProject);
                    }
                    setEditingProject(null);
                  }}
                  className="px-5 py-2 text-xs font-bold text-white bg-[#8B5CF6] hover:bg-[#7C3AED] rounded-xl"
                >
                  Save to Staging
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
