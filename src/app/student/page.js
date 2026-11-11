
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { deleteStudent } from "@/app/actions";

export default async function StudentsPage() {

  // Fetch all students
  const students = await prisma.student.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="p-8">

      <h1 className="text-3xl font-bold mb-6">
        Student Management System
      </h1>

      <Link
        href="/students/new"
        className="bg-blue-600 text-white px-4 py-2"
      >
        Add Student
      </Link>

      <table className="w-full mt-6 border">

        <thead>
          <tr>
            <th className="border p-2">ID</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Course</th>
            <th className="border p-2">Age</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>

        <tbody>

          {students.map((student) => (

            <tr key={student.id}>

              <td className="border p-2">
                {student.id}
              </td>

              <td className="border p-2">
                {student.name}
              </td>

              <td className="border p-2">
                {student.email}
              </td>

              <td className="border p-2">
                {student.course}
              </td>

              <td className="border p-2">
                {student.age}
              </td>

              <td className="border p-2">

                <Link
                  href={`/students/${student.id}/edit`}
                  className="text-blue-600 mr-4"
                >
                  Edit
                </Link>

                <form action={deleteStudent} className="inline">
                  <input
                    type="hidden"
                    name="id"
                    value={student.id}
                  />

                  <button
                    type="submit"
                    className="text-red-600"
                  >
                    Delete
                  </button>
                </form>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

      {students.length === 0 && (
        <p className="mt-4">
          No students found. Add your first student!
        </p>
      )}

    </div>
  );
}