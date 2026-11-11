
"use client";

import { useActionState } from "react";
import { createStudent } from "@/app/actions";

const initialState = {
  errors: {},
  message: "",
};

export default function StudentForm() {
  const [state, formAction, pending] = useActionState(
    createStudent,
    initialState
  );

  return (
    <form action={formAction} className="space-y-4">

      <div>
        <label>Name</label>
        <input
          type="text"
          name="name"
          required
          className="block border p-2 w-full"
        />
        <p className="text-red-500">
          {state.errors?.name?.[0]}
        </p>
      </div>

      <div>
        <label>Email</label>
        <input
          type="email"
          name="email"
          required
          className="block border p-2 w-full"
        />
        <p className="text-red-500">
          {state.errors?.email?.[0]}
        </p>
      </div>

      <div>
        <label>Course</label>
        <input
          type="text"
          name="course"
          required
          className="block border p-2 w-full"
        />
        <p className="text-red-500">
          {state.errors?.course?.[0]}
        </p>
      </div>

      <div>
        <label>Age</label>
        <input
          type="number"
          name="age"
          required
          className="block border p-2 w-full"
        />
        <p className="text-red-500">
          {state.errors?.age?.[0]}
        </p>
      </div>

      <button
        type="submit"
        disabled={pending}
        className="bg-blue-600 text-white px-4 py-2"
      >
        {pending ? "Saving..." : "Add Student"}
      </button>

      <p>{state.message}</p>

    </form>
  );
}