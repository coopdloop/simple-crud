import { connection } from "@/db/db";
import { MySql2Database, drizzle } from "drizzle-orm/mysql2";
import { record } from "@/db/schema";
import { eq } from "drizzle-orm";
import * as recordApi from "@/types/api/record";

const db: MySql2Database = drizzle(connection);

export const getOneRecord = async (
  recordId: number
): Promise<recordApi.getRecordApiResponse> => {
  try {
    const result = await db
      .select()
      .from(record)
      .where(eq(record.id, recordId));
    return { RecordData: result[0], success: true };
  } catch (error: any) {
    return error;
  }
};

export const createRecord = async (
  recordData: recordApi.createRecordApiRequest
): Promise<recordApi.createRecordApiResponse> => {
  try {
    await db.insert(record).values(recordData);
    return { ...recordData };
  } catch (error: any) {
    return error;
  }
};


// Create Second query to get record info before deletion.
export const removeRecord = async (
  id: number
): Promise<recordApi.removeRecordApiResponse> => {
  try {
    await db.delete(record).where(eq(record.id, id));
    return { success: true };
  } catch (error: any) {
    return error;
  }
};
