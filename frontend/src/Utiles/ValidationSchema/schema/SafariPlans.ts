// import { z } from "zod";

// export const safariPlanPageValidationSchema = z.object({
//   // safariPlan: z
//   //   .string()
//   //   .min(1, "Safari Plan is required")
//   //   .max(100, "Safari Plan must be at most 100 characters"),

//   // planType: z
//   //   .enum(['Budget', 'Luxury', 'Standard'], {
//   //     errorMap: () => ({ message: "Invalid Plan Type selected" })
//   //   }),

//   planType: z
//   .string()
//   .min(1, "Plan Type is required"), // accept any string as long as it's not empty


//   tripStartDate: z
//     .string({
//       required_error: "Trip Start Date is required",
//     })
//     .min(1, "Trip Start Date is required"),

//   tripEndDate: z
//     .string({
//       required_error: "Trip End Date is required",
//     })
//     .min(1, "Trip End Date is required"),

// numberOfTravelers: z.enum(
//   ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
//   {
//     errorMap: () => ({ message: "Please select number of travelers" })
//   }
// ),
//     dayDate: z
//     .string()
//     .min(1, "Day/Date is required")
//     .max(100, "Day/Date must be at most 100 characters"),

//   numberOfRoomsType: z
//     .string()
//     .min(1, "No. of Rooms / Type is required")
//     .max(100, "No. of Rooms / Type must be at most 100 characters"),

//   areaVisited: z
//     .string()
//     .min(1, "Area Visited is required")
//     .max(100, "Area Visited must be at most 100 characters"),

//   accommodation: z
//     .string()
//     .min(1, "Accommodation is required")
//     .max(100, "Accommodation must be at most 100 characters"),

//   addOns: z
//     .string()
//     .min(1, "Add-ons is required")
//     .max(200, "Add-ons must be at most 200 characters"),
// });

// // Infer the TypeScript type from the schema for type safety
// export type safariPlanFormData = z.infer<typeof safariPlanPageValidationSchema>;

// ✅ safariPlanPageValidationSchema.ts
import { z } from "zod";

export const safariPlanPageValidationSchema = z.object({
  planType: z.string().min(1, "Plan Type is required"),

  tripStartDate: z
    .string({ required_error: "Trip Start Date is required" })
    .min(1, "Trip Start Date is required"),

  tripEndDate: z
    .string({ required_error: "Trip End Date is required" })
    .min(1, "Trip End Date is required"),

  numberOfTravelers: z.enum(
    ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
    { errorMap: () => ({ message: "Please select number of travelers" }) }
  ),
});

// ✅ Separate schema for Day Plans
export const dayPlanValidationSchema = z.object({
  dayDate: z.string().min(1, "Day/Date is required").max(100),
  numberOfRoomsType: z.string().min(1, "No. of Rooms / Type is required").max(100),
  areaVisited: z.string().min(1, "Area Visited is required").max(100),
  accommodation: z.string().min(1, "Accommodation is required").max(100),
  addOns: z.string().min(1, "Add-ons is required").max(200),
});

