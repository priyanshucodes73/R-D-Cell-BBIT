import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { FaArrowLeft, FaTrash, FaSearch, FaEnvelope, FaPhone, FaEye } from "react-icons/fa";

export default function ContactsManager() {
  const router = useRouter();
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedContact, setSelectedContact] = useState(null);

  const apiBase = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4005";

  useEffect(() => {
    if (typeof window !== "undefined") {
      const isAuth = localStorage.getItem("adminAuth");
      if (!isAuth) {
        router.push("/admin/login");
        return;
      }
    }
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await fetch(`${apiBase}/api/contacts`);
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
      const response = await fetch(`${apiBase}/api/contacts/${id}`, {
        method: "DELETE",
      });
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
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/admin/dashboard">
              <button className="p-3 bg-white rounded-lg shadow hover:bg-gray-50">
                <FaArrowLeft />
              </button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Contact Inquiries</h1>
              <p className="text-gray-600">View and manage contact submissions</p>
            </div>
          </div>
        </div>

        <div className="mb-6 bg-white p-4 rounded-lg shadow">
          <div className="relative">
            <FaSearch className="absolute left-3 top-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search contacts by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        {/* Detail Modal */}
        {selectedContact && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full">
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
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredContacts.map((contact) => (
              <div key={contact.id} className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
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
              <div className="text-center py-12 bg-white rounded-lg shadow">
                <p className="text-gray-500 text-lg">No contact inquiries found</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
