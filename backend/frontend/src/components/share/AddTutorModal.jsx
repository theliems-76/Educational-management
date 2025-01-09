import React from 'react';

const AddTutorModal = ({ isModalOpen, handleCloseModal, handleSubmit, handleChange, newTutor, notification, notificationType, notificationError }) => {
    return (
        <div
            className={`fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center
             ${isModalOpen ? "block" : "hidden"}`
            } >
            <div className="bg-white p-8 rounded shadow-lg w-3/5"> {/* Adjusted width */}
                <h2 className="text-2xl font-bold mb-4">Thêm Giáo Viên</h2>
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
                <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4"> {/* Grid layout */}
                    <div>
                        <label htmlFor="id" className="block text-sm font-medium text-gray-700">Mã giáo viên </label>
                         <input
                            type="text"
                            id="id"
                             className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
                           name="id"
                            value={newTutor.id}
                            onChange={handleChange}
                            required
                        />
                    </div>
                  <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Họ và Tên</label>
                        <input
                            type="text"
                            id="name"
                            className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
                            name="name"
                            value={newTutor.name}
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
                             value={newTutor.gender}
                             onChange={handleChange}
                             required
                         >
                           <option value="">Chọn giới tính</option>
                           <option value="Nam">Nam</option>
                            <option value="Nữ">Nữ</option>
                       </select>
                    </div>
                    <div>
                         <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">Số điện thoại</label>
                         <input
                            type="text"
                             id="phoneNumber"
                           className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
                             name="phoneNumber"
                            value={newTutor.phoneNumber}
                            onChange={handleChange}
                             required
                       />
                   </div>
                   <div>
                        <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700">Ngày sinh</label>
                         <input
                             type="date"
                             id="dateOfBirth"
                            className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
                            name="dateOfBirth"
                             value={newTutor.dateOfBirth}
                             onChange={handleChange}
                             required
                         />
                   </div>
                    <div>
                        <label htmlFor="major" className="block text-sm font-medium text-gray-700">Chuyên ngành</label>
                       <input
                           type="text"
                           id="major"
                            className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
                           name="major"
                            value={newTutor.major}
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
                            value={newTutor.school}
                           onChange={handleChange}
                            required
                         />
                     </div>
                    <div>
                        <label htmlFor="teachingClasses" className="block text-sm font-medium text-gray-700">Lớp giảng dạy</label>
                        <input
                             type="text"
                           id="teachingClasses"
                            className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
                            name="teachingClasses"
                            value={newTutor.teachingClasses.join(", ")}
                            onChange={handleChange}
                           required
                        />
                    </div>
                    <div>
                        <label htmlFor="hourlyRate" className="block text-sm font-medium text-gray-700">Lương/h</label>
                       <input
                             type="text"
                            id="hourlyRate"
                           className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
                           name="hourlyRate"
                           value={newTutor.hourlyRate}
                             onChange={handleChange}
                           required
                       />
                    </div>
                    <div className="col-span-2 flex justify-end"> {/* Adjusted button container */}
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

export default AddTutorModal;