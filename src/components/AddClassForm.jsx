import React, { useState } from "react";
import axiosClient from "../apis/axiosClient";

function AddClassForm() {
  const [className, setClassName] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Thêm lớp với tên:", className);

    try {
      const response = await axiosClient.post("/classes", {
        name: className,
      });
      console.log("Add class response:", response);
      if (response.success) {
        alert("Thêm lớp thành công!");
        setClassName("");
      } else {
        alert(response.message);
      }
    } catch (error) {
      console.error("Add class error:", error);
      alert("Lỗi thêm lớp! (xem console log)");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="className">
          Tên lớp
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="className"
          type="text"
          placeholder="Tên lớp"
          value={className}
          onChange={(e) => setClassName(e.target.value)}
        />
      </div>
      <div className="flex items-center justify-between">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Thêm
        </button>
      </div>
    </form>
  );
}

export default AddClassForm;