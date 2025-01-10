import React from 'react';

const EditTutorModal = ({
  isModalOpen,
  handleCloseModal,
  handleEditSubmit,
  handleChange,
  editTutor,
  notification,
  notificationType,
  notificationError,
}) => {
  return (
    <div
      className={`fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50 ${
        isModalOpen ? 'block' : 'hidden'
      }`}
    >
      <div className="bg-white p-8 rounded shadow-lg w-3/5 relative">
        <h2 className="text-2xl font-bold mb-4">Chỉnh Sửa Giáo Viên</h2>
        {notificationError && notificationType === 'edit' && (
          <div
            className="bg-red-100 border-t-4 border-red-500 rounded-b text-red-900 px-4 py-3 shadow-md mb-4"
            role="alert"
          >
            <div className="flex">
              <div>
                <p className="text-sm">{notificationError}</p>
              </div>
            </div>
          </div>
        )}
        {notification && notificationType === 'edit' && (
          <div
            className="bg-green-100 border-t-4 border-green-500 rounded-b text-green-900 px-4 py-3 shadow-md mb-4"
            role="alert"
          >
            <div className="flex">
              <div>
                <p className="text-sm">{notification}</p>
              </div>
            </div>
          </div>
        )}
        <form onSubmit={handleEditSubmit} className="grid grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="id"
              className="block text-sm font-medium text-gray-700"
            >
              ID
            </label>
            <input
              type="text"
              id="id"
              className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
              name="id"
              value={editTutor.id}
              readOnly
              disabled
            />
          </div>
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Tên đăng nhập
            </label>
            <input
              type="text"
              id="username"
              className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
              name="username"
              value={editTutor.username}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
              name="email"
              value={editTutor.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label
              htmlFor="gender"
              className="block text-sm font-medium text-gray-700"
            >
              Giới tính
            </label>
            <select
              id="gender"
              className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
              name="gender"
              value={editTutor.gender}
              onChange={handleChange}
              required
            >
              <option value="">Chọn giới tính</option>
              <option value="Nam">Nam</option>
              <option value="Nữ">Nữ</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700"
            >
              Số điện thoại
            </label>
            <input
              type="text"
              id="phone"
              className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
              name="phone"
              value={editTutor.phone}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label
              htmlFor="dob"
              className="block text-sm font-medium text-gray-700"
            >
              Ngày sinh
            </label>
            <input
              type="date"
              id="dob"
              className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
              name="dob"
              value={editTutor.dob}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label
              htmlFor="subject_name"
              className="block text-sm font-medium text-gray-700"
            >
              Môn dạy
            </label>
            <input
              type="text"
              id="subject_name"
              className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
              name="subject_name"
              value={editTutor.subject_name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label
              htmlFor="school"
              className="block text-sm font-medium text-gray-700"
            >
              Trường học
            </label>
            <input
              type="text"
              id="school"
              className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
              name="school"
              value={editTutor.school}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label
              htmlFor="income"
              className="block text-sm font-medium text-gray-700"
            >
              Lương
            </label>
            <input
              type="number"
              id="income"
              className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
              name="income"
              value={editTutor.income}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-span-2 flex justify-end">
            <button
              type="button"
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-2"
              onClick={handleCloseModal}
            >
              Hủy
            </button>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Cập nhật
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTutorModal;