import { ZodError } from "zod";

export function getZodErrorMessage(error: any): string {
  if (error?.name === "ZodError" || error instanceof ZodError) {
    const issues =
      error.issues ||
      error.errors ||
      (() => {
        if (!error?.message || typeof error.message !== "string") return [];
        try {
          const parsed = JSON.parse(error.message);
          return Array.isArray(parsed) ? parsed : [];
        } catch {
          return [];
        }
      })();

    return issues?.[0]?.message || "Validation failed";
  }

  return error?.message || "Internal error";
}
