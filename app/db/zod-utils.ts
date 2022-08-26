import { z, kysely } from "@/deps.ts";

export const generatedNumber = (): z.ZodType<
  kysely.ColumnType<number, never, never>
> =>
  z.lazy(() =>
    z.object({
      __select__: z.number(),
      __insert__: z.never(),
      __update__: z.never(),
    })
  );

export const DateType = (): z.ZodType<
  kysely.ColumnType<Date, Date | string | undefined, Date | string>
> =>
  // @ts-ignore: can't figure out another way for now...
  z.lazy(() =>
    z.object({
      __select__: z.date(),
      __insert__: z.date().or(z.string().or(z.undefined())),
      // TODO: add database trigger to auto update this
      __update__: z.date().or(z.string()),
    })
  );

export const timestamps = () => ({
  created_at: DateType(),
  updated_at: DateType(),
});
