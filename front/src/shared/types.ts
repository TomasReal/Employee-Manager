import z from "zod";

export const EmployeeSchema = z.object({
  id: z.number(),
  fullName: z.string(),
  age: z.number().int().nonnegative(),
  area: z.string(),
  seniority: z.number().int().nonnegative(),
  phone: z.string(),
  createdAt: z.string(),
});

export type Employee = z.infer<typeof EmployeeSchema>;

export const CreateEmployeeSchema = z.object({
  fullName: z.string(),
  age: z.number().int().nonnegative(),
  area: z.string(),
  seniority: z.number().int().nonnegative(),
  phone: z.string(),

});
export type CreateEmployee = z.infer<typeof CreateEmployeeSchema>;

export const UpdateEmployeeSchema = z.object({
  fullName: z.string().optional(),
  age: z.number().int().nonnegative().optional(),
  area: z.string().optional(),
  seniority: z.number().int().nonnegative().optional(),
  phone: z.string().optional(),
});
export type UpdateEmployee = z.infer<typeof UpdateEmployeeSchema>;

export interface AreaSummary {
  area: string;
  count: number;
  employees: Employee[];
}
