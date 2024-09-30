import { deleteUserDispatch, getAllUserDispatch, updateUserDispatch } from "@/redux/adminSlice";
import React, { useEffect, useState } from "react";
import { ImCancelCircle } from "react-icons/im";
import { useDispatch, useSelector } from "react-redux";

export default function ChangeUserRoleModal({ open, setOpen }) {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(getAllUserDispatch());
  }, [dispatch]);

  const handleChangeRole = async (id, role) => {
    dispatch(updateUserDispatch(id, role));
    location.reload()
  };

  const deleteUser = (id) => {
    const confirmed = window.confirm("Bu kullanıcıyı silmek istediğinize emin misiniz?")
    if(confirmed) {
      dispatch(deleteUserDispatch(id))
      alert(`Kullanıcı ${id} başarıyla silindi.`)
    }
  }

  return (
    <div
      className={`${
        open
          ? "fixed z-50 inset-0 flex flex-col items-center justify-center backdrop-blur-sm bg-black bg-opacity-75"
          : "hidden"
      }`}
    >
      <div className="bg-gray-800 relative grid grid-cols-1 w-96 gap-x-4 gap-y-4 p-4 rounded-lg">
        <ImCancelCircle
          className="absolute right-4 top-4 text-red-600 cursor-pointer"
          onClick={() => setOpen(!open)}
          size={24}
        />
        <h2 className="text-blue-600 text-xl font-bold text-center mt-6">
          Kullanıcı Güncelle
        </h2>
        <ul className="flex flex-col gap-y-2">
          {users?.map((item, index) => (
            <li
              key={index}
              className="bg-gray-900 rounded-lg p-2 flex flex-row items-center justify-between"
            >
              <p className="font-bold">{item.email}</p>
            <span className="flex flex-row items-center gap-x-2">
            <select
                onChange={(e) =>{
                  handleChangeRole(item.id, Array.of(e.target.value))
                }}
                className="bg-indigo-500 rounded-lg"
              >
                <option>{item.role}</option>
                <option value={item.role === 'USER' ? 'ADMIN':'USER'}>{item.role === 'USER' ? 'ADMIN':'USER'}</option>
              </select>
              {
                item.email !== 'info@bilisimnoktasi.com.tr' && <button onClick={()=> deleteUser(item.id)} className="text-red-600 underline">Sil</button>
              }
            </span>
            </li>
          ))}
          
        </ul>
      </div>
    </div>
  );
}
