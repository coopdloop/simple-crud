import { NextRequest, NextResponse } from "next/server";
import * as recordApi from "@/types/api/record";
import * as recordModel from "@/models/recordModel";
export async function POST(
  req: NextRequest
): Promise<
  NextResponse<recordApi.createRecordApiResponse | recordApi.zodError>
> {
  const body = await req.json();
  try {
    const recordParams = recordApi.RecordData.parse(body);
    console.log(`Creating record: ${JSON.stringify(recordParams)}`);
    console.log("POST /api/v1/create");
    // CREATE record BY PARAMS
    const record = await recordModel.createRecord(recordParams);
    return NextResponse.json({ ...record });
  } catch (error: any) {
    const customError = {
      name: error.name,
      message: "Validation Error",
      errors: error.issues.map((issue: any) => issue),
    };
    return NextResponse.json(
      { ...customError, success: false },
      { status: 422 }
    );
  }
}
