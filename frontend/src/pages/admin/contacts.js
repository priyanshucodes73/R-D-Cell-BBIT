import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { FaArrowLeft, FaTrash, FaSearch, FaEnvelope, FaPhone, FaEye } from "react-icons/fa";
import { fetchWithAuth } from "../../lib/auth";
import AdminPageShell from "../../components/admin/AdminPageShell";

export default function ContactsManager() {
  const router = useRouter();
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedContact, setSelectedContact] = useState(null);

  const apiBase = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4005";

  useEffect(() => {
    if (typeof window !== "undefined") {
      const isAuth = localStorage.getItem("adminToken");
      if (!isAuth) {
        router.push("/admin/login");
        return;
      }
    }
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await fetchWithAuth(`/api/contacts`);
      if (!response.ok) throw new Error("Failed to fetch contacts");
      const data = await response.json();
      setContacts(data);
    } catch (error) {
      console.error("Error fetching contacts:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this inquiry?")) return;

    try {
      const response = await fetchWithAuth(`/api/contacts/${id}`, { method: "DELETE" });
      if (response.ok) {
        alert("Contact inquiry deleted successfully!");
        fetchContacts();
      }
    } catch (error) {
      console.error("Error deleting contact:", error);
      alert("Failed to delete contact");
    }
  };

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AdminPageShell
      title="Contact Inquiries"
      description="Review and manage contact submissions from a cleaner, more serious control surface."
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
      searchPlaceholder="Search contacts by name or email..."
      summary={[
        { label: "Inbox", value: String(contacts.length), note: "Total contact submissions in the queue." },
        { label: "Filtered", value: String(filteredContacts.length), note: "Items matching your current search." },
        { label: "Focus", value: "Respond fast", note: "Open details, review, and remove noise." },
      ]}
      loading={loading}
      onRefresh={fetchContacts}
    >
      <div className="space-y-6">
        {selectedContact && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
            <div className="w-full max-w-2xl overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-2xl">
              <div className="p-6 border-b bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-xl">
                <h2 className="text-2xl font-bold">Contact Inquiry Details</h2>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">Name</label>
                  <p className="text-gray-900">{selectedContact.name}</p>
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">Email</label>
                  <p className="text-blue-600">{selectedContact.email}</p>
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">Phone</label>
                  <p className="text-gray-900">{selectedContact.phone || "N/A"}</p>
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">Subject</label>
                  <p className="text-gray-900">{selectedContact.subject}</p>
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">Message</label>
                  <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">{selectedContact.message}</p>
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">Submitted At</label>
                  <p className="text-gray-600">{new Date(selectedContact.createdAt).toLocaleString()}</p>
                </div>
              </div>
              <div className="p-6 border-t">
                <button
                  onClick={() => setSelectedContact(null)}
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
            <div className="h-14 w-14 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />
          </div>
        ) : (
          <div className="space-y-4">
            {filteredContacts.map((contact) => (
              <div key={contact.id} className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-[0_20px_50px_rgba(15,23,42,0.08)] transition hover:-translate-y-0.5 hover:shadow-xl">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                        {contact.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-800">{contact.name}</h3>
                        <p className="text-sm text-gray-600">{contact.subject}</p>
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-3 text-sm">
                      <div className="flex items-center gap-2 text-gray-600">
                        <FaEnvelope className="text-blue-600" />
                        <span>{contact.email}</span>
                      </div>
                      {contact.phone && (
                        <div className="flex items-center gap-2 text-gray-600">
                          <FaPhone className="text-green-600" />
                          <span>{contact.phone}</span>
                        </div>
                      )}
                    </div>
                    <p className="text-sm text-gray-500 mt-3 line-clamp-2">{contact.message}</p>
                    <p className="text-xs text-gray-400 mt-2">
                      Submitted: {new Date(contact.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <button
                      onClick={() => setSelectedContact(contact)}
                      className="p-3 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200"
                      title="View Details"
                    >
                      <FaEye />
                    </button>
                    <button
                      onClick={() => handleDelete(contact.id)}
                      className="p-3 bg-red-100 text-red-600 rounded-lg hover:bg-red-200"
                      title="Delete"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </div>
            ))}
            {filteredContacts.length === 0 && (
              <div className="rounded-[1.75rem] border border-slate-200 bg-white px-6 py-12 text-center shadow-[0_20px_50px_rgba(15,23,42,0.08)]">
                <p className="text-lg text-slate-500">No contact inquiries found</p>
              </div>
            )}
          </div>
        )}
      </div>
    </AdminPageShell>
  );
}
