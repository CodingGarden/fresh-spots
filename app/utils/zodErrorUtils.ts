import { z } from "@/deps.ts";

export function getErrorMessages(errors: z.ZodIssue[]) {
  const messages = errors.reduce((all, e) => {
    all.set(e.path[0].toString(), e.message);
    return all;
  }, new Map<string, string>());
  return {
    fieldMap: messages,
    get(fieldName: string) {
      return messages.get(fieldName) || "";
    },
  };
}
