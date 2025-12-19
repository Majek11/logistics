"use client";

import { useState } from 'react';
import {
    Settings,
    Layout,
    Mail,
    Users,
    Save,
    Globe,
    Shield,
    Bell
} from 'lucide-react';
import { toast } from 'react-hot-toast';

type TabId = 'general' | 'content' | 'email' | 'users';

export default function AdminSettingsPage() {
    const [activeTab, setActiveTab] = useState<TabId>('general');
    const [loading, setLoading] = useState(false);

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));

        setLoading(false);
        toast.success('Settings saved successfully');
    };

    const tabs = [
        { id: 'general', label: 'General', icon: Settings },
        { id: 'content', label: 'Site Content', icon: Layout },
        { id: 'email', label: 'Email', icon: Mail },
        { id: 'users', label: 'Users', icon: Users },
    ];

    return (
        <div className="max-w-5xl mx-auto">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
                    <p className="text-gray-500 mt-1">Manage your application preferences</p>
                </div>
                <button
                    onClick={handleSave}
                    disabled={loading}
                    className="flex items-center gap-2 bg-[#E55D2C] text-white px-6 py-2.5 rounded-xl hover:bg-[#ff4444] transition-all font-semibold disabled:opacity-50"
                >
                    <Save size={20} />
                    {loading ? 'Saving...' : 'Save Changes'}
                </button>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Sidebar Navigation */}
                <div className="w-full lg:w-64 flex-shrink-0">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <nav className="flex flex-col p-2">
                            {tabs.map((tab) => {
                                const Icon = tab.icon;
                                return (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id as TabId)}
                                        className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${activeTab === tab.id
                                            ? 'bg-orange-50 text-[#E55D2C]'
                                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                            }`}
                                    >
                                        <Icon size={18} />
                                        {tab.label}
                                    </button>
                                );
                            })}
                        </nav>
                    </div>
                </div>

                {/* Content Area */}
                <div className="flex-1">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
                        {activeTab === 'general' && (
                            <div className="space-y-6">
                                <h2 className="text-xl font-bold text-gray-900 mb-6">General Settings</h2>
                                <div className="grid gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Company Name
                                        </label>
                                        <input
                                            type="text"
                                            defaultValue="Kenny Logistics"
                                            className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#E55D2C]/20 focus:border-[#E55D2C] text-gray-900"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Support Email
                                        </label>
                                        <input
                                            type="email"
                                            defaultValue="support@kennylogistics.com"
                                            className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#E55D2C]/20 focus:border-[#E55D2C] text-gray-900"
                                        />
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Currency
                                            </label>
                                            <select className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#E55D2C]/20 focus:border-[#E55D2C] text-gray-900">
                                                <option>USD ($)</option>
                                                <option>EUR (€)</option>
                                                <option>GBP (£)</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Timezone
                                            </label>
                                            <select className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#E55D2C]/20 focus:border-[#E55D2C] text-gray-900">
                                                <option>UTC</option>
                                                <option>EST</option>
                                                <option>PST</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'content' && (
                            <div className="space-y-6">
                                <h2 className="text-xl font-bold text-gray-900 mb-6">Site Content</h2>
                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Hero Title
                                        </label>
                                        <input
                                            type="text"
                                            defaultValue="Global Logistics Solutions"
                                            className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#E55D2C]/20 focus:border-[#E55D2C] text-gray-900"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Hero Subtitle
                                        </label>
                                        <textarea
                                            rows={3}
                                            defaultValue="Fast, reliable, and secure shipping services worldwide."
                                            className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#E55D2C]/20 focus:border-[#E55D2C] text-gray-900"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Call to Action Text
                                        </label>
                                        <input
                                            type="text"
                                            defaultValue="Track Shipment"
                                            className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#E55D2C]/20 focus:border-[#E55D2C] text-gray-900"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'email' && (
                            <div className="space-y-6">
                                <h2 className="text-xl font-bold text-gray-900 mb-6">Email Configuration</h2>
                                <div className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                SMTP Host
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="smtp.example.com"
                                                className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#E55D2C]/20 focus:border-[#E55D2C] text-gray-900"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                SMTP Port
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="587"
                                                className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#E55D2C]/20 focus:border-[#E55D2C] text-gray-900"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            SMTP User
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="user@example.com"
                                            className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#E55D2C]/20 focus:border-[#E55D2C] text-gray-900"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            SMTP Password
                                        </label>
                                        <input
                                            type="password"
                                            placeholder="••••••••"
                                            className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#E55D2C]/20 focus:border-[#E55D2C] text-gray-900"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'users' && (
                            <div className="space-y-6">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-xl font-bold text-gray-900">User Management</h2>
                                    <button className="text-sm text-[#E55D2C] font-semibold hover:underline">
                                        + Add User
                                    </button>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Name</th>
                                                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Email</th>
                                                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Role</th>
                                                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-100">
                                            {[
                                                { name: 'Admin User', email: 'admin@kenny.com', role: 'Admin', status: 'Active' },
                                                { name: 'Support Team', email: 'support@kenny.com', role: 'Editor', status: 'Active' },
                                            ].map((user, i) => (
                                                <tr key={i} className="hover:bg-gray-50">
                                                    <td className="px-4 py-3 text-sm font-medium text-gray-900">{user.name}</td>
                                                    <td className="px-4 py-3 text-sm text-gray-600">{user.email}</td>
                                                    <td className="px-4 py-3 text-sm text-gray-600">{user.role}</td>
                                                    <td className="px-4 py-3">
                                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                            {user.status}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
