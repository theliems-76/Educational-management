package com.example.webtrungtam.util;

public class IdGenerator {

    /**
     * Sinh ID theo định dạng: YYKKSSSS
     * @param yearPrefix Hai chữ số cuối của năm, ví dụ: "24" cho năm 2024
     * @param classPrefix Khối lớp, hai chữ số, ví dụ: "10"
     * @param sequenceNumber Số thứ tự, bốn chữ số, ví dụ: 0001
     * @return ID sinh ra, ví dụ: "24100001"
     */

    public static String generateId(String yearPrefix, String classPrefix, int sequenceNumber) {
        return String.format("%s%s%04d", yearPrefix, classPrefix, sequenceNumber);
    }
}
