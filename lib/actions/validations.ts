import { z } from "zod";

// #SCHEMA FOR UPDATE USER PROFILE FORM
export const UpdateUserFormSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(2, {
      message: "First name must be at least 2 characters.",
    })
    .max(15, { message: "First name must be less than 15 characters." }),
  lastName: z
    .string()
    .trim()
    .min(2, {
      message: "Last name must be at least 2 characters.",
    })
    .max(15, { message: "Last name must be less than 15 characters." }),

  nationality: z.string().min(1, { message: "Please select your country." }),

  nationalID: z
    .string()
    .trim()
    .min(6, { message: "National ID must be at least 6 characters." })
    .max(15, { message: "National ID must be less than 12 characters." }),
});

// #SCHEMA FOR CREATING NEW RESERVATION/BOOKING
export const NewBookingSchema = z.object({
  startDate: z.union([z.string(), z.date()]),
  endDate: z.union([z.string(), z.date()]),
  numNights: z.number().positive(),
  numGuests: z.number().positive(),
  cabinPrice: z.number().positive(),
  extrasPrice: z.number().positive(),
  totalPrice: z.number().positive(),
  hasBreakfast: z.boolean(),
  observations: z.string().trim().max(1000),
  cabinId: z.number().positive(),
  guestId: z.number().positive(),
});

export type NewBooking = z.infer<typeof NewBookingSchema>;

// #SCHEMA FOR CABINS PAGE SEARCH PARAMS

export const CabinsSearchParamsSchema = z.object({
  capacity: z.enum(["all", "small", "medium", "large"]),
});

export type CabinsSearchParams = z.infer<typeof CabinsSearchParamsSchema>;
