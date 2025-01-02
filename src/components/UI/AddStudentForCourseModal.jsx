import React from 'react';
import {
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Checkbox,
    ListItemText,
} from '@mui/material';

const AddStudentForCourseModal = ({ isModalOpen, handleCloseModal, handleSubmit, handleChange, newStudent, notification, notificationType, notificationError }) => {
    const genders = [
        'Nam', 'Nữ'
    ];
    const grades = [
        '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'
    ];

    return (
        <div
            className={`fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50
             ${isModalOpen ? 'block' : 'hidden'}`}
        >
            <div className="bg-white p-8 rounded shadow-lg w-3/5 relative">
                <h2 className="text-2xl font-bold mb-4">Thêm Học Viên</h2>
                {notificationError && notificationType === 'add' && (
                    <div className="bg-red-100 border-t-4 border-red-500 rounded-b text-red-900 px-4 py-3 shadow-md mb-4" role="alert">
                        <div className="flex">
                            <div>
                                <p className="text-sm">{notificationError}</p>
                            </div>
                        </div>
                    </div>
                )}
                {notification && notificationType === 'add' && (
                    <div className="bg-green-100 border-t-4 border-green-500 rounded-b text-green-900 px-4 py-3 shadow-md mb-4" role="alert">
                        <div className="flex">
                            <div>
                                <p className="text-sm">{notification}</p>
                            </div>
                        </div>
                    </div>
                )}
                <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            Họ và Tên
                        </label>
                        <input
                            type="text"
                            id="name"
                            className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
                            name="name"
                            value={newStudent.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
                            Số điện thoại
                        </label>
                        <input
                            type="text"
                            id="phoneNumber"
                            className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
                            name="phoneNumber"
                            value={newStudent.phoneNumber}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <FormControl fullWidth>
                            <InputLabel id="gender-label" className="text-sm font-medium text-gray-700">
                                Giới Tính
                            </InputLabel>
                            <Select
                                labelId="gender-label"
                                id="gender"
                                className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
                                name="gender"
                                value={newStudent.gender}
                                onChange={handleChange}
                                label="Giới Tính"
                                required
                            >
                                <MenuItem value="" disabled>
                                    Chọn giới tính
                                </MenuItem>
                                {genders.map((gender) => (
                                    <MenuItem key={gender} value={gender}>
                                        {gender}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div>
                    <div>
                        <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700">
                            Ngày Sinh
                        </label>
                        <input
                            type="date"
                            id="dateOfBirth"
                            className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
                            name="dateOfBirth"
                            value={newStudent.dateOfBirth}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <FormControl fullWidth>
                            <InputLabel id="grade-label" className="text-sm font-medium text-gray-700">
                                Lớp
                            </InputLabel>
                            <Select
                                labelId="grade-label"
                                id="grade"
                                className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
                                name="grade"
                                value={newStudent.grade}
                                onChange={handleChange}
                                label="Lớp"
                                required
                            >
                                <MenuItem value="" disabled>
                                    Chọn lớp
                                </MenuItem>
                                {grades.map((grade) => (
                                    <MenuItem key={grade} value={grade}>
                                        {grade}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div>
                    <div>
                        <label htmlFor="school" className="block text-sm font-medium text-gray-700">
                            Trường Học
                        </label>
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

export default AddStudentForCourseModal;