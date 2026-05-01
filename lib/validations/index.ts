/**
 * Form Validation Schemas
 *
 * All Zod schemas, inferred types, step definitions and constants
 * for each service form are exported from here.
 *
 * Usage:
 *   import { birthRegistrationSchema, BirthRegistrationData } from "@/lib/validations";
 *   import { cidIssuanceSchema, CIDIssuanceData }             from "@/lib/validations";
 *   import { deathRegistrationSchema, DeathRegistrationData } from "@/lib/validations";
 */

export * from "./birth-registration.schema";
export * from "./cid-issuance.schema";
export * from "./death-registration.schema";
