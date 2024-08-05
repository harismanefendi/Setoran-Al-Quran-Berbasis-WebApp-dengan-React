import { useState, useEffect } from "react";
import { ref, get } from "firebase/database";
import { db } from "../../config/firebase";
import RiwayatSkeleton from "../../components/skeleton/RiwayatSkeleton";
import NavigationBar from "./Navigate/NavigationBar";
import { useNavigate } from "react-router-dom";

function Riwayat() {
  const [setoranList, setSetoranList] = useState([]);
  const [selectedSetoran, setSelectedSetoran] = useState(null);
  const [showVideo, setShowVideo] = useState(false);
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
          videoUrl: setoranData[key].uploadedFileUrl, // assuming you have a video URL
        }));
        setSetoranList(setoranArray);
      } else {
        console.log("No setoran data available");
        setSetoranList([]);
      }
    });
  }, [userEmail]);

  const navigate = useNavigate();

  const handleDownload = () => {
    navigate("/download-form2");
  };

  const handleViewVideo = (videoUrl) => {
    setSelectedSetoran(videoUrl);
    setShowVideo(true);
  };

  return (
    <div>
      <div className="container mx-auto p-4">
        <h2 className="md:text-2xl text-xl font-bold mb-4 text-center">Riwayat Setoran</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white text-xs md:text-base shadow-md rounded-lg">
            <thead>
              <tr>
                <th className="px-4 py-2">Hari dan Tanggal</th>
                <th className="px-4 py-2">Surah</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {setoranList.length > 0 ? (
                setoranList.map((setoran, index) => (
                  <tr key={index} className="border-t">
                    <td className="border px-4 py-2">{setoran.hariTanggal}</td>
                    <td className="border px-4 py-2">{setoran.suratAwal}</td>
                    <td className="border px-4 py-2">{setoran.status}</td>
                    <td className="border px-4 py-2 text-center">
                      <button className="bg-blue-500 text-white px-4 py-2 rounded-lg" onClick={() => handleViewVideo(setoran.videoUrl)}>
                        View
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="border px-4 py-2" colSpan="4">
                    <RiwayatSkeleton />
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <div className="text-center mt-4">
        <button onClick={handleDownload} className="bg-green-500 text-white px-4 py-2 rounded-lg">
          Download
        </button>
      </div>
      {showVideo && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <video width="480" height="360" controls>
              <source src={selectedSetoran} type="video/mp4" />
            </video>
            <button className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg" onClick={() => setShowVideo(false)}>
              Close
            </button>
          </div>
        </div>
      )}
      <div className="fixed inset-x-0 bottom-0 bg-white py-3 px-2 shadow-lg">
        <NavigationBar />
      </div>
    </div>
  );
}

export default Riwayat;
