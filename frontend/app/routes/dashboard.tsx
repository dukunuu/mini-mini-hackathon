import { useState, useEffect } from 'react';
import { FiPlus, FiCheck, FiClock, FiAlertTriangle, FiBook, FiCalendar, FiAward } from 'react-icons/fi';
import { ProtectedRoute } from '~/components/auth/ProtectedRoute';

// Монгол хэл рүү орчуулсан meta тагууд
export function meta({}) {
  return [
    { title: "CourseTrack - Хичээлүүдээсээ хоцрохгүй байх" }, // Original: CourseTrack - Stay on track with your courses
    { name: "description", content: "Хичээлийн явц, хугацаагаа нэг дороос хянах" }, // Original: Track your course progress and deadlines in one place
  ];
}

export default function Dashboard() {
  const [courses, setCourses] = useState([
    // Үлгэр жишээ өгөгдөл (Монгол нэр ашиглаж болно)
    {
      id: 1,
      name: 'Математик 101', // Original: Math 101
      totalPoints: 100,
      earnedPoints: 35,
      tasks: [
        { id: 1, title: 'Дунд шалгалт', dueDate: '2023-11-15T09:00', points: 20, status: 'done' }, // Original: Midterm Exam
        { id: 2, title: 'Бүлэг 5-ын гэрийн даалгавар', dueDate: '2023-11-20T23:59', points: 15, status: 'in-progress' }, // Original: Chapter 5 Homework
      ]
    },
    {
      id: 2,
      name: 'Англи хэл 102', // Original: English 102
      totalPoints: 120,
      earnedPoints: 45,
      tasks: [
        { id: 3, title: 'Судалгааны ажил', dueDate: '2023-11-18T23:59', points: 30, status: 'in-progress' }, // Original: Research Paper
        { id: 4, title: 'Яруу найргийн дүн шинжилгээ', dueDate: '2023-11-25T23:59', points: 20, status: 'in-progress' }, // Original: Poetry Analysis
      ]
    }
  ]);

  const [showAddTaskModal, setShowAddTaskModal] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    dueDate: '',
    points: '',
    courseId: ''
  });
  const [showAddCourseForm, setShowAddCourseForm] = useState(false);
  const [newCourse, setNewCourse] = useState({
    name: '',
    totalPoints: ''
  });
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [upcomingTasks, setUpcomingTasks] = useState([]);

  useEffect(() => {
    const savedCourses = localStorage.getItem('courses');
    if (savedCourses) {
      try {
        const parsedCourses = JSON.parse(savedCourses);
        setCourses(parsedCourses);
      } catch (e) {
        console.error('Хадгалсан хичээлийг уншиж чадсангүй', e); // Original: Failed to parse saved courses
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('courses', JSON.stringify(courses));

    const allTasks = courses.flatMap(course =>
      course.tasks.map(task => ({
        ...task,
        courseName: course.name,
        courseId: course.id
      }))
    );

    const now = new Date();
    const nextWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

    const upcoming = allTasks
      .filter(task => new Date(task.dueDate) > now && new Date(task.dueDate) <= nextWeek)
      .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));

    setUpcomingTasks(upcoming);
  }, [courses]);

  const handleAddTask = () => {
    if (!newTask.title || !newTask.dueDate || !newTask.points || !newTask.courseId) return;

    const updatedCourses = courses.map(course => {
      if (course.id === parseInt(newTask.courseId)) {
        return {
          ...course,
          tasks: [
            ...course.tasks,
            {
              id: Date.now(),
              title: newTask.title,
              dueDate: newTask.dueDate,
              points: parseInt(newTask.points),
              status: 'in-progress'
            }
          ]
        };
      }
      return course;
    });

    setCourses(updatedCourses);
    setNewTask({ title: '', dueDate: '', points: '', courseId: '' });
    setShowAddTaskModal(false);
  };

  const handleAddCourse = () => {
    if (!newCourse.name || !newCourse.totalPoints) return;

    const newCourseObj = {
      id: Date.now(),
      name: newCourse.name,
      totalPoints: parseInt(newCourse.totalPoints),
      earnedPoints: 0,
      tasks: []
    };

    setCourses([...courses, newCourseObj]);
    setNewCourse({ name: '', totalPoints: '' });
    setShowAddCourseForm(false);
  };

  const toggleTaskStatus = (courseId, taskId) => {
    const updatedCourses = courses.map(course => {
      if (course.id === courseId) {
        const updatedTasks = course.tasks.map(task => {
          if (task.id === taskId) {
            const newStatus = task.status === 'done' ? 'in-progress' : 'done';
            return {
              ...task,
              status: newStatus
            };
          }
          return task;
        });

        const earnedPoints = updatedTasks
          .filter(task => task.status === 'done')
          .reduce((sum, task) => sum + task.points, 0);

        return {
          ...course,
          tasks: updatedTasks,
          earnedPoints
        };
      }
      return course;
    });

    setCourses(updatedCourses);
  };

  const formatDate = (dateString) => {
    const options = {
      year: 'numeric', // Он нэмэх
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false // 24 цагийн формат ашиглах (эсвэл true болгож AM/PM)
    };
    // 'mn-MN' locale ашиглаж Монгол огнооны формат руу хөрвүүлэх оролдлого
    try {
      return new Date(dateString).toLocaleDateString('mn-MN', options) + ' ' + new Date(dateString).toLocaleTimeString('mn-MN', { hour: '2-digit', minute: '2-digit', hour12: false });
    } catch (e) {
      // Хэрэв 'mn-MN' дэмжигдэхгүй бол АНУ-ын форматыг ашиглана
      options.hour12 = true; // Fallback to US style if MN locale fails
      return new Date(dateString).toLocaleDateString('en-US', options);
    }
  };

  const calculateProgress = (earned, total) => {
    if (total === 0) return 0; // 0-д хуваахаас сэргийлэх
    return Math.min(Math.round((earned / total) * 100), 100);
  };

  return (
    <ProtectedRoute>
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      {/* Толгой хэсэг */}
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-indigo-700 flex items-center">
          <FiBook className="mr-2" /> Alchemist
        </h1>
        <p className="text-gray-600">Хичээл, хугацаа, ахиц дэвшил — бүгдийг нэг дор</p> {/* Original: Stay on track. One course at a time. */}
      </header>

      {/* Үндсэн агуулга */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Зүүн багана - Хяналтын самбар */}
        <div className="lg:col-span-2 space-y-6">
          {/* Хичээлүүдийн тойм */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Таны хичээлүүд</h2> {/* Original: Your Courses */}
              <button
                onClick={() => setShowAddCourseForm(true)}
                className="flex items-center bg-indigo-600 text-white px-3 py-2 rounded-lg text-sm hover:bg-indigo-700 transition"
              >
                <FiPlus className="mr-1" /> Хичээл нэмэх {/* Original: Add Course */}
              </button>
            </div>

            {courses.length === 0 ? (
              <p className="text-gray-500 text-center py-4">Хичээл хараахан нэмэгдээгүй байна.</p> // Original: No courses added yet.
            ) : (
              <div className="space-y-4">
                {courses.map(course => (
                  <div
                    key={course.id}
                    className="border rounded-lg p-4 hover:shadow-md transition cursor-pointer"
                    onClick={() => setSelectedCourse(course)}
                  >
                    <div className="flex justify-between items-start">
                      <h3 className="font-medium text-lg">{course.name}</h3>
                      <span className="text-sm bg-indigo-100 text-indigo-800 px-2 py-1 rounded">
                        {course.earnedPoints}/{course.totalPoints} оноо {/* Original: pts */}
                      </span>
                    </div>
                    <div className="mt-2">
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div
                          className="bg-indigo-600 h-2.5 rounded-full"
                          style={{ width: `${calculateProgress(course.earnedPoints, course.totalPoints)}%` }}
                        ></div>
                      </div>
                      <p className="text-right text-xs text-gray-500 mt-1">
                        {calculateProgress(course.earnedPoints, course.totalPoints)}% биелсэн {/* Original: % complete */}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Удахгүй болох даалгаврууд */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Удахгүй болох даалгаврууд</h2> {/* Original: Upcoming Tasks */}
            {upcomingTasks.length === 0 ? (
              <p className="text-gray-500 text-center py-4">Ирэх 7 хоногт хийх даалгавар байхгүй байна.</p> // Original: No upcoming tasks in the next 7 days.
            ) : (
              <div className="space-y-3">
                {upcomingTasks.map(task => (
                  <div key={task.id} className="border rounded-lg p-3 flex justify-between items-center">
                    <div>
                      <h4 className="font-medium">{task.title}</h4>
                      <p className="text-sm text-gray-600">{task.courseName}</p>
                      <div className="flex items-center text-sm text-gray-500 mt-1">
                        <FiClock className="mr-1" />
                        <span>{formatDate(task.dueDate)}</span>
                        <span className="mx-2">•</span>
                        <FiAward className="mr-1" />
                        <span>{task.points} оноо</span> {/* Original: pts */}
                      </div>
                    </div>
                    {/* Task status toggle button doesn't have text, just icon */}
                    <button
                      onClick={() => toggleTaskStatus(task.courseId, task.id)}
                      className={`p-2 rounded-full ${task.status === 'done' ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'}`}
                    >
                      <FiCheck />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Баруун багана - Хичээлийн дэлгэрэнгүй эсвэл Хичээл нэмэх */}
        <div className="bg-white rounded-lg shadow p-6">
          {selectedCourse ? (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800">{selectedCourse.name}</h2>
                <button
                  onClick={() => setSelectedCourse(null)}
                  className="text-gray-500 hover:text-gray-700 text-sm" // Made text smaller to fit potentially longer translation
                >
                  Бүх хичээл рүү буцах {/* Original: Back to all courses */}
                </button>
              </div>

              <div className="mb-6">
                <div className="flex justify-between text-sm mb-1">
                  <span>Явц: {selectedCourse.earnedPoints}/{selectedCourse.totalPoints} оноо</span> {/* Original: Progress:, points */}
                  <span>{calculateProgress(selectedCourse.earnedPoints, selectedCourse.totalPoints)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-indigo-600 h-2.5 rounded-full"
                    style={{ width: `${calculateProgress(selectedCourse.earnedPoints, selectedCourse.totalPoints)}%` }}
                  ></div>
                </div>
              </div>

              <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium text-gray-700">Даалгаврууд</h3> {/* Original: Tasks */}
                <button
                  onClick={() => {
                    setNewTask(prev => ({ ...prev, courseId: selectedCourse.id.toString() }));
                    setShowAddTaskModal(true);
                  }}
                  className="flex items-center bg-indigo-600 text-white px-3 py-1 rounded-lg text-sm hover:bg-indigo-700 transition"
                >
                  <FiPlus className="mr-1" /> Даалгавар нэмэх {/* Original: Add Task */}
                </button>
              </div>

              {selectedCourse.tasks.length === 0 ? (
                <p className="text-gray-500 text-center py-4">Даалгавар хараахан нэмэгдээгүй байна.</p> // Original: No tasks added yet.
              ) : (
                <div className="space-y-3">
                  {selectedCourse.tasks.map(task => (
                    <div key={task.id} className="border rounded-lg p-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">{task.title}</h4>
                          <div className="flex items-center text-sm text-gray-500 mt-1">
                            <FiClock className="mr-1" />
                            <span>{formatDate(task.dueDate)}</span>
                            <span className="mx-2">•</span>
                            <FiAward className="mr-1" />
                            <span>{task.points} оноо</span> {/* Original: pts */}
                          </div>
                        </div>
                        <div className="flex items-center">
                          {new Date(task.dueDate) < new Date() && task.status !== 'done' && (
                            <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded mr-2 flex items-center">
                              <FiAlertTriangle className="mr-1" /> Хугацаа хэтэрсэн {/* Original: Overdue */}
                            </span>
                          )}
                          <button
                            onClick={() => toggleTaskStatus(selectedCourse.id, task.id)}
                            className={`p-2 rounded-full ${task.status === 'done' ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'}`}
                          >
                            <FiCheck />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : showAddCourseForm ? (
            // Шинэ хичээл нэмэх хэсэг
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Шинэ хичээл нэмэх</h2> {/* Original: Add New Course */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Хичээлийн нэр</label> {/* Original: Course Name */}
                  <input
                    type="text"
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="ж.нь, Математик 101" // Original: e.g., Math 101
                    value={newCourse.name}
                    onChange={(e) => setNewCourse({ ...newCourse, name: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Нийт авах оноо</label> {/* Original: Total Points Needed */}
                  <input
                    type="number"
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="ж.нь, 100" // Original: e.g., 100
                    value={newCourse.totalPoints}
                    onChange={(e) => setNewCourse({ ...newCourse, totalPoints: e.target.value })}
                  />
                </div>
                <div className="flex space-x-3 pt-2">
                  <button
                    onClick={handleAddCourse}
                    className="flex-1 bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
                  >
                    Хичээл нэмэх {/* Original: Add Course */}
                  </button>
                  <button
                    onClick={() => setShowAddCourseForm(false)}
                    className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300 transition"
                  >
                    Цуцлах {/* Original: Cancel */}
                  </button>
                </div>
              </div>
            </div>
          ) : (
             // Хичээл сонгоогүй үеийн дэлгэц
            <div className="text-center py-8">
              <FiBook className="mx-auto text-4xl text-gray-300 mb-3" />
              <h3 className="text-lg font-medium text-gray-700">Хичээл сонгоно уу</h3> {/* Original: Select a course */}
              <p className="text-gray-500 mt-1">Жагсаалтаас хичээл сонгож дэлгэрэнгүй мэдээлэл болон даалгаврыг харна уу.</p> {/* Original: Choose a course from the list to view details and tasks */}
              <button
                onClick={() => setShowAddCourseForm(true)}
                className="mt-4 flex items-center mx-auto bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
              >
                <FiPlus className="mr-1" /> Шинэ хичээл нэмэх {/* Original: Add New Course */}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Даалгавар нэмэх цонх (Modal) */}
      {showAddTaskModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Шинэ даалгавар нэмэх</h2> {/* Original: Add New Task */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Даалгаврын гарчиг</label> {/* Original: Task Title */}
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="ж.нь, Дунд шалгалт" // Original: e.g., Midterm Exam
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Дуусах огноо ба цаг</label> {/* Original: Due Date & Time */}
                <input
                  type="datetime-local"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={newTask.dueDate}
                  onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Оноо</label> {/* Original: Points Value */}
                <input
                  type="number"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="ж.нь, 20" // Original: e.g., 20
                  value={newTask.points}
                  onChange={(e) => setNewTask({ ...newTask, points: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Хичээл</label> {/* Original: Course */}
                <select
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={newTask.courseId}
                  onChange={(e) => setNewTask({ ...newTask, courseId: e.target.value })}
                >
                  <option value="">Хичээл сонгоно уу</option> {/* Original: Select a course */}
                  {courses.map(course => (
                    <option key={course.id} value={course.id}>{course.name}</option>
                  ))}
                </select>
              </div>
              <div className="flex space-x-3 pt-2">
                <button
                  onClick={handleAddTask}
                  className="flex-1 bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
                >
                  Даалгавар нэмэх {/* Original: Add Task */}
                </button>
                <button
                  onClick={() => setShowAddTaskModal(false)}
                  className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300 transition"
                >
                  Цуцлах {/* Original: Cancel */}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
    </ProtectedRoute>
  );
}