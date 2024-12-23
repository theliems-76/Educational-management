import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
  Tooltip
} from "@mui/material";
import {
  AddCircleOutline,
  RemoveCircleOutline,
  CheckBoxOutlineBlank,
  CheckBox
} from "@mui/icons-material";
import { styled } from '@mui/material/styles';

const CustomCard = styled(Card)({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  height: '100%',
});
const CustomCardMedia = styled(CardMedia)({
  paddingTop: '56.25%', // 16:9
});
const CustomCardContent = styled(CardContent)({
  flexGrow: 1,
});
const CardTitle = styled(Typography)({
  fontWeight: 'bold',
});
const CardActions = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  marginTop: 'auto',
});
const IconButtonWrapper = styled(IconButton)({
  padding: '4px',
});

function CourseCard({ course, onAdd, onRemove, onCheck, onUncheck, isChecked}) {
  return (
    <CustomCard elevation={2}>
      <CustomCardMedia
        image={course.image} // Thay đổi đường dẫn ảnh
        title={course.title}
      />
      <CustomCardContent>
        <CardTitle gutterBottom variant="h6" component="div">
          {course.title}
        </CardTitle>
        <Typography variant="body2" color="text.secondary">
          {course.teacher}
        </Typography>
      </CustomCardContent>
      <CardActions>
        <Tooltip title={isChecked ? "Remove from course" : "Add to course"} placement="top">
          <IconButtonWrapper onClick={isChecked ? onRemove : onAdd}>
            {isChecked ? <RemoveCircleOutline color="error" /> : <AddCircleOutline color="primary" />}
          </IconButtonWrapper>
        </Tooltip>
        <Tooltip title={isChecked ? "Uncheck" : "Check"} placement="top">
          <IconButtonWrapper onClick={isChecked ? onUncheck : onCheck}>
            {isChecked ? <CheckBox color="primary" /> : <CheckBoxOutlineBlank />}
          </IconButtonWrapper>
        </Tooltip>
      </CardActions>
    </CustomCard>
  );
}

export default CourseCard;