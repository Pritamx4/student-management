
"use client";

import { useActionState } from "react";
import { updateStudent } from "@/app/actions";

const initialState = {
  errors: {},
  message: "",
};

export default function EditStudentForm({ student }) {

  const updateAction = updateStudent.bind(null, student.id);

  const [state, formAction, pending] = useActionState(
    updateAction,
    initialState
  );

  return (
    <form action={formAction} className="space-y-4">

      <div>
        <label>Name</label>
        <input
          name="name"
          defaultValue={student.name}
          className="block border p-2 w-full"
        />
        <p className="text-red-500">
          {state.errors?.name?.[0]}
        </p>
      </div>

      <div>
        <label>Email</label>
        <input
          name="email"
          type="email"
          defaultValue={student.email}
          className="block border p-2 w-full"
        />
        <p className="text-red-500">
          {state.errors?.email?.[0]}
        </p>
      </div>

      <div>
        <label>Course</label>
        <input
          name="course"
          defaultValue={student.course}
          className="block border p-2 w-full"
        />
        <p className="text-red-500">
          {state.errors?.course?.[0]}
        </p>
      </div>

      <div>
        <label>Age</label>
        <input
          name="age"
          type="number"
          defaultValue={student.age}
          className="block border p-2 w-full"
        />
        <p className="text-red-500">
          {state.errors?.age?.[0]}
        </p>
      </div>

      <button
        type="submit"
        disabled={pending}
        className="bg-green-600 text-white px-4 py-2"
      >
        {pending ? "Updating..." : "Update Student"}
      </button>

      <p>{state.message}</p>

    </form>
  );
}