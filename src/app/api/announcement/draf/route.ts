import { withAuth } from "@/lib/withAuth";
import { NextRequest } from "next/server";
import categoryController from "../../../../../controllers/announcement";

const controller = categoryController("role");

// export const POST = withAuth(//
//   async (request: NextRequest) => {
//     return await controller.create(request);
//   },
//   [1,2,3]
// );

export const GET = withAuth(
  async (request: NextRequest, user: any) => {
    const searchParams = request.nextUrl.searchParams;
    const idParam = searchParams.get("subscriber_id");
    if (idParam) {
      return await controller.read(request, user);
    } else {
      return await controller.draft_list(request);
    }
  },
  [1, 2, 3]
);

// export const PUT = withAuth(
//   async (request: NextRequest) => {
//     return await controller.update(request);
//   },
//   ["announcement_update"]
// );

// export const DELETE = withAuth(
//   async (request: NextRequest) => {
//     return await controller.delete(request);
//   },
//   ["announcement_delete"]
// );
