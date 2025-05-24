import { withAuth } from "@/lib/withAuth";
import { NextRequest } from "next/server";
import graphics_requestController from "../../../../controllers/graphics_request";

const controller = graphics_requestController("graphics_request");

// export const POST = withAuth(
//   async (request: NextRequest) => {
//     return await controller.create(request);
//   },
//   ["subscribers_add"]
// );

export const GET = withAuth(
  async (request: NextRequest) => {
    // const searchParams = request.nextUrl.searchParams;
    // const idParam = searchParams.get("subscriber_id");
    // if (idParam) {
    //   return await controller.read(request);
    // } else {
    return await controller.list(request);
    // }
  },
  [1]
);

// export const PUT = withAuth(
//   async (request: NextRequest) => {
//     return await controller.update(request);
//   },
//   ["subscribers_update"]
// );

// export const DELETE = withAuth(
//   async (request: NextRequest) => {
//     return await controller.delete(request);
//   },
//   ["subscribers_delete"]
// );
