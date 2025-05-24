import { NextResponse } from "next/server";

export const sendResponse = (data = {}, status = 200) => {
  return NextResponse.json(
    {
      success: true,
      data,
    },
    {
      status,
    }
  );
};


export const senderror = (data = {}, status = 400) => {
  return NextResponse.json(
    {
      success: false,
      data,
    },
    {
      status,
    }
  );
};
