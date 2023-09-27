import * as z from "zod"

// Image upload
const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

// Zod form schema
export const formSchema = z.object({
  disciplines: z
    .string({
      required_error: "Please select a discipline.",
    }),
  categories: z
    .string({
      required_error: "Please select a category.",
    }),
  name_and_surname: z
    .string({
      required_error: 'Please, enter your name and surname.'
    })
    .min(2, {
        message: "Name and surname must be at least 2 characters.",
    }),
  date_of_birth: z
    .date({
      required_error: "A date of birth is required.",
    }),
  teacher: z
    .string().optional(),
  conductor: z
    .string().optional(),
  collective_leader: z
    .string().optional(),
  accompanist: z
    .string().optional(),
  countries: z
    .string({
      required_error: "Please select a country.",
    }),
  place: z
    .string({
      required_error: "Please select a city/place.",
    })
    .min(2, {
      message: "City/place must be at least 2 characters.",
    }),
  institution: z
    .string().optional(),
  program: z
    .string()
    .min(5, {
      message: "Program must be at least 5 characters.",
    })
    .max(300, {
      message: "Program must not be longer than 300 characters.",
    }),
  biography: z
    .string()
    .min(5, {
      message: "If not empty, biography must be at least 5 characters.",
    })
    .max(1500, {
      message: "Biography must not be longer than 1500 characters.",
    })
    .optional(),
  participants_email: z
    .string({
      required_error: "Email is required.",
    })
    .email("Please, enter a valid email."),
  teachers_email: z
    .string()
    .email("Please, enter a valid email.")
    .optional(),
  video_link: z
    .string({
      required_error: "Video URL is required.",
    })
    .url({ message: "Please enter a valid URL." }),
  identity_documents: z
    .any()
    .refine((files) => files?.length, "Document is required.")
    .refine((files) => files?.every((file: any) => file.size <= MAX_FILE_SIZE), `Max file size is 5MB.`)
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      ".jpg, .jpeg, .png and .webp files are accepted."
    ),
  avatar: z
    .any()
    .optional(),
  info_correct: z
    .boolean()
    .default(false)
    .refine(info => info, 'This field is required.'),
  agree_with_terms: z
    .boolean()
    .default(false)
    .refine(agree => agree, 'This field is required.'),
});

export type FormValues = z.infer<typeof formSchema>