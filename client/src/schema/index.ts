import { z } from "zod";

export const connectionSchema = z.object({
  username: z
    .string()
    .min(2, {
      message: "prenom must be at least 3 characters.",
    })
    .max(20, {
      message: "prenom must be at most 20 characters.",
    }),
  password: z
    .string()
    .min(8, {
      message: "password must be at least 8 characters.",
    })
    .max(20, {
      message: "prenom must be at most 20 characters.",
    }),
});

export type connectionType = z.infer<typeof connectionSchema>;

export const propertySchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "name must be at least 3 characters.",
    })
    .max(20, {
      message: "name must be at most 20 characters.",
    }),
  address: z
    .string()
    .min(2, {
      message: "address must be at least 3 characters.",
    })
    .max(100, {
      message: "address must be at most 100 characters.",
    }),
  type: z.enum(["house", "apartment", "office", "duplex"], {
    errorMap: () => {
      return { message: "Please select a type." };
    },
  }),
  units: z.number({
    required_error: "Units are required.",
    invalid_type_error: "Units must be a number.",
  }),
  rental_cost: z.number({
    required_error: "Rental cost is required.",
    invalid_type_error: "Rental cost must be a number.",
  }),
});
export type propertyType = z.infer<typeof propertySchema>;

export const TenantSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "name must be at least 3 characters.",
    })
    .max(20, {
      message: "name must be at most 20 characters.",
    }),
  telephone: z.string().optional(),
  section: z.string().min(2, {
    message: "section must be at least 3 characters.",
  }),
  property: z.string() ,
});
export type TenantType = z.infer<typeof TenantSchema>;

export const PayementSchema = z.object({
  tenant: z.string(),
  amount: z.number({
    required_error: "amount is required.",
    invalid_type_error: "amount must be a number.",
  }),
  date: z.string(),
  is_settled: z.boolean(),
});
export type PayementType = z.infer<typeof PayementSchema>;





