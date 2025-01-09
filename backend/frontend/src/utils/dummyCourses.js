const dummyCourses = [
    {
        id: "1",
        image: "",
        teacher: "1", // Thêm tên giáo viên
        className: "Toán 10 Nâng Cao", // Rõ ràng hơn
        schedule: "Thứ 2, 4, 6 - 9:00 AM", // Rõ ràng hơn
        classSize: 20,
        isNew: true,
        tuitionFee: 100,
        startDate: "15-03-2024",
        students: [
            { id: 101, name: 'Lê Thị M', phoneNumber: '0987654321', gender: 'Nữ', dateOfBirth: '2008-01-15', grade: '10', school: 'Trường THPT ABC', extraClasses: ['Lý', 'Hóa'] },
            { id: 102, name: 'Nguyễn Văn N', phoneNumber: '0912345678', gender: 'Nam', dateOfBirth: '2008-05-20', grade: '10', school: 'Trường THPT XYZ', extraClasses: ['Anh'] },
            { id: 103, name: 'Trần Thị O', phoneNumber: '0909876543', gender: 'Nữ', dateOfBirth: '2008-11-10', grade: '10', school: 'Trường THPT DEF', extraClasses: [] },
            // ... Thêm học viên khác vào đây (tối đa 20)
        ]
    },
    {
        id: "2",
        image: "",
        teacher: "2",
        className: "Vật Lý 11 Chuyên Sâu",
        schedule: "Thứ 3, 5 - 10:00 AM",
        classSize: 25,
        isNew: false,
        tuitionFee: 120,
        startDate: "18-03-2024",
        students: [
            { id: 201, name: 'Phạm Văn P', phoneNumber: '0976543210', gender: 'Nam', dateOfBirth: '2007-03-12', grade: '11', school: 'Trường THPT QWE', extraClasses: ['Toán', 'Hóa'] },
            { id: 202, name: 'Hoàng Thị Q', phoneNumber: '0965432109', gender: 'Nữ', dateOfBirth: '2007-07-25', grade: '11', school: 'Trường THPT RST', extraClasses: ['Anh', 'Văn'] },
            // ... Thêm học viên khác vào đây (tối đa 25)
        ]
    },
    {
        id: "3",
        image: "",
        teacher: "3",
        className: "Hóa Học 12 Ôn Thi",
        schedule: "Thứ 2, 6 - 11:00 AM",
        classSize: 30,
        isNew: false,
        tuitionFee: 110,
        startDate: "20-03-2024",
        students: [
            { id: 301, name: 'Đinh Văn R', phoneNumber: '0954321098', gender: 'Nam', dateOfBirth: '2006-09-18', grade: '12', school: 'Trường THPT UVW', extraClasses: ['Toán', 'Lý'] },
            { id: 302, name: 'Vũ Thị S', phoneNumber: '0943210987', gender: 'Nữ', dateOfBirth: '2006-12-05', grade: '12', school: 'Trường THPT JKL', extraClasses: ['Sinh'] },
            // ... Thêm học viên khác vào đây (tối đa 30)
        ]
    },
    {
        id: "4",
        image: "",
        teacher: "4",
        className: "Tiếng Anh Giao Tiếp",
        schedule: "Thứ 3, 5 - 1:00 PM",
        classSize: 15,
        isNew: true,
        tuitionFee: 130,
        startDate: "22-03-2024",
        students: [
            { id: 401, name: 'Ngô Văn T', phoneNumber: '0932109876', gender: 'Nam', dateOfBirth: '2005-04-22', grade: '12', school: 'Trường THPT MNO', extraClasses: [] },
             // ... Thêm học viên khác vào đây (tối đa 15)
        ]
    },
    {
        id: "5",
        image: "",
        teacher: "5",
        className: "Sinh Học Đại Cương",
        schedule: "Thứ 2, 4 - 2:00 PM",
        classSize: 20,
        isNew: false,
        tuitionFee: 140,
        startDate: "25-03-2024",
        students: [
             { id: 501, name: 'Bùi Thị U', phoneNumber: '0921098765', gender: 'Nữ', dateOfBirth: '2007-06-10', grade: '11', school: 'Trường THPT PQR', extraClasses: ['Hóa'] },
             // ... Thêm học viên khác vào đây (tối đa 20)
        ]
    },
    {
        id: "6",
        image: "",
        teacher: "6",
        className: "Lịch Sử Thế Giới",
        schedule: "Thứ 3, 5 - 3:00 PM",
        classSize: 25,
        isNew: false,
        tuitionFee: 150,
        startDate: "27-03-2024",
        students: [
            { id: 601, name: 'Trương Văn V', phoneNumber: '0910987654', gender: 'Nam', dateOfBirth: '2006-08-14', grade: '12', school: 'Trường THPT STU', extraClasses: ['Địa'] },
             // ... Thêm học viên khác vào đây (tối đa 25)
        ]
    },
    {
        id: "7",
        image: "",
        teacher: "7",
        className: "Mỹ Thuật Cơ Bản",
        schedule: "Thứ 2, 6 - 4:00 PM",
        classSize: 30,
        isNew: false,
        tuitionFee: 160,
        startDate: "29-03-2024",
        students: [
            { id: 701, name: 'Lý Thị W', phoneNumber: '0909876543', gender: 'Nữ', dateOfBirth: '2009-02-28', grade: '9', school: 'Trường THCS GHI', extraClasses: [] },
             // ... Thêm học viên khác vào đây (tối đa 30)
        ]
    },
    {
        id: "8",
        image: "",
        teacher: "8",
        className: "Âm Nhạc Hiện Đại",
        schedule: "Thứ 4, 6 - 5:00 PM",
        classSize: 15,
        isNew: true,
        tuitionFee: 170,
        startDate: "01-04-2024",
        students: [
            { id: 801, name: 'Mai Văn X', phoneNumber: '0987654321', gender: 'Nam', dateOfBirth: '2008-10-17', grade: '10', school: 'Trường THPT JKL', extraClasses: [] },
             // ... Thêm học viên khác vào đây (tối đa 15)
        ]
    },
    {
        id: "9",
        image: "",
        teacher: "9",
        className: "Luyện Thi IELTS",
        schedule: "Thứ 4, 6 - 5:00 PM",
        classSize: 15,
        isNew: true,
        tuitionFee: 180,
        startDate: "05-04-2024",
        students: [
            { id: 901, name: 'Đào Thị Y', phoneNumber: '0912345678', gender: 'Nữ', dateOfBirth: '2006-11-24', grade: '12', school: 'Trường THPT MNO', extraClasses: [] },
            // ... Thêm học viên khác vào đây (tối đa 15)
        ]
    },
];

export default dummyCourses;