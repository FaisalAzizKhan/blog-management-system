import { z } from "zod";

// Define the Zod schema for the AddNewTaskPage form
export const addNewTaskValidationSchema = z.object({
  taskName: z.string().min(1, "Task Name is required"),
  assignedTo: z.string().optional(),
  related_booking: z.string().optional(),
  //  due_date: z.string().datetime("Invalid date format").optional(),
//   dueDate: z.string().optional(), // Keeping as string as per your component's state
  taskDescription: z.string().optional(),
});

// Infer the TypeScript type from the schema
export type AddNewTaskFormData = z.infer<typeof addNewTaskValidationSchema>;

