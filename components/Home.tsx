"use client";

import { useHome } from "@/hooks/useHome";

import UserTable from "@/components/UserTable";
import Form from "./Form";

export default function Home() {
  const {
    users,
    search,
    setSearch,
    loading,
    error,
    showModal,
    setShowModal,
    handleDelete,
    handleAddUser,
  } = useHome();

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto bg-white p-6 rounded-xl shadow-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">
          User Management Dashboard
        </h1>

        <div className="flex justify-between mb-4">
          <input
            type="text"
            placeholder="Search by name..."
            className="border rounded-md px-3 py-2 w-1/3"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-md"
          >
            Add User
          </button>
        </div>

        {loading && <p>Loading users...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {!loading && !error && (
          <UserTable users={users} onDelete={handleDelete} />
        )}
      </div>

      {showModal && (
        <Form
          onClose={() => setShowModal(false)}
          onAdd={handleAddUser}
        />
      )}
    </div>
  );
}