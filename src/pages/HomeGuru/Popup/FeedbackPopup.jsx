import React, { useState, useEffect } from "react";
import { Input, Button, CheckboxGroup, Checkbox } from "@nextui-org/react";

const FeedbackPopup = ({ onSubmit, onAccept, namaUstadz }) => {
  const [formData, setFormData] = useState({
    tajwid: "",
    komentar: "",
    kelancaran: "",
    rating: "",
    namaUstadz: namaUstadz,
  });

  useEffect(() => {
    setFormData((prevData) => ({ ...prevData, namaUstadz }));
  }, [namaUstadz]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleKelancaranChange = (value) => {
    setFormData((prevData) => ({ ...prevData, kelancaran: value[0] || "" }));
  };

  const handleTajwidChange = (value) => {
    setFormData((prevData) => ({ ...prevData, tajwid: value[0] || "" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    onAccept(); // Call onAccept function after onSubmit
    // Reset form after submission
    setFormData({ tajwid: "", komentar: "", kelancaran: "", rating: "", namaUstadz: namaUstadz });
  };

  return (
    <div className="px-1 py-2">
      <form onSubmit={handleSubmit} className="flex w-full flex-wrap md:flex-nowrap gap-4">
        <CheckboxGroup orientation="horizontal" label="Kelancaran" onChange={handleKelancaranChange} value={formData.kelancaran ? [formData.kelancaran] : []}>
          <Checkbox value="lancar">Lancar</Checkbox>
          <Checkbox value="cukup">Cukup</Checkbox>
          <Checkbox value="tidak lancar">Tidak Lancar</Checkbox>
        </CheckboxGroup>

        <CheckboxGroup orientation="horizontal" label="Tajwid" onChange={handleTajwidChange} value={formData.tajwid ? [formData.tajwid] : []}>
          <Checkbox value="sangat baik">Sangat Baik</Checkbox>
          <Checkbox value="baik">Baik</Checkbox>
          <Checkbox value="kurang">Kurang</Checkbox>
          <Checkbox value="kurang sekali">Kurang Sekali</Checkbox>
        </CheckboxGroup>

        <Input type="number" label="Rating" name="rating" placeholder="1-10" value={formData.rating} onChange={handleChange} />
        <Input label="Komentar" name="komentar" placeholder="Masukkan Komentar Anda" value={formData.komentar} onChange={handleChange} />
        <Input label="Nama Ustadz" name="namaUstadz" placeholder="Masukkan Nama Ustadz" value={formData.namaUstadz} onChange={handleChange} />
        <Button type="submit">Kirim</Button>
      </form>
    </div>
  );
};

export default FeedbackPopup;
