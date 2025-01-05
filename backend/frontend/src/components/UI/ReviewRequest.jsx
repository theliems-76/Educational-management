import { Avatar, Card, CardContent, Typography } from "@mui/material";
import React from "react";
import { Rating } from "@mui/lab";

function ReviewRequest({ review }) {
  return (
    <Card elevation={0} sx={{ border: "1px solid #dde1e6", minWidth: 250 }}>
      <CardContent>
        <div className="flex items-center gap-2">
          <Avatar src={review.avatar} alt={review.name} />
          <Typography variant="subtitle1" className="font-bold">
            {review.name}
          </Typography>
          <Rating
            name="read-only"
            value={review.rating}
            readOnly
            size="small"
          />
        </div>
        <Typography variant="body2" color="text.secondary" mt={1}>
          {review.comment}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default ReviewRequest;