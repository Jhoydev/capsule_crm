import { z } from "zod"

export const contactSchema = z.object({
    id: z.number(),
    name: z.string(),
    email: z.string(),
    phone: z.string(),
})

export type Contact = z.infer<typeof contactSchema>