"use client";

import { useForm } from "@/hooks/useForm";
import { User } from "@/types/user";


type Props = {
  onClose: () => void;
  onAdd: (user: Omit<User, "id">) => void;
};

export default function Form({ onClose, onAdd }: Props) {
  const { form, errors, setForm, handleSubmit } =
    useForm(onAdd);

  return (
    <div className="fixed inset-0 bg-white/30 backdrop-blur-sm flex justify-center items-center">
      <div className="bg-white p-8 rounded-2xl w-105 shadow-2xl border">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Add New User
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Name
            </label>
            <input
              type="text"
              placeholder="Enter Name"
              className={`w-full border p-2 rounded-lg focus:outline-none focus:ring-2 ${
                errors.name
                  ? "border-red-500 focus:ring-red-300"
                  : "focus:ring-blue-400"
              }`}
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">
                {errors.name}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter Email"
              className={`w-full border p-2 rounded-lg focus:outline-none focus:ring-2 ${
                errors.email
                  ? "border-red-500 focus:ring-red-300"
                  : "focus:ring-blue-400"
              }`}
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Phone Number
            </label>
            <input
              type="text"
              placeholder="Enter Phone Number"
              className={`w-full border p-2 rounded-lg focus:outline-none focus:ring-2 ${
                errors.phone
                  ? "border-red-500 focus:ring-red-300"
                  : "focus:ring-blue-400"
              }`}
              value={form.phone}
              onChange={(e) =>
                setForm({ ...form, phone: e.target.value })
              }
            />
            {errors.phone && (
              <p className="text-red-500 text-xs mt-1">
                {errors.phone}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Company Name
            </label>
            <input
              type="text"
              placeholder="Enter Company Name"
              className={`w-full border p-2 rounded-lg focus:outline-none focus:ring-2 ${
                errors.company
                  ? "border-red-500 focus:ring-red-300"
                  : "focus:ring-blue-400"
              }`}
              value={form.company}
              onChange={(e) =>
                setForm({ ...form, company: e.target.value })
              }
            />
            {errors.company && (
              <p className="text-red-500 text-xs mt-1">
                {errors.company}
              </p>
            )}
          </div>

          <div className="flex justify-between pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg border hover:bg-gray-100 transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition shadow"
            >
              Add User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}