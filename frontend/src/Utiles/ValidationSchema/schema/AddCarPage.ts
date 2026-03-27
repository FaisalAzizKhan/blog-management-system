// src/Utiles/ValidationSchema/AddCarPage.ts
import { z } from 'zod';

const addCarSchema = z.object({
  brand_name: z.string().min(1, "Brand Name is required"),
  category: z.string().optional().or(z.literal("")),
  release_year: z.string().optional().or(z.literal("")),
  model_name: z.string().min(1, "Model Name is required"),
  vehicle_type: z.string().optional().or(z.literal("")),
  ext_color: z.string().optional().or(z.literal("")),
  scale: z.string().optional().or(z.literal("")),
  packaging: z.string().optional().or(z.literal("")),
  item_number: z.string().optional().or(z.literal("")),
  exclusive: z.string().optional().or(z.literal("")),
  store_bin: z.string().optional().or(z.literal("")),
  bin_location: z.string().optional().or(z.literal("")),
  purchase_date: z.string().optional().or(z.literal("")),
  cost: z.string().optional().or(z.literal("")),
  condition: z.string().optional().or(z.literal("")),
  price: z.string().optional().or(z.literal("")),

  // File validation for optional images
  front_image: z.union([
    z.instanceof(File).refine(file => file.size > 0, "Front image is required."),
    z.literal(""),
    z.undefined()
  ]).optional(),

  back_image: z.union([
    z.instanceof(File).refine(file => file.size > 0, "Back image is required."),
    z.literal(""),
    z.undefined()
  ]).optional(),
});

export default addCarSchema;