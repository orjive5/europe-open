import { z } from "zod";
import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE } from "../constants";

export const schema = z.object({
    payment_proof: z
        .any()
        .refine((files) => files?.length, "Payment proof is required.")
        .refine((files) => files?.every((file: any) => file.size <= MAX_FILE_SIZE), `Max file size is 5MB.`)
        .refine(
            (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
            ".jpg, .jpeg, .png and .webp files are accepted."
        ),
})