import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { FaTrash, FaEnvelope, FaPhone, FaEye, FaGraduationCap } from "react-icons/fa";
import { fetchWithAuth } from "../../lib/auth";
import AdminPageShell from "../../components/admin/AdminPageShell";

export default function RegistrationsManager() {
  const router = useRouter();
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedReg, setSelectedReg] = useState(null);

  const apiBase = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4005";

  useEffect(() => {
    if (typeof window !== "undefined") {
      const isAuth = localStorage.getItem("adminToken");
      if (!isAuth) {
        router.push("/admin/login");
        return;
      }
    }
    fetchRegistrations();
  }, []);

  const fetchRegistrations = async () => {
    try {
      const response = await fetchWithAuth(`/api/registrations`);
      if (!response.ok) throw new Error("Failed to fetch registrations");
      const data = await response.json();
      setRegistrations(data);
    } catch (error) {
      console.error("Error fetching registrations:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this registration?")) return;

    try {
      const response = await fetchWithAuth(`/api/registrations/${id}`, { method: "DELETE" });
      if (response.ok) {
        alert("Registration deleted successfully!");
        fetchRegistrations();
      }
    } catch (error) {
      console.error("Error deleting registration:", error);
      alert("Failed to delete registration");
    }
  };

  const filteredRegistrations = registrations.filter((reg) =>
    reg.student_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    reg.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AdminPageShell
      title="Student Registrations"
      description="Review student registrations in a cleaner, more focused admin view."
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
      searchPlaceholder="Search registrations by name or email..."
      summary={[
        { label: "Total", value: String(registrations.length), note: "All registration records in the system." },
        { label: "Filtered", value: String(filteredRegistrations.length), note: "Entries matching your search." },
        { label: "Focus", value: "Admissions", note: "Review and clear the intake queue." },
      ]}
      loading={loading}
      onRefresh={fetchRegistrations}
    >
      <div className="space-y-6">
        {/* Detail Modal */}
        {selectedReg && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
            <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-[2rem] border border-slate-200 bg-white shadow-2xl">
              <div className="p-6 border-b bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-t-xl">
                <h2 className="text-2xl font-bold">Registration Details</h2>
              </div>
              <div className="p-6 space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-1">Student Name</label>
                    <p className="text-gray-900">{selectedReg.student_name}</p>
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-1">Email</label>
                    <p className="text-blue-600">{selectedReg.email}</p>
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-1">Phone</label>
                    <p className="text-gray-900">{selectedReg.phone}</p>
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-1">Program</label>
                    <p className="text-gray-900">{selectedReg.program}</p>
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-1">Department</label>
                    <p className="text-gray-900">{selectedReg.department}</p>
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-1">Year of Study</label>
                    <p className="text-gray-900">{selectedReg.year_of_study}</p>
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-1">Roll Number</label>
                    <p className="text-gray-900">{selectedReg.roll_number || "N/A"}</p>
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-1">Date of Birth</label>
                    <p className="text-gray-900">{selectedReg.date_of_birth || "N/A"}</p>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-gray-700 font-semibold mb-1">Address</label>
                    <p className="text-gray-700 bg-gray-50 p-3 rounded-lg">{selectedReg.address || "N/A"}</p>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-gray-700 font-semibold mb-1">Research Interests</label>
                    <p className="text-gray-700 bg-gray-50 p-3 rounded-lg">{selectedReg.research_interests || "N/A"}</p>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-gray-700 font-semibold mb-1">Registered At</label>
                    <p className="text-gray-600">{new Date(selectedReg.createdAt).toLocaleString()}</p>
                  </div>
                </div>
              </div>
              <div className="p-6 border-t">
                <button
                  onClick={() => setSelectedReg(null)}
                  className="w-full bg-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-400 font-semibold"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {loading ? (
          <div className="flex min-h-[320px] items-center justify-center rounded-[2rem] border border-dashed border-slate-300 bg-white/70">
            <div className="h-14 w-14 animate-spin rounded-full border-4 border-slate-200 border-t-emerald-600" />
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredRegistrations.map((reg) => (
              <div key={reg.id} className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-[0_20px_50px_rgba(15,23,42,0.08)] transition hover:-translate-y-0.5 hover:shadow-xl">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-teal-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                      {reg.student_name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-800">{reg.student_name}</h3>
                      <p className="text-sm text-gray-600">{reg.program}</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-2 text-sm mb-4">
                  <div className="flex items-center gap-2 text-gray-600">
                    <FaEnvelope className="text-blue-600" />
                    <span className="truncate">{reg.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <FaPhone className="text-green-600" />
                    <span>{reg.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <FaGraduationCap className="text-purple-600" />
                    <span>{reg.department} - Year {reg.year_of_study}</span>
                  </div>
                </div>
                <p className="text-xs text-gray-400 mb-4">
                  Registered: {new Date(reg.createdAt).toLocaleDateString()}
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => setSelectedReg(reg)}
                    className="flex-1 flex items-center justify-center gap-2 p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 font-semibold text-sm"
                  >
                    <FaEye /> View
                  </button>
                  <button
                    onClick={() => handleDelete(reg.id)}
                    className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
            {filteredRegistrations.length === 0 && (
              <div className="col-span-3 rounded-[1.75rem] border border-slate-200 bg-white px-6 py-12 text-center shadow-[0_20px_50px_rgba(15,23,42,0.08)]">
                <p className="text-lg text-slate-500">No registrations found</p>
              </div>
            )}
          </div>
        )}
      </div>
    </AdminPageShell>
  );
}
