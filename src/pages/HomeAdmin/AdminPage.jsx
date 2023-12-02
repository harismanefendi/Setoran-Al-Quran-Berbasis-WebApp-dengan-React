import React, { useState, useEffect } from "react";
import { ref, get, getDatabase } from "firebase/database";
import useCreateValue from "../../hooks/useCreateValue";

const AdminPage = () => {
  const create = useCreateValue();
  const createProduct = useCreateValue();

  const createPost = async () => {
    const path = "/posts";
    const value = { contents: "ini contents", like: "ini like", type: "push" };
    await create.pushValue(path, value);
  };

  const createUser = async () => {
    const path = "/users";
    const value = { email: "inisemail", name: "ini name", uid: "ini like" };
    await create.createValue(path, value); // Ubah pemanggilan fungsi menjadi create.createValue
  };
  const createNewProduct = async () => {
    const path = "/products";
    const key = "product_" + Date.now(); // Menggunakan timestamp sebagai kunci yang unik
    const value = { name: "karpet", price: "6500", timestamp: Date.now() };
    await createProduct.setValuewithKey(path, key, value);
  };

  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const db = getDatabase();
      const usersRef = ref(db, "users");
      try {
        const snapshot = await get(usersRef);

        if (snapshot.exists()) {
          const usersData = snapshot.val();
          const usersArray = Object.values(usersData);
          setUsers(usersArray);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="mx-auto max-w-2xl p-8">
      <h1 className="text-2xl font-bold mb-4">Halaman Admin</h1>
      <table className="min-w-full">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">Nama</th>
            <th className="p-2">Email</th>
            <th className="p-2">UID</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.uid} className="border-b">
              <td className="p-2">{user.name}</td>
              <td className="p-2">{user.email}</td>
              <td className="p-2">{user.uid}</td>
              <td>
                <button onClick={createPost} className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded">
                  push
                </button>
                <br />
                <button onClick={createUser} className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded">
                  set
                </button>
                <br />
                <button onClick={createNewProduct} className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded">
                  tambah
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPage;
