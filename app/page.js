"use client";

import { getAllManagementWithDate } from "@/redux/managementSlice";
import { jwtDecode } from "jwt-decode";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaFileImport } from "react-icons/fa";
import dateJson from "@/utils/date.json";
import { signOut, useSession } from "next-auth/react";
import { ImExit } from "react-icons/im";
import ShowFile from "@/components/ShowFile";
import { deleteManagementDispatch } from "@/redux/adminSlice";

export default function Home() {
  const dispatch = useDispatch();
  const { data: session } = useSession();
  const [docUrl, setDocUrl] = useState(null);
  const [openFile, setOpenFile] = useState(false);
  const [selectDateAndYear, setSelectDateAndYear] = useState({
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
  });
  const { managements } = useSelector((state) => state.management);
  useEffect(() => {
    dispatch(
      getAllManagementWithDate(selectDateAndYear.month, selectDateAndYear.year)
    );
  }, []);

  const handleChange = (event) => {
    const [month, year] = event.target.value.split("/"); // Ay ve Yıl'ı ayır
    setSelectDateAndYear({ month: parseInt(month), year: parseInt(year) }); // State'e ay ve yılı ata
    dispatch(getAllManagementWithDate(month, year));
  };

  const deleteManagement = (id) => {
    const confirmed = window.confirm(
      "Bu dökümanı silmek istediğinize emin misiniz?"
    );
    if (confirmed) {
      dispatch(deleteManagementDispatch(id));
      alert("Silindi");
    }
  };

  return (
    <div className="items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <div className="flex felx-row items-center justify-between">
        {jwtDecode(session.accessToken)?.role[0] === "ADMIN" ? (
          <Link href="/bn/admin" className="text-blue-600 underline text-xl">
            Admin
          </Link>
        ) : (
          <></>
        )}
        <select
          onChange={handleChange}
          defaultValue={`${selectDateAndYear.month}/${selectDateAndYear.year}`}
          className="p-1 bg-transparent border rounded-lg"
        >
          {dateJson?.map((item, index) => (
            <option key={index} value={item.date}>
              {item.date}
            </option>
          ))}
        </select>
        <ImExit
          onClick={() => signOut()}
          className="text-red-600 text-2xl cursor-pointer"
        />
      </div>

      <div className="flex flex-col overflow-x-auto">
        <div className="sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div className="overflow-x-auto">
              <table className="min-w-full mt-12 text-start text-sm font-light text-surface dark:text-white">
                <thead className="border-b border-neutral-200 font-medium dark:border-white/10">
                  <tr>
                    <th scope="col" className="px-2 py-4">
                      Case Number
                    </th>
                    <th scope="col" className="px-2 py-4">
                      Firma Adı
                    </th>
                    <th scope="col" className="px-2 py-4">
                      Operatör Adı
                    </th>
                    <th scope="col" className="px-2 py-4">
                      Poz Sayısı{" "}
                      <span className="text-blue-600">
                        (
                        {managements?.reduce((total, item) => {
                          return total + item.pozSayisi;
                        }, 0)}
                        )
                      </span>
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Mesafe
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
                    <th scope="col" className="px-6 py-4">
                      Poz Fiyat
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Km Fiyat
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Total
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
                        {item.mesafe}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {item.ekPoz ? (
                          item.ekPoz
                        ) : (
                          <span className="text-red-600 text-xl font-bold">
                            -
                          </span>
                        )}
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
                      <td className="whitespace-nowrap font-bold px-6 py-4">
                        {parseFloat(item.pozBirimFiyat).toFixed(2)}
                      </td>
                      <td className="whitespace-nowrap font-bold px-6 py-4">
                        {parseFloat(item.kmBirimFiyat).toFixed(2)}
                      </td>
                      <td className="whitespace-nowrap font-bold px-6 py-4">
                        {parseFloat(item.total).toFixed(2)}
                      </td>
                      <td className="flex flex-row items-center px-2 gap-x-4 py-4">
                        {item.documentUrl ? (
                          <>
                            <FaFileImport
                              onClick={() => setDocUrl(item.documentUrl)}
                              className="text-indigo-600 cursor-pointer text-2xl"
                            />
                          </>
                        ) : (
                          <span className="text-red-600 text-xl font-bold">
                            -
                          </span>
                        )}
                        {jwtDecode(session.accessToken)?.role[0] === "ADMIN" ? (
                          <button
                            onClick={() => deleteManagement(item.id)}
                            className="font-bold underline ml-4 text-red-600"
                          >
                            Sil
                          </button>
                        ) : null}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
            </div>
          </div>
          {docUrl ? <ShowFile fileUrl={docUrl} setDocUrl={setDocUrl} /> : null}
        </div>
      </div>
      <span className="flex flex-col text-white gap-x-4 rounded-lg bg-indigo-600 mt-4 w-fit float-right px-4">
               <span className="">
               Poz Toplam: {"  "}
                {managements?.reduce((total, item) => {
                  return total + item.pozBirimFiyat;
                }, 0)}
               </span>
               <span className="">
               Km Toplam:{"  "}
                {managements?.reduce((total, item) => {
                  return total + item.kmBirimFiyat;
                }, 0)}
               </span>
               <span className="">
              Toplam:{"  "}
                {managements?.reduce((total, item) => {
                  return total + item.total;
                }, 0)}
               </span>
              </span>
    </div>
  );
}
