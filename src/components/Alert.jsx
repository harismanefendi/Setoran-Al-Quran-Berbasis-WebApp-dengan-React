function Alert() {
  const [showAlert, setShowAlert] = useState(false);

  const handleButtonClick = () => {
    setShowAlert(true);
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  return (
    <div className="container mx-auto mt-4">
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleButtonClick}>
        Tampilkan Alert
      </button>

      {showAlert && <Alert message="Ini adalah pesan alert!" onClose={handleCloseAlert} />}
    </div>
  );
}

export default Alert;
