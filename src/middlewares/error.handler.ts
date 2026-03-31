import { ZodError } from "zod";
import { HttpError, ConflictError } from "../errors/http-error";

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

  if (error instanceof ConflictError) {
    return error.message;
  }

  if (error instanceof HttpError) {
    return error.message;
  }

  if (error?.code === 11000 || error?.code === "11000") {
    const duplicateField = Object.keys(error.keyValue || {}).join(", ") || "field";
    return `Duplicate value for ${duplicateField}`;
  }

  return error?.message || "Internal error";
}

export function getErrorStatusCode(error: any): number {
  if (error instanceof ConflictError) {
    return 409;
  }

  if (error instanceof HttpError) {
    return error.statusCode;
  }

  if (error?.name === "ZodError" || error instanceof ZodError) {
    return 400;
  }

  if (error?.code === 11000 || error?.code === "11000") {
    return 409;
  }

  return 500;
}

