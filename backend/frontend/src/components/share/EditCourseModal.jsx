import React, { useState, useEffect } from 'react';
import {
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Checkbox,
    ListItemText,
} from '@mui/material';

const EditCourseModal = ({ isModalOpen, handleCloseModal, handleEditSubmit, handleChange, editCourse, notification, notificationType, notificationError, tutors, setNotification, setNotificationType, setNotificationError }) => {
    const daysOfWeek = [
        'Thứ 2 - 8:00 AM',
        'Thứ 2 - 10:00 AM',
        'Thứ 2 - 2:00 PM',
        'Thứ 2 - 4:00 PM',
        'Thứ 3 - 8:00 AM',
        'Thứ 3 - 10:00 AM',
        'Thứ 3 - 2:00 PM',
        'Thứ 3 - 4:00 PM',
        'Thứ 4 - 8:00 AM',
        'Thứ 4 - 10:00 AM',
        'Thứ 4 - 2:00 PM',
        'Thứ 4 - 4:00 PM',
        'Thứ 5 - 8:00 AM',
        'Thứ 5 - 10:00 AM',
        'Thứ 5 - 2:00 PM',
        'Thứ 5 - 4:00 PM',
        'Thứ 6 - 8:00 AM',
        'Thứ 6 - 10:00 AM',
        'Thứ 6 - 2:00 PM',
        'Thứ 6 - 4:00 PM',
        'Thứ 7 - 8:00 AM',
        'Thứ 7 - 10:00 AM',
        'Thứ 7 - 2:00 PM',
        'Thứ 7 - 4:00 PM',
    ];
    const [formData, setFormData] = useState({
        className: '',
        teacher: '',
        classSize: '',
        tuitionFee: '',
        schedule: [],
    });
    const [startDate, setStartDate] = useState('');
    useEffect(() => {
        if (editCourse) {
            setFormData({
                className: editCourse.className || '',
                teacher: editCourse.teacher || '',
                classSize: editCourse.classSize || '',
                tuitionFee: editCourse.tuitionFee || '',
                 schedule: Array.isArray(editCourse.schedule) ? editCourse.schedule.map(String) : [],
            });
            setStartDate(editCourse.startDate || '');
        }
    }, [editCourse]);
      const handleFormChange = (event) => {
        const { name, value } = event.target;
         setFormData(prev => {
              if(name === 'schedule'){
                    return {...prev, [name]: Array.isArray(value) ? value : []};
                }
                 if (name === 'classSize' && value < 0) {
                return { ...prev, [name]: 0 };
            }
                 return {...prev, [name]: value};
          });
          if (name === 'startDate') {
            setStartDate(value); // Update startDate state
        }
     };
     const handleFormSubmit = (event) => {
        event.preventDefault();
         handleEditSubmit({ ...editCourse, ...formData, startDate });
         setNotification("Đã chỉnh sửa lớp học thành công!");
         setNotificationType("edit");
        setTimeout(() => {
           setNotification('');
            setNotificationType('');
            setNotificationError('');
            handleCloseModal();
         }, 1000);
    };

    return (
        <div
            className={`fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50
             ${isModalOpen ? "block" : "hidden"}`}
        >
            <div className="bg-white p-8 rounded shadow-lg w-3/5 relative">
                <h2 className="text-2xl font-bold mb-4">Chỉnh Sửa Lớp Học</h2>
                {notificationError && notificationType === "edit" && (
                    <div className="bg-red-100 border-t-4 border-red-500 rounded-b text-red-900 px-4 py-3 shadow-md mb-4" role="alert">
                        <div className="flex">
                            <div>
                                <p className="text-sm">{notificationError}</p>
                            </div>
                        </div>
                    </div>
                )}
                {/* Hiển thị thông báo từ component cha (nếu có) */}
                {notification && notificationType === "edit" && (
                    <div className="bg-green-100 border-t-4 border-green-500 rounded-b text-green-900 px-4 py-3 shadow-md mb-4" role="alert">
                        <div className="flex">
                            <div>
                                <p className="text-sm">{notification}</p>
                            </div>
                        </div>
                    </div>
                )}
                <form onSubmit={handleFormSubmit} className="grid grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="className" className="block text-sm font-medium text-gray-700">Tên Lớp</label>
                        <input
                            type="text"
                            id="className"
                            className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
                            name="className"
                            value={formData.className}
                            onChange={handleFormChange}
                            required
                        />
                    </div>
                    <div>
                        <FormControl fullWidth>
                            <InputLabel id="teacher-label" className="text-sm font-medium text-gray-700">Giáo Viên</InputLabel>
                            <Select
                                labelId="teacher-label"
                                id="teacher"
                                className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
                                name="teacher"
                                value={formData.teacher}
                                onChange={handleFormChange}
                                label="Giáo Viên"
                                required
                            >
                                <MenuItem value="" disabled>
                                    Chọn giáo viên
                                </MenuItem>
                                {tutors && tutors.map(tutor => (
                                    <MenuItem key={tutor.id} value={tutor.id}>
                                        {tutor.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div>
                    <div>
                        <label htmlFor="classSize" className="block text-sm font-medium text-gray-700">Sĩ số</label>
                        <input
                            type="number"
                            id="classSize"
                            className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
                            name="classSize"
                            value={formData.classSize}
                            onChange={handleFormChange}
                            required
                            min="0"
                        />
                    </div>
                    <div>
                        <label htmlFor="tuitionFee" className="block text-sm font-medium text-gray-700">Học phí / tháng</label>
                        <input
                            type="text"
                            id="tuitionFee"
                            className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
                            name="tuitionFee"
                            value={formData.tuitionFee}
                            onChange={handleFormChange}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="schedule" className="block text-sm font-medium text-gray-700">Lịch học</label>
                        <FormControl fullWidth>
                            <Select
                                labelId="schedule-label"
                                id="schedule"
                                className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
                                multiple
                                value={formData.schedule}
                                onChange={handleFormChange}
                                renderValue={(selected) => selected.join(', ')}
                                name="schedule"
                                required
                            >
                                {daysOfWeek.map((day) => (
                                    <MenuItem key={day} value={day}>
                                        <Checkbox checked={formData.schedule.indexOf(day) > -1} />
                                        <ListItemText primary={day} />
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div>
                    <div>
                        <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
                        Ngày Bắt Đầu
                        </label>
                        <input
                        type="date"
                        id="startDate"
                        className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
                        name="startDate"
                        value={startDate}
                        onChange={handleFormChange}
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
                            Thay Đổi
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditCourseModal;