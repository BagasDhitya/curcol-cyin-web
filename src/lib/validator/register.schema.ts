import { z as zod } from 'zod'

export const registerSchema = zod.object({
    name: zod.string().min(6, 'Name must be at least 6 characters'),
    email: zod.string().email('Invalid email format'),
    password: zod.string().min(6, "Password must be at least 6 characters")
})

export type RegisterForm = zod.infer<typeof registerSchema>