"use client";

import { useEffect, useState } from "react";
import UserTable from "@/components/UserTable";
import AddUserModal from "@/components/AddUserModal";
import { User } from "@/types/user";

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);

  // Fetch Users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );

        if (!res.ok) {
          throw new Error("Failed to fetch users");
        }

        const data: User[] = await res.json();
        setUsers(data);
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Search Filter (instant)
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  // Delete User (UI only)
  const handleDelete = (id: number) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (!confirmDelete) return;

    setUsers(users.filter((user) => user.id !== id));
  };

  // Add User (UI only)
  const handleAddUser = (newUser: Omit<User, "id">) => {
    const userWithId: User = {
      id: Date.now(),
      ...newUser,
    };

    setUsers([...users, userWithId]);
    setShowModal(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto bg-white p-6 rounded-xl shadow-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">
          User Management Dashboard
        </h1>

        {/* Search + Add Button */}
        <div className="flex justify-between mb-4">
          <input
            type="text"
            placeholder="Search by name..."
            className="border rounded-md px-3 py-2 w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Add User
          </button>
        </div>

        {/* Loading */}
        {loading && (
          <p className="text-center text-gray-500">Loading users...</p>
        )}

        {/* Error */}
        {error && (
          <p className="text-center text-red-500 font-medium">
            {error}
          </p>
        )}

        {/* Table */}
        {!loading && !error && (
          <UserTable users={filteredUsers} onDelete={handleDelete} />
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <AddUserModal
          onClose={() => setShowModal(false)}
          onAdd={handleAddUser}
        />
      )}
    </div>
  );
}