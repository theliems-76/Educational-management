import React from 'react';
import { Container, Typography, Grid, Card, CardContent, Button, Box } from '@mui/material';

function CourseIntroPage() {
  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      {/* Hero Section */}
      <Box className="bg-blue-500 text-white text-center py-16 px-4 rounded-lg mb-8">
        <Typography variant="h2" component="h1" gutterBottom className="font-bold">
          Khám phá các khóa học tuyệt vời của chúng tôi
        </Typography>
        <Typography variant="h5" component="p">
          Nâng cao kỹ năng của bạn với các khóa học chất lượng cao từ các chuyên gia hàng đầu.
        </Typography>
      </Box>

      {/* Giới thiệu trung tâm */}
      <Box mb={8}>
        <Typography variant="h3" component="h2" gutterBottom className="font-semibold">
          Về chúng tôi
        </Typography>
        <Typography variant="body1">
          {/* Thay đổi nội dung giới thiệu trung tâm ở đây */}
          Chúng tôi là trung tâm đào tạo hàng đầu với đội ngũ giảng viên giàu kinh nghiệm, chương trình học tiên tiến, và môi trường học tập năng động.
          Chúng tôi cam kết mang đến cho học viên những kiến thức và kỹ năng cần thiết để thành công trong tương lai.
        </Typography>
      </Box>

      {/* Danh sách khóa học */}
      <Grid container spacing={4} mb={8}>
        {/* Khóa học 1 */}
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h4" component="h3" gutterBottom className="font-medium">
                {/* Thay đổi tên khóa học */}
                Lập trình Web Front-end
              </Typography>
              <Typography variant="body2" color="text.secondary" mb={2}>
                {/* Thay đổi mô tả khóa học */}
                Học HTML, CSS, JavaScript, React để xây dựng giao diện web hiện đại.
              </Typography>
              <Button variant="contained" color="primary">
                Xem chi tiết
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Khóa học 2 */}
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h4" component="h3" gutterBottom className="font-medium">
                {/* Thay đổi tên khóa học */}
                Lập trình Python
              </Typography>
              <Typography variant="body2" color="text.secondary" mb={2}>
                {/* Thay đổi mô tả khóa học */}
                Khóa học Python cơ bản đến nâng cao, ứng dụng trong khoa học dữ liệu, machine learning.
              </Typography>
              <Button variant="contained" color="primary">
                Xem chi tiết
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Khóa học 3 */}
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h4" component="h3" gutterBottom className="font-medium">
                {/* Thay đổi tên khóa học */}
                Thiết kế đồ họa
              </Typography>
              <Typography variant="body2" color="text.secondary" mb={2}>
                {/* Thay đổi mô tả khóa học */}
                Học Photoshop, Illustrator, thiết kế logo, banner, ấn phẩm truyền thông.
              </Typography>
              <Button variant="contained" color="primary">
                Xem chi tiết
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Bạn có thể thêm các khóa học khác tương tự */}
      </Grid>

      {/* Lợi ích khi tham gia khóa học */}
      <Box mb={8}>
        <Typography variant="h3" component="h2" gutterBottom className="font-semibold">
          Tại sao chọn chúng tôi?
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <Typography variant="body1" className="font-medium">
              <span className="text-blue-500">✓</span> Giảng viên chuyên nghiệp
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="body1" className="font-medium">
              <span className="text-blue-500">✓</span> Chương trình học cập nhật
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="body1" className="font-medium">
              <span className="text-blue-500">✓</span> Thực hành thực tế
            </Typography>
          </Grid>
          {/* Thêm các lợi ích khác */}
        </Grid>
      </Box>

      {/* CTA (Call To Action) */}
      <Box className="bg-gray-100 text-center py-8 px-4 rounded-lg">
        <Typography variant="h4" component="h2" gutterBottom>
          Sẵn sàng tham gia cùng chúng tôi?
        </Typography>
        <Button variant="contained" color="primary" size="large">
          Đăng ký ngay
        </Button>
      </Box>
    </Container>
  );
}

export default CourseIntroPage;