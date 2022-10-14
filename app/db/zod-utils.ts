import { kysely, z } from "@/deps.ts";

export const generatedString = (): z.ZodType<
  kysely.ColumnType<string, never, never>
> =>
  z.lazy(() =>
    z.object({
      __select__: z.string(),
      __insert__: z.never(),
      __update__: z.never(),
    })
  );

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
      __update__: z.date().or(z.string()),
    })
  );

export const timestamps = () => ({
  created_at: DateType(),
  updated_at: DateType(),
});
