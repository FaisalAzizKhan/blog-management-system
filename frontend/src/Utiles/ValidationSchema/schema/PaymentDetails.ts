import { z } from "zod";

// Schema for individual Traveler details
export const PaymentDetailsValidationSchema = z.object({
  // Lead Traveler / Traveler Name
  name: z.string().min(1, "Name is required"),

  // Booking Amount
  bookingAmount: z.string().min(1, "Booking Amount is required"),
  totalAmount: z.string().min(1, "Total Amount is required"), // Assuming string for currency like "$5000"

  // Second Payment
  secondPaymentDueDate: z.string().min(1, "Second Payment Due Date is required"), // Using string for "YYYY-MM-DD" format from DatePicker
  secondPaymentStatus: z.enum(["Not Paid", "Paid", "Partially Paid"], {
    errorMap: () => ({ message: "Second Payment Status is required" }),
  }),

  // Final Payment
  finalPaymentDueDate: z.string().min(1, "Final Payment Due Date is required"), // Using string for "YYYY-MM-DD" format from DatePicker
  finalPaymentStatus: z.enum(["Not Paid", "Paid", "Partially Paid"], {
    errorMap: () => ({ message: "Final Payment Status is required" }),
  }),
});

// Schema for the overall Payment Details which includes multiple travelers
export const TraveleresScehma = z.object({
  travelers: z.array(PaymentDetailsValidationSchema).min(1, "At least one traveler is required"),
});

export type PaymentDetailsFormData = z.infer<typeof TraveleresScehma>;
export type TravelerFormData = z.infer<typeof PaymentDetailsValidationSchema>;