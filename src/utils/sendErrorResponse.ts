import { NextResponse } from "next/server";

export const sendErrorResponse = (error = {}, status = 500) => {
  return NextResponse.json(
    {
      success: false,
      error,
    },
    {
      status,
    }
  );
};
