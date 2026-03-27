// Utiles/ValidationSchema/schema/AddStaffPage.ts
import { z } from "zod";

// Define the schema for individual access levels
// This schema is not directly used in the provided snippet, but kept for context if the 'access' object were to be re-added.
const accessLevelSchema = z.union([
    z.literal('Full Access'),
    z.literal('Assigned Only'),
    z.literal('View Only'),
    z.null(), // Allows null if the checkbox is unchecked
]);

export const addStaffPageValidationSchema = z.object({
    fullName: z
        .string()
        .min(1, "Full Name is required")
        .max(100, "Full Name must be at most 100 characters"),
    email: z
        .string()
        .optional()
        .refine(
            (val) => !val || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val),
            { message: "Enter a valid email address" }
        ),
    phone: z
        .string()
        .optional() // Phone number is optional
        .refine((val) => {
            // If a value is provided, it must match a basic phone number pattern
            if (val) {
                return /^\+?[0-9\s\-()]{7,20}$/.test(val); // Basic phone number regex
            }
            return true; // If no value, it's valid (because it's optional)
        }, "Enter a valid phone number"),
    role: z
        .string()
        .refine(
            (val) => ['Admin', 'Sub Admin', 'Guide'].includes(val),
            "Invalid role selected"
        ),
    status: z
        .string()
        .refine(
            (val) => ['Active', 'In-Active'].includes(val),
            "Invalid status selected"
        ),
    note: z.string().optional(), // Note is optional
    sendCredentials: z.boolean(), // Boolean for the checkbox


});

// Infer the TypeScript type from the schema for type safety
export type AddStaffFormData = z.infer<typeof addStaffPageValidationSchema>;
