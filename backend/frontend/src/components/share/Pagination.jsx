import React from 'react';
const Pagination = ({ currentPage, totalPages, rowsPerPage, handlePageChange, handleRowsPerPageChange, totalStudents }) => {
 return (
   <div className="mt-4 flex justify-between items-center">
        <div className="text-gray-600 text-sm">
         {((currentPage - 1) * rowsPerPage)+1}-{ (currentPage * rowsPerPage > totalStudents ? totalStudents : currentPage * rowsPerPage)} of {totalStudents}
    </div>
     <div className="flex items-center">
        <span className="text-gray-600 text-sm mr-2">Rows per page:</span>
       <select
          className="border border-gray-300 rounded py-1 text-sm mr-4"
             onChange={handleRowsPerPageChange}
            value = {rowsPerPage}
      >
           <option value={10}>10</option>
         <option value={20}>20</option>
          <option value={50}>50</option>
        </select>
        <button
            disabled={currentPage <= 1}
            className="rounded-md border border-gray-300 px-2 text-gray-600"
            onClick={() => handlePageChange(currentPage - 1)}
       >
             
        </button>
           {Array.from({ length: totalPages }, (_, index) => index + 1).map((i) => (
                 <button
                     key={i}
                     onClick={() => handlePageChange(i)}
                    className={`rounded-md px-2 mx-1 border border-gray-300 text-gray-600
                    ${currentPage === i ? "bg-blue-100" : ""}`}
                   >
                    {i}
                   </button>
           ))}
          <button
             disabled={currentPage >= totalPages}
             className="rounded-md border border-gray-300 px-2 text-gray-600"
               onClick={() => handlePageChange(currentPage + 1)}
           >
              
          </button>
        </div>
    </div>
  );
}
export default Pagination;