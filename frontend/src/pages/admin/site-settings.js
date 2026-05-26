import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { FaArrowLeft, FaPlus, FaSave, FaRedoAlt, FaSearch } from "react-icons/fa";
import { defaultPublicSettings, getApiBase } from "../../lib/siteSettings";

const emptyNewSetting = {
  key: "",
  value: "",
  section: "general",
  description: "",
  type: "text",
  isPublic: true,
};

export default function SiteSettingsPage() {
  const router = useRouter();
  const apiBase = getApiBase();
  const [loading, setLoading] = useState(true);
  const [savingKey, setSavingKey] = useState(null);
  const [settings, setSettings] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [newSetting, setNewSetting] = useState(emptyNewSetting);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const isAuth = localStorage.getItem("adminToken");
      if (!isAuth) {
        router.push("/admin/login");
        return;
      }
    }

    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await fetch(`${apiBase}/api/site-settings/admin`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      setSettings(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching site settings:", error);
      alert("Failed to fetch site settings");
    } finally {
      setLoading(false);
    }
  };

  const saveSetting = async (setting) => {
    setSavingKey(setting.key);
    try {
      const token = localStorage.getItem("adminToken");
      const response = await fetch(`${apiBase}/api/site-settings/${encodeURIComponent(setting.key)}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(setting),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.error || "Failed to save setting");
      }

      await fetchSettings();
      alert(`Saved ${setting.key}`);
    } catch (error) {
      console.error("Error saving site setting:", error);
      alert(error.message || "Failed to save site setting");
    } finally {
      setSavingKey(null);
    }
  };

  const addSetting = async (e) => {
    e.preventDefault();
    if (!newSetting.key.trim()) {
      alert("Setting key is required");
      return;
    }
    await saveSetting(newSetting);
    setNewSetting(emptyNewSetting);
  };

  const resetDefaults = async () => {
    if (!confirm("Reset all site settings to the default values?")) return;
    try {
      const token = localStorage.getItem("adminToken");
      const response = await fetch(`${apiBase}/api/site-settings/reset`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.error || "Failed to reset settings");
      }
      await fetchSettings();
      alert("Site settings restored to defaults");
    } catch (error) {
      console.error("Error resetting site settings:", error);
      alert(error.message || "Failed to reset settings");
    }
  };

  const filteredSettings = useMemo(() => {
    const term = searchTerm.toLowerCase();
    return settings.filter((setting) => {
      return (
        setting.key.toLowerCase().includes(term) ||
        (setting.section || "").toLowerCase().includes(term) ||
        (setting.description || "").toLowerCase().includes(term) ||
        String(setting.value || "").toLowerCase().includes(term)
      );
    });
  }, [settings, searchTerm]);

  const groupedSettings = useMemo(() => {
    return filteredSettings.reduce((acc, setting) => {
      const section = setting.section || "general";
      if (!acc[section]) acc[section] = [];
      acc[section].push(setting);
      return acc;
    }, {});
  }, [filteredSettings]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="h-16 w-16 rounded-full border-b-2 border-blue-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-4">
            <Link href="/admin/dashboard">
              <button className="p-3 bg-white rounded-lg shadow hover:bg-gray-50">
                <FaArrowLeft />
              </button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Site Settings</h1>
              <p className="text-gray-600">Edit live website content, contact details, and branding without code changes.</p>
            </div>
          </div>
          <div className="flex gap-3">
            <button
              onClick={resetDefaults}
              className="flex items-center gap-2 px-5 py-3 bg-white text-gray-800 rounded-lg shadow hover:bg-gray-50"
            >
              <FaRedoAlt /> Reset Defaults
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-4">
          <div className="relative">
            <FaSearch className="absolute left-3 top-4 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by key, section, or text..."
              className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Create or Update Setting</h2>
            <form onSubmit={addSetting} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Key</label>
                  <input
                    type="text"
                    required
                    value={newSetting.key}
                    onChange={(e) => setNewSetting({ ...newSetting, key: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                    placeholder="heroTitle"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Section</label>
                  <input
                    type="text"
                    value={newSetting.section}
                    onChange={(e) => setNewSetting({ ...newSetting, section: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                    placeholder="home"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                <textarea
                  rows="2"
                  value={newSetting.description}
                  onChange={(e) => setNewSetting({ ...newSetting, description: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                  placeholder="Where this setting is used"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Value</label>
                <textarea
                  rows="4"
                  value={newSetting.value}
                  onChange={(e) => setNewSetting({ ...newSetting, value: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                  placeholder="Editable text or JSON"
                />
              </div>

              <div className="grid md:grid-cols-3 gap-4 items-center">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Type</label>
                  <select
                    value={newSetting.type}
                    onChange={(e) => setNewSetting({ ...newSetting, type: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                  >
                    <option value="text">Text</option>
                    <option value="textarea">Textarea</option>
                    <option value="json">JSON</option>
                  </select>
                </div>
                <label className="flex items-center gap-3 mt-7 md:mt-0">
                  <input
                    type="checkbox"
                    checked={newSetting.isPublic}
                    onChange={(e) => setNewSetting({ ...newSetting, isPublic: e.target.checked })}
                    className="h-4 w-4"
                  />
                  <span className="text-sm font-semibold text-gray-700">Public</span>
                </label>
                <div className="md:justify-self-end mt-2 md:mt-7">
                  <button
                    type="submit"
                    disabled={savingKey === newSetting.key}
                    className="flex items-center gap-2 px-5 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow disabled:opacity-60"
                  >
                    <FaPlus /> {savingKey === newSetting.key ? "Saving..." : "Save Setting"}
                  </button>
                </div>
              </div>
            </form>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Live Settings Overview</h2>
            <div className="space-y-3 text-sm text-gray-600">
              <div className="p-4 rounded-lg bg-blue-50">
                <div className="font-semibold text-blue-900">Homepage copy</div>
                <div>{defaultPublicSettings.heroTitle}</div>
              </div>
              <div className="p-4 rounded-lg bg-green-50">
                <div className="font-semibold text-green-900">Footer / contact</div>
                <div>Address, phone, helpline, email, and copyright are editable here.</div>
              </div>
              <div className="p-4 rounded-lg bg-yellow-50">
                <div className="font-semibold text-yellow-900">Public visibility</div>
                <div>Mark a setting public to expose it through the website API.</div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {Object.keys(groupedSettings).length === 0 ? (
            <div className="bg-white rounded-xl shadow p-6 text-gray-600">No settings found.</div>
          ) : (
            Object.entries(groupedSettings).map(([section, items]) => (
              <div key={section} className="bg-white rounded-xl shadow p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4 capitalize">{section}</h2>
                <div className="grid gap-4">
                  {items.map((setting) => (
                    <SettingRow
                      key={setting.key}
                      setting={setting}
                      onSave={saveSetting}
                      saving={savingKey === setting.key}
                      onChange={(updated) => {
                        setSettings((current) => current.map((row) => (row.key === setting.key ? updated : row)));
                      }}
                    />
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

function SettingRow({ setting, onSave, saving, onChange }) {
  const [local, setLocal] = useState(setting);

  useEffect(() => {
    setLocal(setting);
  }, [setting]);

  const handleChange = (field, value) => {
    const updated = { ...local, [field]: value };
    setLocal(updated);
    onChange(updated);
  };

  return (
    <div className="border rounded-xl p-4 bg-gray-50">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold uppercase text-gray-500 mb-2">Key</label>
          <input
            value={local.key}
            disabled
            className="w-full px-4 py-2 border rounded-lg bg-gray-100 text-gray-600"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold uppercase text-gray-500 mb-2">Section</label>
          <input
            value={local.section || ""}
            onChange={(e) => handleChange("section", e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4 mt-4">
        <div>
          <label className="block text-xs font-semibold uppercase text-gray-500 mb-2">Description</label>
          <textarea
            rows="2"
            value={local.description || ""}
            onChange={(e) => handleChange("description", e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold uppercase text-gray-500 mb-2">Value</label>
          <textarea
            rows="2"
            value={local.value || ""}
            onChange={(e) => handleChange("value", e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 mt-4">
        <div className="flex items-center gap-4 text-sm">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={Boolean(local.isPublic)}
              onChange={(e) => handleChange("isPublic", e.target.checked)}
            />
            Public
          </label>
          <label className="flex items-center gap-2">
            Type
            <select
              value={local.type || "text"}
              onChange={(e) => handleChange("type", e.target.value)}
              className="px-3 py-2 border rounded-lg bg-white"
            >
              <option value="text">Text</option>
              <option value="textarea">Textarea</option>
              <option value="json">JSON</option>
            </select>
          </label>
        </div>
        <button
          onClick={() => onSave(local)}
          disabled={saving}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow disabled:opacity-60"
        >
          <FaSave /> {saving ? "Saving..." : "Save"}
        </button>
      </div>
    </div>
  );
}
