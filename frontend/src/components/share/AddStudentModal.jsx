import React from 'react';

const AddStudentModal = ({ isModalOpen, handleCloseModal, handleSubmit, handleChange, newStudent, notification, notificationType, notificationError }) => {
    return (
        <div
            className={`fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50 ${isModalOpen ? "block" : "hidden"}`}
        >
            <div className="bg-white p-8 rounded shadow-lg w-3/5 relative">
                <h2 className="text-2xl font-bold mb-4">Thêm Học Viên</h2>
                {notificationError && notificationType === "add" && (
                    <div className="bg-red-100 border-t-4 border-red-500 rounded-b text-red-900 px-4 py-3 shadow-md mb-4" role="alert">
                        <div className="flex">
                            <div>
                                <p className="text-sm">{notificationError}</p>
                            </div>
                        </div>
                    </div>
                )}
                {notification && notificationType === "add" && (
                    <div className="bg-green-100 border-t-4 border-green-500 rounded-b text-green-900 px-4 py-3 shadow-md mb-4" role="alert">
                        <div className="flex">
                            <div>
                                <p className="text-sm">{notification}</p>
                            </div>
                        </div>
                    </div>
                )}
                <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
                    {/* <div>
                        <label htmlFor="id" className="block text-sm font-medium text-gray-700">Mã học viên</label>
                        <input
                            type="text"
                            id="id"
                            className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
                            name="id"
                            value={newStudent.id}
                            onChange={handleChange}
                            required
                        />
                    </div> */}
                     <div>
                         <label htmlFor="username" className="block text-sm font-medium text-gray-700">Tên đăng nhập</label>
                         <input
                            type="text"
                            id="username"
                            className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
                            name="username"
                            value={newStudent.username}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                         <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                         <input
                            type="email"
                            id="email"
                            className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
                            name="email"
                            value={newStudent.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                         <label htmlFor="gender" className="block text-sm font-medium text-gray-700">Giới tính</label>
                         <select
                             id="gender"
                           className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
                            name="gender"
                             value={newStudent.gender}
                            onChange={handleChange}
                           required
                         >
                           <option value="">Chọn giới tính</option>
                           <option value="Nam">Nam</option>
                             <option value="Nữ">Nữ</option>
                         </select>
                    </div>
                     <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Số điện thoại</label>
                        <input
                            type="text"
                            id="phone"
                            className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
                            name="phone"
                           value={newStudent.phone}
                            onChange={handleChange}
                            required
                        />
                     </div>
                   <div>
                        <label htmlFor="dob" className="block text-sm font-medium text-gray-700">Ngày sinh</label>
                         <input
                            type="date"
                            id="dob"
                             className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
                            name="dob"
                            value={newStudent.dob}
                             onChange={handleChange}
                             required
                        />
                    </div>
                    <div>
                       <label htmlFor="classOfSchool" className="block text-sm font-medium text-gray-700">Lớp</label>
                        <input
                           type="text"
                            id="classOfSchool"
                            className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
                           name="classOfSchool"
                             value={newStudent.classOfSchool}
                            onChange={handleChange}
                           required
                         />
                   </div>
                   <div>
                        <label htmlFor="school" className="block text-sm font-medium text-gray-700">Trường học</label>
                        <input
                            type="text"
                            id="school"
                           className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
                            name="school"
                             value={newStudent.school}
                            onChange={handleChange}
                            required
                        />
                   </div>
                    <div>
                       <label htmlFor="classStudents" className="block text-sm font-medium text-gray-700">Lớp học thêm</label>
                        <input
                             type="text"
                             id="classStudents"
                             className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
                           name="classStudents"
                            value={newStudent.classStudents.join(", ")}
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
                            Thêm
                       </button>
                    </div>
               </form>
            </div>
       </div>
    );
};

export default AddStudentModal;