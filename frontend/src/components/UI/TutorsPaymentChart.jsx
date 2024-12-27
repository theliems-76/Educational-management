import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: '17 Sun', tutor: 2000, student: 1800, amt: 2400 },
  { name: '18 Mon', tutor: 3000, student: 1398, amt: 2210 },
  { name: '19 Tue', tutor: 1800, student: 3800, amt: 2290 },
  { name: '20 Wed', tutor: 2780, student: 3908, amt: 2000 },
  { name: '21 Thu', tutor: 1890, student: 4800, amt: 2181 },
  { name: '22 Fri', tutor: 2390, student: 3800, amt: 2500 },
  { name: '23 Sat', tutor: 3490, student: 4300, amt: 2100 },
];

function TutorsPaymentChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="student" fill="#8884d8" />
        <Bar dataKey="tutor" fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default TutorsPaymentChart;