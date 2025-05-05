# Website Quản lý Trung tâm Dạy học (Learning Center Management Website)

[![Language: Java](https://img.shields.io/badge/Language-Java-orange.svg)](https://www.java.com)
[![Framework: Spring Boot](https://img.shields.io/badge/Framework-Spring%20Boot-brightgreen.svg)](https://spring.io/projects/spring-boot)
[![Language: React](https://img.shields.io/badge/Language-React-blue.svg)](https://reactjs.org/)
[![Database: SQL Server](https://img.shields.io/badge/Database-SQL%20Server-red.svg)](https://www.microsoft.com/en-us/sql-server)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT) <!-- Adjust license if needed -->

## Giới thiệu

Đây là đồ án cuối kỳ môn học **Phát triển Phần mềm Hướng đối tượng** tại **Khoa Toán - Tin học, Trường Đại học Khoa học Tự nhiên, ĐHQG-HCM**. Dự án xây dựng một website quản lý toàn diện cho các trung tâm dạy học quy mô vừa và nhỏ.

## Vấn đề và Giải pháp

Nhiều trung tâm dạy học hiện tại quản lý thủ công hoặc sử dụng các công cụ đơn giản, gây khó khăn trong việc lưu trữ, tra cứu thông tin và vận hành. Các hệ thống LMS lớn (như Moodle) thường phức tạp và không hoàn toàn phù hợp với nhu cầu đặc thù.

Dự án này cung cấp một giải pháp web tập trung, dễ sử dụng, bao gồm các chức năng quản lý học viên, giảng viên, lớp học, lịch trình, và thanh toán, giúp hiện đại hóa quy trình và nâng cao hiệu quả quản lý.

## Tính năng chính

Hệ thống phân chia chức năng theo vai trò người dùng:

**Admin:**

*   Quản lý tài khoản người dùng (Giảng viên, Học viên): Thêm, sửa, xóa.
*   Quản lý lớp học: Tạo lớp, phân công giảng viên, theo dõi sĩ số.
*   Quản lý môn học.
*   Theo dõi và cập nhật trạng thái thanh toán học phí.
*   Gửi thông báo chung đến toàn hệ thống.
*   Quản lý thu chi (nếu có).

**Giảng viên (Teacher):**

*   Quản lý danh sách học viên trong lớp mình dạy.
*   Gửi bài tập, tài liệu học tập.
*   Theo dõi điểm danh và đánh giá kết quả học tập.
*   Gửi thông báo, giao tiếp với học viên qua tin nhắn.

**Học viên (Student):**

*   Xem thông tin cá nhân, khóa học đã đăng ký.
*   Xem lịch học, thông báo, bài tập.
*   Nộp bài tập và xem kết quả.
*   Theo dõi trạng thái thanh toán và lịch sử học tập.
*   Đăng ký lớp học mới (nếu có).
*   Giao tiếp qua tin nhắn.

**Tính năng chung:**

*   Đăng nhập/Đăng xuất an toàn.
*   Giao diện thân thiện, dễ sử dụng.
*   Hỗ trợ xem trên nhiều thiết bị.
*   (Có thể) Chat real-time (sử dụng WebSockets).

## Công nghệ sử dụng

*   **Frontend:** HTML, CSS, JavaScript, ReactJS
*   **Backend:** Java, Spring Boot
*   **Database:** Microsoft SQL Server
*   **API Development & Testing:** Postman, Swagger UI
*   **Authentication:** JWT (JSON Web Token)
*   **Principles:** Object-Oriented Programming (OOP), MVC Pattern

## Hình ảnh giao diện (Screenshots)

*(Bạn nên thêm một vài ảnh chụp màn hình các giao diện chính vào đây hoặc tạo một thư mục `screenshots`)*

Ví dụ:
![Trang Đăng nhập](path/to/login-screenshot.png)
![Trang Profile Học viên](path/to/student-profile-screenshot.png)
![Trang Quản lý Lớp học (Admin)](path/to/admin-class-management-screenshot.png)

## Cài đặt và Chạy dự án

**Yêu cầu:**

*   JDK 11 hoặc 17
*   Maven hoặc Gradle (Tùy thuộc vào công cụ build bạn dùng)
*   Node.js và npm/yarn
*   Microsoft SQL Server

**Các bước cài đặt:**

1.  **Clone repository:**
    ```bash
    git clone https://github.com/theliems-76/Educational-management
    cd Educational-management
    ```

2.  **Cấu hình Backend (Thư mục backend):**
    *   Mở project backend bằng IDE (IntelliJ IDEA, Eclipse,...).
    *   **Database Setup:**
        *   Tạo một database mới trong SQL Server (ví dụ: `db_learning_center`).
        *   Cập nhật thông tin kết nối database (URL, username, password) trong file `application.properties` (hoặc `application.yml`) tại thư mục `src/main/resources`.
    *   **Build Project:**
        *   Nếu dùng Maven: `mvn clean install`
        *   Nếu dùng Gradle: `gradlew clean build`
    *   **Chạy Backend:** Chạy file Application chính (thường có annotation `@SpringBootApplication`). Server backend mặc định thường chạy ở cổng `8080`.

3.  **Cấu hình Frontend (Thư mục frontend):**
    *   Di chuyển vào thư mục frontend: `cd ../frontend` 
    *   **Cài đặt Dependencies:**
        ```bash
        npm install
        # hoặc
        # yarn install
        ```
    *   **(Quan trọng)** Cấu hình địa chỉ API Backend: Tìm file cấu hình (thường là `.env` hoặc một file config trong `src`) và đảm bảo địa chỉ API trỏ đúng đến backend đang chạy (ví dụ: `REACT_APP_API_URL=http://localhost:8080/api`).
    *   **Chạy Frontend:**
        ```bash
        npm start
        # hoặc
        # yarn start
        ```
    *   Ứng dụng frontend thường chạy ở cổng `3000`. Mở trình duyệt và truy cập `http://localhost:3000`.

## Thành viên nhóm (Nhóm 3)

*   Vũ Trần Thanh Hương - 22110072
*   Nguyễn Văn Duy Tâm - 22110194
*   Nguyễn Thiện Thanh - 22110204
*   Võ Xuân Thiện - 22110210
## Tài liệu Dự án

Để xem chi tiết về phân tích yêu cầu và thiết kế hệ thống, vui lòng tham khảo báo cáo đầy đủ dưới dạng PDF:

*   [Báo cáo Đồ án Cuối kỳ - Website Quản lý Trung tâm Dạy học](./report (1).pdf)
