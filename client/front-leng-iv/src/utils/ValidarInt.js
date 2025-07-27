// ValidarInt.ts
import * as z from "zod";

const InputNumerico = z.object({
  input: z.preprocess((val) => Number(val), z.number().refine(val => !isNaN(val), {
    message: "Debe ser un número válido"
  }))
});

export const IsNumber = (numero) => {
  return InputNumerico.safeParse({ input: numero }).success;
};
