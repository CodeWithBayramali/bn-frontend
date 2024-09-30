"use client";
import { createManagementDispatch } from "@/redux/managementSlice";
import React, { useState, useEffect } from "react";
import il from "@/utils/data/il.json";
import ilce from "@/utils/data/ilce.json";
import { useDispatch } from "react-redux";
import Link from "next/link";
import { FaUserPlus } from "react-icons/fa";
import { FaUsersCog } from "react-icons/fa";
import { CreateUserModal } from "@/components/CreateUserModal";
import ChangeUserRoleModal from "@/components/ChangeUserRoleModal";
import { TfiLayoutAccordionList } from "react-icons/tfi";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function page() {
  const router = useRouter();
  const [file, setFile] = useState(null);
  const [project, setProject] = useState(false);
  const [projeFiyat, setProjeFiyat] = useState(0);
  const [openCreateUserModel, setOpenCreateUserModel] = useState(false);
  const [openUserRoleModal, setOpenUserRoleModal] = useState(false);
  const [selectIl, setSelectIl] = useState({ id: null, name: null });
  const [selectIlce, setSelectIlce] = useState([]);
  const [sendData, setSendData] = useState({
    caseNumber: 0,
    operatorAdi: "",
    firmaAdi: "",
    hizmet: "",
    vakaIlcesi: "",
    mesafe: 0,
    vakaSehri: "",
    ekPoz: 0,
    date: "",
    pozSayisi: 0,
    vakaSonlandiran: "",
    aciklama: "",
  });
  const [findIlce, setFindIlce] = useState("");
  const [pozNumber, setPozNumber] = useState(0);
  const dispatch = useDispatch();

  const [pozTutar, setPozTutar] = useState(0);
  const [kmTutar, setKmTutar] = useState(0);
  const [kmPlusProje, setKmPlusProje] = useState(0);
  const [total, setTotal] = useState(0);

  const selectLocation = (event) => {
    const [ilId, ilName] = event.target.value.split("/");
    setSelectIl({ id: ilId, name: ilName });
    let findIlce = ilce.filter((i) => ilId === i.il_id);
    setSelectIlce(findIlce);
  };

  useEffect(() => {
    const pozTutarValue =
      (parseInt(pozNumber) + parseInt(sendData.ekPoz)) *
      parseInt(process.env.NEXT_PUBLIC_POZ_TUTAR);
    const kmTutarValue =
      parseInt(sendData.mesafe) *
      parseFloat(process.env.NEXT_PUBLIC_KM_TUTAR).toFixed(2);
    //const kmPlusProje = parseFloat(kmTutar) + parseInt(projeFiyat)
    let totalValue = 0;
    if (project) {
      totalValue = parseFloat(kmTutarValue) + parseInt(projeFiyat);
    } else {
      totalValue = pozTutarValue + kmTutarValue; // Total, poz tutarına eşit
    }

    setPozTutar(pozTutarValue);
    setKmTutar(kmTutarValue);
    setKmPlusProje(kmPlusProje);
    setTotal(totalValue);
  }, [pozNumber, project, sendData.mesafe, sendData.ekPoz]); // Poz number ve ek poz değiştiğinde tetiklenir.

  const changePozNumber = (e) => {
    const value = e.target.value;
    let findPozNumber = ilce.filter((i) => value === i.name);
    if (project) {
      setFindIlce(value);
      setPozNumber;
    } else {
      setFindIlce(value);
      setPozNumber(findPozNumber[0].poz_sayisi);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "vakaSehri") selectLocation(e);
    if (name === "vakaIlcesi") changePozNumber(e);
    setSendData({ ...sendData, [name]: value });
  };

  const _handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    formData.append(
      "managementJson",
      JSON.stringify({
        ...sendData,
        vakaSehri: sendData.vakaSehri.split("/")[1],
        pozSayisi: pozNumber,
        projeFiyatTotal: project
          ? parseFloat(parseInt(projeFiyat) + parseFloat(kmTutar)).toFixed(2)
          : projeFiyat,
        projeFiyat: projeFiyat,
        total: total.toFixed(2),
        pozBirimFiyat: pozTutar,
        kmBirimFiyat: kmTutar.toFixed(2),
      })
    );
    dispatch(createManagementDispatch(formData, router));
    toast.success("Gönderildi");
    setSendData({
      caseNumber: 0,
      operatorAdi: "",
      firmaAdi: "",
      hizmet: "",
      vakaIlcesi: "",
      mesafe: 0,
      vakaSehri: "",
      ekPoz: 0,
      date: "",
      pozSayisi: 0,
      vakaSonlandiran: "",
      aciklama: "",
    });
  };

  return (
    <>
       <CreateUserModal
        open={openCreateUserModel}
        setOpen={setOpenCreateUserModel}
      />
      <ChangeUserRoleModal
        open={openUserRoleModal}
        setOpen={setOpenUserRoleModal}
      />
      <form onSubmit={_handleSubmit}>
        <div className="flex flex-row container mt-12">
          <div className="flex flex-col gap-y-8 mx-auto mb-12">
            <div className="flex flex-row items-center justify-between">
              <Link href="/" className="underline text-blue-600 w-fit">
                <TfiLayoutAccordionList className="text-blue-600" size={24} />
              </Link>
              <span className="flex flex-row items-center gap-x-4">
                <FaUsersCog
                  onClick={() => setOpenUserRoleModal(!openUserRoleModal)}
                  className="text-indigo-600 text-3xl border border-indigo-600 cursor-pointer rounded-full p-1"
                />

                <FaUserPlus
                  onClick={() => setOpenCreateUserModel(!openCreateUserModel)}
                  className="text-green-600 text-3xl border cursor-pointer border-green-600 rounded-full p-1"
                />
              </span>
            </div>

            <div className="grid md:grid-cols-4 sm:grid-cols-1 gap-y-12 gap-x-12">
              <span className="relative flex flex-col gap-y-2">
                <label>Case Number</label>
                <input
                  className="border-gray-500 border bg-transparent rounded-lg p-2"
                  id="caseNumber"
                  name="caseNumber"
                  value={sendData.caseNumber}
                  onChange={(e) => handleChange(e)}
                  type="number"
                />
              </span>

              <span className="relative flex flex-col gap-y-2">
                <label>Operatör Adı</label>
                <input
                  required
                  className="border-gray-500 border bg-transparent rounded-lg p-2"
                  id="operatorAdi"
                  name="operatorAdi"
                  value={sendData.operatorAdi}
                  style={{ textTransform: "uppercase" }}
                  onChange={(e) => handleChange(e)}
                />
              </span>

              <span className="relative flex flex-col gap-y-2">
                <label>Firma Adı</label>
                <input
                  required
                  className="border-gray-500 border bg-transparent rounded-lg p-2"
                  id="firmaAdi"
                  name="firmaAdi"
                  style={{ textTransform: "uppercase" }}
                  value={sendData.firmaAdi}
                  onChange={(e) => handleChange(e)}
                />
              </span>

              <span className="relative flex flex-col gap-y-2">
                <label>Hizmet</label>
                <input
                  required
                  className="border-gray-500 border bg-transparent rounded-lg p-2"
                  id="hizmet"
                  name="hizmet"
                  style={{ textTransform: "uppercase" }}
                  value={sendData.hizmet}
                  onChange={(e) => handleChange(e)}
                />
              </span>

              <span className="relative flex flex-col gap-y-2">
                <label>Vaka Şehri</label>
                <select
                  required
                  className="border-gray-500 border bg-transparent rounded-lg p-2"
                  id="vakaSehri"
                  name="vakaSehri"
                  value={sendData.vakaSehri}
                  onChange={(e) => handleChange(e)}
                >
                  <option selected className="placeholder:text-gray-400">
                    İl Seçiniz
                  </option>
                  {il?.map((item, index) => (
                    <option key={index} value={`${item.id}/${item.name}`}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </span>

              <span className="relative flex flex-col gap-y-2">
                <label>Vaka İlçesi</label>
                <select
                  required
                  className="border-gray-500 border bg-transparent rounded-lg p-2"
                  id="vakaIlcesi"
                  name="vakaIlcesi"
                  value={sendData.vakaIlcesi}
                  onChange={(e) => handleChange(e)}
                >
                  {selectIlce?.map((item, index) => (
                    <option key={index} value={item.name}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </span>

              <span className="relative flex flex-col gap-y-2">
                <label>Poz Sayısı</label>
                <input
                  disabled
                  required
                  className="border-gray-500 border bg-transparent rounded-lg p-2"
                  id="pozSayisi"
                  name="pozSayisi"
                  min={1}
                  max={10}
                  value={pozNumber !== 0 ? pozNumber : sendData.pozSayisi}
                  onChange={(e) => handleChange(e)}
                  type="number"
                />
              </span>

              <span className="relative flex flex-col gap-y-2">
                <label>Mesafe</label>
                <input
                  required
                  className="border-gray-500 border bg-transparent rounded-lg p-2"
                  id="mesafe"
                  name="mesafe"
                  value={sendData.mesafe}
                  onChange={(e) => handleChange(e)}
                  type="number"
                />
              </span>

              <span className="relative flex flex-col gap-y-2">
                <label>Ek Poz</label>
                <input
                  className="border-gray-500 border bg-transparent rounded-lg p-2"
                  id="ekPoz"
                  name="ekPoz"
                  min={0}
                  max={10}
                  value={sendData.ekPoz}
                  onChange={(e) => handleChange(e)}
                  type="number"
                />
              </span>

              <span className="relative flex flex-col gap-y-2">
                <label>Vaka Sonlandıran</label>
                <input
                  required
                  className="border-gray-500 border bg-transparent rounded-lg p-2"
                  id="vakaSonlandiran"
                  name="vakaSonlandiran"
                  style={{ textTransform: "uppercase" }}
                  value={sendData.vakaSonlandiran}
                  onChange={(e) => handleChange(e)}
                />
              </span>

              <span className="flex flex-col gap-y-2">
                <label>Tarih</label>
                <input
                  required
                  className="border-gray-500 border bg-transparent text-gray-400 rounded-lg p-2"
                  id="date"
                  name="date"
                  value={sendData.date}
                  onChange={(e) => handleChange(e)}
                  onFocus={(e) => e.target.showPicker()}
                  type="date"
                />
              </span>

              <span className="flex flex-col gap-y-2">
                <label className="text-blue-600">Döküman</label>
                <input
                  className="bg-transparent file:bg-blue-600 file:border-none file:text-white file:rounded-lg file:p-2"
                  onChange={(e) => setFile(e.target.files[0])}
                  type="file"
                />
              </span>

              <span className="flex flex-col">
                <span className="flex flex-row gap-x-3">
                  <label>Project</label>
                  <input
                    type="checkbox"
                    name="project"
                    checked={project}
                    onChange={() => {
                      setPozNumber(0);
                      setProject(!project);
                    }}
                  />
                </span>

                {project ? (
                  <span className="flex flex-col gap-y-2">
                    <label>Proje Fiyat</label>
                    <input
                      required
                      className="border-gray-500 border bg-transparent rounded-lg p-2"
                      id="projeFiyat"
                      name="projeFiyat"
                      value={projeFiyat}
                      onChange={(e) => setProjeFiyat(e.target.value)}
                      type="number"
                    />
                  </span>
                ) : null}
              </span>
            </div>

            <div className="w-full">
              <span className="relative flex flex-col gap-y-2 mt-6">
                <label>Açıklama</label>
                <textarea
                  className="border-gray-500 border bg-transparent rounded-lg p-2"
                  id="aciklama"
                  name="aciklama"
                  value={sendData.aciklama}
                  onChange={(e) => handleChange(e)}
                  rows={6}
                />
              </span>
              <span className="grid grid-cols-4 gap-x-4 my-12">
                <span className="bg-gray-700 text-blue-600 font-bold rounded-lg p-2">
                  Poz Tutar: {pozTutar} ₺
                </span>
                <span className="bg-gray-700 text-blue-600 font-bold rounded-lg p-2">
                  Km Tutar: {kmTutar.toFixed(2)} ₺
                </span>
                <span className="bg-gray-700 text-blue-600 font-bold rounded-lg p-2">
                  Proje Tutar: {projeFiyat} ₺
                </span>
                {project ? (
                  <span className="bg-gray-700 text-blue-600 font-bold rounded-lg p-2">
                    Toplam:{" "}
                    {parseFloat(
                      parseFloat(projeFiyat) + parseFloat(kmTutar)
                    ).toFixed(2)}
                  </span>
                ) : (
                  <span className="bg-gray-700 text-blue-600 font-bold rounded-lg p-2">
                    Toplam: {total.toFixed(2)}
                  </span>
                )}
              </span>
              <button
                type="submit"
                className="bg-blue-600 mt-6 w-full p-2 rounded-lg"
              >
                Gönder
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
