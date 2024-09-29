import { errors } from "@vinejs/vine";
import { FieldContext, ErrorReporterContract } from "@vinejs/vine/types";

export class CustomErrorReporter implements ErrorReporterContract {
  /**
   * A flag to know if one or more errors have been
   * reported
   */
  hasErrors: boolean = false;

  /**
   * A collection of errors.
   */
  errors: Record<string, string> = {};

  /**
   * VineJS calls the report method
   */
  report(message: string, rule: string, field: FieldContext): void {
    this.hasErrors = true;

    /**
     * Collecting errors as per the JSONAPI spec
     */
    this.errors[field.wildCardPath] = message;
  }

  /**
   * Creates and returns an instance of the
   * ValidationError class
   */
  createError() {
    return new errors.E_VALIDATION_ERROR(this.errors);
  }
}