
import StudentForm from "@/components/StudentForm";

export default function NewStudentPage() {
  return (
    <div className="max-w-xl mx-auto p-6">

      <h1 className="text-2xl font-bold mb-6">
        Add New Student
      </h1>

      <StudentForm />

    </div>
  );
}