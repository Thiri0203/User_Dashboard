"use client";

import { useState, useEffect } from "react";
import { User } from "@/types/user";

export function useHome() {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );
        if (!res.ok) throw new Error("Failed to fetch users");

        const data = await res.json();
        setUsers(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (id: number) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  const handleAddUser = (newUser: Omit<User, "id">) => {
    setUsers([
      ...users,
      { id: Date.now(), ...newUser },
    ]);
    setShowModal(false);
  };

  return {
    users: filteredUsers,
    search,
    setSearch,
    loading,
    error,
    showModal,
    setShowModal,
    handleDelete,
    handleAddUser,
  };
}