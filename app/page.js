"use client";

import { logOutDispatch } from "@/redux/authSlice";
import { getAllManagementDispatch, getAllManagementWithDate } from "@/redux/managementSlice";
import { jwtDecode } from "jwt-decode";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaFileImport } from "react-icons/fa";
import dateJson from '@/utils/date.json'

export default function Home() {
  const dispatch = useDispatch();
  const [pageSize, setPageSize] = useState({ page: 0, size: 31 });
  const [selectDateAndYear,setSelectDateAndYear] = useState({month:new Date().getMonth()+1,year:new Date().getFullYear()})
  const { managements } = useSelector((state) => state.management);
  useEffect(() => {
    dispatch(getAllManagementWithDate(selectDateAndYear.month, selectDateAndYear.year));
  }, []);
console.log(selectDateAndYear)
  const handleChange = (event) => {
    const [month, year] = event.target.value.split('/'); // Ay ve Yıl'ı ayır
    setSelectDateAndYear({ month: parseInt(month), year: parseInt(year) }); // State'e ay ve yılı ata
    dispatch(getAllManagementWithDate(month,year))
  };

  return (
    <div className="items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <div className="flex felx-row items-center justify-between">
        {jwtDecode(localStorage.getItem("access-token")).role[0] === "ADMIN" ? (
          <Link href="/bn/admin" className="text-blue-600 underline text-xl">
            Admin
          </Link>
        ) : (
          <></>
        )}
        <select onChange={handleChange} defaultValue={`${selectDateAndYear.month}/${selectDateAndYear.year}`} className="px-2 bg-transparent border rounded-lg">
          {
            dateJson?.map((item,index) => (
              <option key={index} value={item.date}>{item.date}</option>
            ))
          }
        </select>
        <button
          onClick={() => dispatch(logOutDispatch())}
          className="bg-red-600 rounded-lg p-2"
        >
          Log Out
        </button>
      </div>

      <div className="flex flex-col overflow-x-auto">
        <div className="sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <ul className="flex flex-row items-center border bg-gray-500 rounded-lg py-2 justify-between">
              <li className="hover:text-blue-600 transition-all cursor-pointer px-2">
                Ocak
              </li>
              <li className="hover:text-blue-600 transition-all cursor-pointer px-2">
                Şubat
              </li>
              <li className="hover:text-blue-600 transition-all cursor-pointer px-2">
                Mart
              </li>
              <li className="hover:text-blue-600 transition-all cursor-pointer px-2">
                Nisan
              </li>
              <li className="hover:text-blue-600 transition-all cursor-pointer px-2">
                Mayıs
              </li>
              <li className="hover:text-blue-600 transition-all cursor-pointer px-2">
                Haziran
              </li>
              <li className="hover:text-blue-600 transition-all cursor-pointer px-2">
                Temmuz
              </li>
              <li className="hover:text-blue-600 transition-all cursor-pointer px-2">
                Ağustos
              </li>
              <li className="hover:text-blue-600 transition-all cursor-pointer px-2">
                Eylül
              </li>
              <li className="hover:text-blue-600 transition-all cursor-pointer px-2">
                Ekim
              </li>
              <li className="hover:text-blue-600 transition-all cursor-pointer px-2">
                Kasım
              </li>
              <li className="hover:text-blue-600 transition-all cursor-pointer px-2">
                Aralık
              </li>
            </ul>
            <div className="overflow-x-auto">
              <table className="min-w-full mt-12 text-start text-sm font-light text-surface dark:text-white">
                <thead className="border-b border-neutral-200 font-medium dark:border-white/10">
                  <tr>
                    <th scope="col" className="px-6 py-4">
                      Case Number
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Firma Adı
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Operatör Adı
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Poz Sayısı {" "}<span className="text-blue-600">
                      ({
                        managements?.reduce((total,item)=> {
                          return total + item.pozSayisi
                        },0)
                      })
                      </span>
                      
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Ek Poz
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Hizmet
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Tarih
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Vaka Şehri
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Vaka İlçesi
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Vaka Sonlandıran
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Açıklama
                    </th>
                    <th>Dosya</th>
                  </tr>
                </thead>
                <tbody>
                  {managements?.map((item, index) => (
                    <tr
                      key={index}
                      className="border-b border-neutral-200 dark:border-white/10"
                    >
                      <td className="whitespace-nowrap px-6 py-4 font-medium">
                        {item.caseNumber}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {item.firmaAdi}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {item.operatorAdi}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {item.pozSayisi}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {item.ekPoz}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {item.hizmet}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {item.date}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {item.vakaSehri}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {item.vakaIlcesi}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {item.vakaSonlandiran}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {item.aciklama}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <Link
                          target="_blank"
                          href={`${process.env.NEXT_PUBLIC_DOCUMENT_URL}${item.documentUrl}`}
                        >
                          <FaFileImport className="text-indigo-600 text-2xl" />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
