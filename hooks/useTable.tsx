"use client";

import { useState, useMemo } from "react";
import { User } from "@/types/user";

export function useUserTable(users: User[], onDelete: (id: number) => void) {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | null>(null);

  const sortedUsers = useMemo(() => {
    if (!sortOrder) return users;

    return [...users].sort((a, b) => {
      const nameA = a.name.toLowerCase();
      const nameB = b.name.toLowerCase();

      return sortOrder === "asc"
        ? nameA.localeCompare(nameB)
        : nameB.localeCompare(nameA);
    });
  }, [users, sortOrder]);

  const toggleSort = () => {
    setSortOrder((prev) => {
      if (prev === null) return "asc";
      if (prev === "asc") return "desc";
      return null;
    });
  };

  const confirmDelete = () => {
    if (selectedId !== null) {
      onDelete(selectedId);
      setSelectedId(null);
    }
  };

  return {
    sortedUsers,
    selectedId,
    setSelectedId,
    sortOrder,
    toggleSort,
    confirmDelete,
  };
}