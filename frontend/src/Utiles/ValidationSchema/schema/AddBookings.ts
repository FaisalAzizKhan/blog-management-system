import { z } from "zod";

// Schema for individual Traveler details
export const TravelerSchema = z.object({
  firstName: z
    .string()
    .min(1, "First Name is required")
    .max(100, "First Name must be at most 100 characters"),
  lastName: z
    .string()
    .min(1, "Last Name is required")
    .max(100, "Last Name must be at most 100 characters"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Enter a valid email address"),
  phoneNumber: z
    .string()
    .min(1, "Phone Number is required")
    .regex(/^\+?[0-9\s\-\(\)]{7,20}$/, "Enter a valid phone number"), // Basic phone number regex
  dateOfBirth: z
    .string() // Assuming date is handled as a string in "YYYY-MM-DD" format from input type="date"
    .min(1, "Date of Birth is required")
    .refine((val) => !isNaN(new Date(val).getTime()), { // Checks if it's a valid date string
      message: "Enter a valid date of birth",
    }),
  countryOfOrigin: z
    .string()
    .min(1, "Country of Origin is required"),
  passportNo: z
    .string()
    .min(1, "Passport Number is required")
    .max(20, "Passport Number must be at most 20 characters"),
});

// Schema for Booking Details
export const BookingDetailsSchema = z.object({
  firstName: z
    .string()
    .min(1, "First Name is required")
    .max(100, "First Name must be at most 100 characters"),
  lastName: z
    .string()
    .min(1, "Last Name is required")
    .max(100, "Last Name must be at most 100 characters"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Enter a valid email address")
    .refine(
            (val) => !val || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val),
            { message: "Enter a valid email address" }),
  phoneNumber: z
    .string()
    .min(1, "Phone Number is required")
    .regex(/^\+?[0-9\s\-\(\)]{7,20}$/, "Enter a valid phone number"), // Basic phone number regex
  dateOfBirth: z
    .string() // Assuming date is handled as a string in "YYYY-MM-DD" format from input type="date"
    .min(1, "Date of Birth is required")
    .refine((val) => !isNaN(new Date(val).getTime()), {
      message: "Enter a valid date of birth",
    }),
  countryOfOrigin: z
    .string()
    .min(1, "Country of Origin is required"),
  safariPlan: z
    .string()
    .min(1, "Safari Plan is required"),
  planType: z
    .string()
    .min(1, "Plan Type is required"),
  tripDates: z
    .string() // Assuming date is handled as a string in "YYYY-MM-DD" format from input type="date"
    .min(1, "Trip Dates are required")
    .refine((val) => !isNaN(new Date(val).getTime()), {
      message: "Enter valid trip dates",
    }),
  numberOfTravelers: z
    .string() // Stored as string from select, convert to number for logic if needed elsewhere
    .min(1, "Number of Travelers is required"),
  passportNo: z
    .string()
    .min(1, "Passport Number is required")
    .max(20, "Passport Number must be at most 20 characters"),
});

// Main schema for the entire Add Booking form
export const AddBookingValidationSchema = z.object({
  bookingDetails: BookingDetailsSchema,
  additionalTravelers: z.array(TravelerSchema).optional(), // Additional travelers are optional
});
export type AddBookingFormData = z.infer<typeof AddBookingValidationSchema>;