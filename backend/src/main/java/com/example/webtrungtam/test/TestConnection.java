package com.example.webtrungtam.test;

import java.sql.*;

public class TestConnection {
    public static void main(String[] args) {
        String url = "jdbc:sqlserver://localhost:1433;databaseName=Web_trung_tam;encrypt=true;trustServerCertificate=true";
        String username = "sa";
        String password = "123456";

        // Câu lệnh SQL để truy vấn dữ liệu
        String query = "SELECT * FROM Role";

        try {
            // Tải driver JDBC
            Class.forName("com.microsoft.sqlserver.jdbc.SQLServerDriver");
            System.out.println("Đã tải driver thành công!");

            // Kết nối đến SQL Server
            Connection connection = DriverManager.getConnection(url, username, password);
            System.out.println("Kết nối SQL Server thành công!");

            // Tạo và thực thi truy vấn
            Statement statement = connection.createStatement();
            ResultSet resultSet = statement.executeQuery(query);

            // Hiển thị kết quả
            System.out.println("Dữ liệu trong bảng Role:");
            System.out.println("-----------------------------------");

            while (resultSet.next()) {
                long idRole = resultSet.getLong("idRole");
                String name = resultSet.getString("name");
                String permissions = resultSet.getString("permissions");

                System.out.println("ID: " + idRole + ", Name: " + name + ", Permissions: " + permissions);
            }

            // Đóng kết nối
            resultSet.close();
            statement.close();
            connection.close();
            System.out.println("Đã đóng kết nối thành công!");

        } catch (ClassNotFoundException e) {
            System.err.println("Không tìm thấy driver JDBC!");
            e.printStackTrace();
        } catch (SQLException e) {
            System.err.println("Lỗi khi kết nối hoặc truy vấn SQL!");
            e.printStackTrace();
        }

    }
}
