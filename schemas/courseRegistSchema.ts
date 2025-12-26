import z from "zod";

export const courseRegistSchema = z.object({
  dogId: z.string(),
  phone: z
    .string()
    .min(10, {error: "10이상으로 작성해주세요."})
    .transform((val) => {
      return val.replaceAll("-", "");
    }),
});
