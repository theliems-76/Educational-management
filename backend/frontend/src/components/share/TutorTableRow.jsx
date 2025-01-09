import React from 'react';

const TutorTableRow = ({ tutor, selectedRows, handleRowSelect, handleOpenEditModal }) => {
  return (
        <tr
            key={tutor.id}
              className="border-b border-gray-200 hover:bg-gray-100 cursor-pointer"
            onClick={() => handleRowSelect(tutor.id)}
             style={{
                  backgroundColor: selectedRows.includes(tutor.id)
                      ? "#f0f0f0"
                      : "white",
                }}
       >
          <td
             className="text-gray-700 text-base font-normal py-2 px-4"
             style={{ fontFamily: "Roboto" }}
           >
             {tutor.id}
           </td>
           <td
              className="text-blue-800 text-base font-semibold py-2 px-4"
               style={{ fontFamily: "Roboto" }}
              >
               {tutor.name}
                 <div className="text-gray-500 text-sm">{tutor.phoneNumber}</div>
             </td>
             <td
              className="text-gray-700 text-base font-normal py-2 px-4"
               style={{ fontFamily: "Roboto" }}
              >
               {tutor.gender}
           </td>
            <td
              className="text-gray-700 text-base font-normal py-2 px-4"
               style={{ fontFamily: "Roboto" }}
            >
              {tutor.dateOfBirth}
            </td>
           <td
               className="text-gray-700 text-base font-normal py-2 px-4"
                style={{ fontFamily: "Roboto" }}
            >
               {tutor.major}
            </td>
            <td
              className="text-gray-700 text-base font-normal py-2 px-4"
                 style={{ fontFamily: "Roboto" }}
             >
                {tutor.school}
             </td>
              <td
                 className="text-gray-700 text-base font-normal py-2 px-4"
                style={{ fontFamily: "Roboto" }}
                >
                    {tutor.teachingClasses && tutor.teachingClasses.map(teachingClass => (
                          <span key={teachingClass} className="inline-block bg-gray-200 rounded-full px-2 py-1 text-sm font-semibold text-gray-700 mr-2 mb-1">
                            {teachingClass}
                             </span>
                           ))}
               </td>
                 <td
                    className="text-gray-700 text-base font-normal py-2 px-4"
                   style={{ fontFamily: "Roboto" }}
                   >
                    {tutor.hourlyRate}
                </td>
              <td
                  className="text-gray-700 text-base font-normal py-2 px-4"
                 style={{ fontFamily: "Roboto" }}
                  >
                   <button
                       className = "text-blue-500 hover:underline"
                      onClick = { () => handleOpenEditModal(tutor)}
                  >
                      Chỉnh sửa
                   </button>
              </td>
       </tr>
   );
};

export default TutorTableRow;