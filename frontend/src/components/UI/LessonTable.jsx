import React from "react";

const LessonTable = ({ courses }) => {
  return (
    <div className="p-4 font-sans w-full">
      <div className="justify-start items-start gap-1 inline-flex mb-4">
        <div className="w-6 h-6 relative">
          <div className="w-6 h-6 left-0 top-0 absolute bg-[#d9d9d9]" />
        </div>
        <div
          className="text-[#001d6c] text-base font-semibold"
          style={{ fontFamily: "Roboto" }}
        >
          Lịch học
        </div>
      </div>
      <table className="w-full">
        <thead>
          <tr className="bg-[#f2f4f8]">
            <th
              className="text-[#001d6c] text-base font-semibold text-center py-2 px-4"
              style={{ fontFamily: "Roboto" }}
            >
              #
            </th>
            <th
              className="text-[#001d6c] text-base font-semibold text-left py-2 px-4"
              style={{ fontFamily: "Roboto" }}
            >
              Tên Khóa Học
            </th>
            <th
              className="text-[#001d6c] text-base font-semibold text-left py-2 px-4"
              style={{ fontFamily: "Roboto" }}
            >
              Ngày Bắt Đầu
            </th>
            <th
              className="text-[#001d6c] text-base font-semibold text-left py-2 px-4"
              style={{ fontFamily: "Roboto" }}
            >
              Ngày Hết Hạn
            </th>
             <th
              className="text-[#001d6c] text-base font-semibold text-left py-2 px-4"
              style={{ fontFamily: "Roboto" }}
            >
              Gia sư
            </th>
            <th
              className="text-[#001d6c] text-base font-semibold text-center py-2 px-4"
              style={{ fontFamily: "Roboto" }}
            >
              Giá
            </th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course, index) => (
            <tr key={course.id} >
              <td
                className="text-[#001d6c] text-base font-normal text-right py-2 px-4"
                 style={{ fontFamily: "Roboto", paddingLeft: '16px'  }}
              >
                {index + 1}
              </td>
              <td
                className="text-[#697077] text-base font-normal py-2 px-4"
                 style={{ fontFamily: "Roboto" }}
              >
                {course.name}
              </td>
              <td
                className="text-[#697077] text-base font-normal py-2 px-4"
                style={{ fontFamily: "Roboto" }}
              >
                {course.startDate}
              </td>
              <td
                className="text-[#697077] text-base font-normal py-2 px-4"
                style={{ fontFamily: "Roboto" }}
              >
                {course.dueDate}
              </td>
               <td
                className="text-[#697077] text-base font-normal py-2 px-4"
                style={{ fontFamily: "Roboto" }}
              >
                {course.tutor}
              </td>
              <td
                className="text-center py-2 px-4"
                style={{ fontFamily: "Roboto" }}
              >
                <div
                    className="px-[9px] py-px bg-[#dde1e6] rounded justify-center items-center gap-2.5 inline-flex overflow-hidden"
                  style={{ fontFamily: "Roboto" }}
                >
                  <div className="text-center text-[#001d6c] text-sm font-normal">
                    {course.price}
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LessonTable;