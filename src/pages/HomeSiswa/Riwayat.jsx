import { useState, useEffect } from "react";
import { ref, get } from "firebase/database";
import { db } from "../../config/firebase";
import Loading from "../../components/LoadingFeedback/Loading";
import NavigationBar from "./Navigate/NavigationBar";

function Riwayat() {
  const [setoranList, setSetoranList] = useState([]);
  const userEmail = JSON.parse(localStorage.getItem("user")).email;

  useEffect(() => {
    const userEmailKey = userEmail.replace(".", ",");
    const setoranRef = ref(db, `setoran/${userEmailKey}`);

    get(setoranRef).then((setoranSnapshot) => {
      if (setoranSnapshot.exists()) {
        const setoranData = setoranSnapshot.val();
        const setoranArray = Object.keys(setoranData).map((key) => ({
          id: key,
          hariTanggal: new Date(setoranData[key].tanggal).toLocaleString("id-ID", { weekday: "long", year: "numeric", month: "long", day: "numeric" }),
          suratAwal: setoranData[key].suratAwal,
          status: setoranData[key].status,
        }));
        setSetoranList(setoranArray);
      } else {
        console.log("No setoran data available");
        setSetoranList([]);
      }
    });
  }, [userEmail]);

  return (
    <div>
      <div className="container mx-auto p-4">
        <h2 className="text-xl font-bold mb-4">Riwayat Setoran</h2>
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="px-4 py-2">Hari dan Tanggal</th>
              <th className="px-4 py-2">Awal Surah</th>
              <th className="px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {setoranList.length > 0 ? (
              setoranList.map((setoran, index) => (
                <tr key={index}>
                  <td className="border px-4 py-2">{setoran.hariTanggal}</td>
                  <td className="border px-4 py-2">{setoran.suratAwal}</td>
                  <td className="border px-4 py-2">{setoran.status}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="border px-4 py-2" colSpan="3">
                  <Loading text="Riwayat Setoran" />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="fixed inset-x-0 bottom-0 bg-white py-3 px-2 shadow-lg">
        <NavigationBar />
      </div>
    </div>
  );
}

export default Riwayat;
