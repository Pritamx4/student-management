
"use server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
// 1. Validation schema
const studentSchema = z.object({
  name: z.string().trim().min(2, "Name must contain at least 2 characters"),
  email: z.string().trim().email("Enter a valid email address"),
  course: z.string().trim().min(2, "Course is required"),
  age: z.coerce
    .number()
    .int("Age must be a whole number")
    .min(16, "Age must be at least 16")
    .max(100, "Enter a valid age"),
});

// 2. Check for duplicate email errors
function isDuplicateEmail(error) {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    error.code === "P2002"
  );
}

// 3. CREATE student
export async function createStudent(prevState, formData) {
  const result = studentSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    course: formData.get("course"),
    age: formData.get("age"),
  });

  // Check validation errors
  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
      message: "Please correct the errors.",
    };
  }

  try {
    await prisma.student.create({
      data: result.data,
    });
  } catch (error) {
    if (isDuplicateEmail(error)) {
      return {
        errors: {
          email: ["This email is already registered."],
        },
        message: "Please use another email.",
      };
    }

    throw error;
  }

  revalidatePath("/students");
  redirect("/students");
}

// 4. UPDATE student
export async function updateStudent(id, prevState, formData) {
  const result = studentSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    course: formData.get("course"),
    age: formData.get("age"),
  });

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
      message: "Please correct the errors.",
    };
  }

  try {
    await prisma.student.update({
      where: {
        id: Number(id),
      },
      data: result.data,
    });
  } catch (error) {
    if (isDuplicateEmail(error)) {
      return {
        errors: {
          email: ["This email is already registered."],
        },
        message: "Please use another email.",
      };
    }

    throw error;
  }

  revalidatePath("/students");
  redirect("/students");
}

// 5. DELETE student
export async function deleteStudent(formData) {
  const id = Number(formData.get("id"));

  if (!Number.isInteger(id) || id <= 0) {
    throw new Error("Invalid student ID");
  }

  await prisma.student.delete({
    where: {
      id: id,
    },
  });

  revalidatePath("/students");
}