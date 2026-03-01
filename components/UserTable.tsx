"use client";

import { useUserTable } from "@/hooks/useTable";
import { User } from "@/types/user";
import DeleteModal from "./utils/dialog/DeleteModal";


type Props = {
  users: User[];
  onDelete: (id: number) => void;
};

export default function UserTable({ users, onDelete }: Props) {
  const {
    sortedUsers,
    selectedId,
    setSelectedId,
    sortOrder,
    toggleSort,
    confirmDelete,
  } = useUserTable(users, onDelete);

  return (
    <div className="bg-white rounded-2xl shadow-xl border overflow-hidden">
      <table className="w-full text-sm text-left">
        <thead className="bg-linear-to-r from-blue-500 to-blue-600 text-white">
          <tr>
            <th
              onClick={toggleSort}
              className="px-6 py-3 cursor-pointer select-none"
            >
              Name{" "}
              <span className="ml-2">
                {sortOrder === "asc"
                  ? "↑↑"
                  : sortOrder === "desc"
                    ? "↓↓"
                    : "↕↕"}
              </span>
            </th>
            <th className="px-6 py-3">Email</th>
            <th className="px-6 py-3">Phone</th>
            <th className="px-6 py-3">Company</th>
            <th className="px-6 py-3 text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {sortedUsers.length === 0 ? (
            <tr>
              <td colSpan={5} className="text-center py-6 text-gray-500">
                No users found
              </td>
            </tr>
          ) : (
            sortedUsers.map((user, index) => (
              <tr
                key={user.id}
                className={`border-b hover:bg-blue-50 transition ${index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  }`}
              >
                <td className="px-6 py-4 font-medium text-gray-800">
                  {user.name}
                </td>
                <td className="px-6 py-4 text-gray-600">
                  {user.email}
                </td>
                <td className="px-6 py-4 text-gray-600">
                  {user.phone}
                </td>
                <td className="px-6 py-4 text-gray-600">
                  {user.company?.name}
                </td>
                <td className="px-6 py-4 text-center">
                  <button
                    onClick={() => setSelectedId(user.id)}
                    className="px-4 py-1.5 rounded-lg bg-red-500 text-white hover:bg-red-600 transition shadow"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {selectedId !== null && (
        <DeleteModal
          onConfirm={confirmDelete}
          onCancel={() => setSelectedId(null)}
        />
      )}
    </div>
  );
}