import React, { useState } from "react";
import axiosClient from "../apis/axiosClient";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Đăng nhập với:", username, password);

    try {
      const response = await axiosClient.post("/login", {
        username,
        password,
      });
      console.log("Login response:", response);
      // Xử lý response (lưu token, chuyển hướng, ...)
      if (response.success) {
        // Lưu token vào localStorage
        // localStorage.setItem("accessToken", response.token);
        // Chuyển hướng đến trang chính
        // window.location.href = "/";
        alert("Đăng nhập thành công (xem console log)");
      } else {
        alert(response.message);
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Lỗi đăng nhập! (xem console log)");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-1/3"
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="username"
          >
            Tên đăng nhập
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            placeholder="Tên đăng nhập"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Mật khẩu
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="Mật khẩu"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Đăng nhập
          </button>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;