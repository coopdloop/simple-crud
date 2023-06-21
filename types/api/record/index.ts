import { type ZodIssue } from "zod";
import { z } from "zod";

export const CustomError = z.object({
  name: z.string(),
  message: z.string(),
  errors: z.array(z.string()),
  stack: z.string().optional(),
});

export const SimpleError = z.object({
  error: CustomError,
  success: z.boolean(),
});

export type zodError = z.infer<typeof CustomError>;

export const Record = z.object({
    albumName: z.string().nullable(),
    artistName: z.string().nullable(),
    genreName: z.string().nullable(),
    releaseDate: z.date().nullable(),
  });
  
  export const RecordData = z.object({
    id: z.number(),
    albumName: z.string().nullable(),
    artistName: z.string().nullable(),
    genreName: z.string().nullable(),
    releaseDate: z.date().nullable(),
  });

export type createRecordApiRequest = z.infer<typeof Record>;

export const RecordDataResponse = z.object({
  error: z.string().optional(),
  success: z.boolean().optional(),
  RecordData: RecordData,
  //   label: z.string().nullable(),
  //   status: z.string().nullable(),
  //   priority: z.string().nullable(),
});
export type createRecordApiResponse = z.infer<typeof Record>;

export type getRecordApiResponse = z.infer<typeof RecordDataResponse>;

export const ManyRecordDataResponse = z.object({
  error: z.string().optional(),
  success: z.boolean().optional(),
  RecordData: z.array(RecordData),
  //   label: z.string().nullable(),
  //   status: z.string().nullable(),
  //   priority: z.string().nullable(),
});

export type getManyRecordApiResponse = z.infer<typeof ManyRecordDataResponse>;

export const getRecord = z.object({
  id: z.number(),
});

export type removeRecordApiRequest = z.infer<typeof getRecord>;

export const removeRecordResponse = z.object({
  error: CustomError.optional(),
  success: z.boolean(),
});
export type removeRecordApiResponse = z.infer<typeof removeRecordResponse>;
