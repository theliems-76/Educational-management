import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import { FileText, Download, Calendar as CalendarIcon } from "lucide-react";
import ClassList from "./StudentClass";

const StudentProfile = () => {
  const statistics = [
    { label: "Attendance", value: 90, color: "bg-blue-500" },
    { label: "Tasks & Exams", value: 70, color: "bg-green-500" },
    { label: "Quiz", value: 85, color: "bg-orange-500" },
  ];

  const todos = [
    { task: "Deploy with Firebase", date: "Tuesday, 25 June 2021" },
    { task: "Push on Github", date: "Monday, 26 June 2021" },
    { task: "Design Registration homepage", date: "Sunday, 27 June 2021" },
  ];

  const downloads = [
    { name: "React-JS-for-beginner.pdf", size: "4.5 MB", type: "pdf" },
    { name: "Database-MySQL.xls", size: "25.7 MB", type: "excel" },
    { name: "Summary-of-php.docx", size: "352 KB", type: "word" },
  ];

  const taskProgress = [
    { subject: "Web Programming", progress: "5/10" },
    { subject: "Data and Structures", progress: "4/10" },
    { subject: "Artificial Intelligence", progress: "2/10" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {/* Statistics Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Statistics</CardTitle>
          <div className="text-sm text-gray-500">January - June 2021</div>
        </CardHeader>
        <CardContent>
          <div className="relative pt-4">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
              <div className="text-2xl font-bold">75%</div>
              <div className="text-sm text-gray-500">completed</div>
            </div>
            <svg className="w-32 h-32 mx-auto" viewBox="0 0 36 36">
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#eee"
                strokeWidth="3"
              />
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#10b981"
                strokeWidth="3"
                strokeDasharray="75, 100"
              />
            </svg>
          </div>
          <div className="space-y-4 mt-4">
            {statistics.map((stat, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${stat.color}`} />
                <div className="flex-1">
                  <div className="text-sm">{stat.label}</div>
                  <Progress value={stat.value} className="h-1 mt-1" />
                </div>
                <div className="text-sm font-medium">{stat.value}%</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* To Do List Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">To do List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {todos.map((todo, index) => (
              <div key={index} className="flex items-start gap-3">
                <Checkbox id={`todo-${index}`} />
                <div className="space-y-1">
                  <label
                    htmlFor={`todo-${index}`}
                    className="text-sm font-medium"
                  >
                    {todo.task}
                  </label>
                  <div className="text-xs text-gray-500">{todo.date}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Downloads Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Your Downloads</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {downloads.map((file, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="p-2 bg-gray-100 rounded">
                  <FileText className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium">{file.name}</div>
                  <div className="text-xs text-gray-500">{file.size}</div>
                </div>
                <button className="text-blue-500 text-sm">
                  <Download className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Task Progress Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Task Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {taskProgress.map((task, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="text-sm">{task.subject}</div>
                <div className="text-sm text-gray-500">{task.progress}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Class Card */}
      <Card className="col-span-1 md:col-span-2">
        <ClassList />
      </Card>
    </div>
  );
};

export default StudentProfile;
