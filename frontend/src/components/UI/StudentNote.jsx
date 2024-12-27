import React from "react";
import {
  Avatar,
  Typography,
  Button,
  IconButton,
  Box,
  styled,
  Chip,
  Tooltip,
  Switch
} from "@mui/material";
import {
  MoreVert as MoreVertIcon,
  AddCircleOutline,
  RemoveCircleOutline,
    CheckBoxOutlineBlank,
    CheckBox,
} from "@mui/icons-material";

const StyledButton = styled(Button)({
    fontFamily: 'Poppins',
    textTransform: 'capitalize',
  });
function StudentNote({ student, onAdd, onRemove, onCheck, onUncheck, isChecked}) {
    const [isAdded, setIsAdded] = React.useState(false);
    const handleAdd = () => {
        setIsAdded(!isAdded);
        onAdd(student.id)
    };
    const handleRemove = () => {
        setIsAdded(!isAdded);
        onRemove(student.id)
    };

    const handleCheck = () => {
      setIsChecked(!isChecked);
      onCheck(student.id)
    };
    const handleUncheck = () => {
        setIsChecked(!isChecked);
        onUncheck(student.id)
      };
    // Lấy chữ cái đầu của tên
    const initials = student.name
      ? student.name
          .split(' ')
          .map((word) => word[0].toUpperCase())
          .join('')
          .substring(0, 2)
      : '';

  return (
    <div className="w-[291.20px]  rounded-lg border border-[#dde1e6] flex-col justify-start items-start inline-flex overflow-hidden relative">
      <div className="self-stretch px-3 py-4 bg-white border-b border-[#dde1e6] justify-start items-center gap-2 inline-flex">
        <div className="w-16 h-16 justify-center items-center flex">
          <Avatar
            src={student.avatar}
            alt={student.name}
            sx={{ width: 64, height: 64, bgcolor: "#ddd" }}
          >
            {initials}
          </Avatar>
        </div>
        <div className="flex-col justify-center items-start gap-1 inline-flex">
          <Typography
            className="text-[#001d6c] text-base font-semibold leading-none"
          >
            {student.name}
          </Typography>
          <Typography className="text-center text-[#a0aec0] text-xs font-normal font-['Poppins']">
            {student.course}
          </Typography>
          <div className="justify-center items-center gap-1 inline-flex">
            <Typography className="text-[#001d6c] text-[10px] font-normal font-['Poppins']">
              {student.time}
            </Typography>
          </div>
        </div>
        {/* Position absolute cho phần Active */}
        <div className="absolute top-4 right-4 flex items-center gap-2.5">
          <div className="w-8 h-4 p-0.5 bg-[#a6c8ff] rounded-[33px] flex-col justify-center items-end inline-flex">
            <div className="w-3 h-3 bg-white rounded-full" />
          </div>
          <Typography className="text-[#21272a] text-xs font-normal font-['Poppins']">
            Active
          </Typography>
        </div>
      </div>
     <div className="self-stretch px-3 py-4 bg-white flex-col justify-center items-center flex font-normal font-font">  {/* Thay đổi items-start thành items-center */}
        <div className="justify-center items-start gap-1 inline-flex">
          <StyledButton
            variant="contained"
            color="primary"
            size="small"
            className="text-[#001d6c]"
            sx={{
              backgroundColor: "#a6c8ff",
              color: "#001d6c",
              fontFamily: 'Roboto', // Thêm font chữ Roboto
              fontWeight: 'bold',
            }}
            
          >
            Quản lý lịch học
          </StyledButton>
        </div>
      </div>
    </div>
  );
}

export default StudentNote;