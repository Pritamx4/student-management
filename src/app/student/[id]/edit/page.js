
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import EditStudentForm from "@/components/EditStudentForm";

export default async function EditStudentPage({ params }) {

  const { id } = await params;

  const student = await prisma.student.findUnique({
    where: {
      id: Number(id),
    },
  });

  if (!student) {
    notFound();
  }

  return (
    <div className="max-w-xl mx-auto p-6">

      <h1 className="text-2xl font-bold mb-6">
        Edit Student
      </h1>

      <EditStudentForm student={student} />

    </div>
  );
}