import { withAuth } from "@/lib/withAuth";
import { NextRequest } from "next/server";
import categoryController from "../../../../controllers/announcement";

const controller = categoryController("role");

export const POST = withAuth(
  async (request, user) => {
    return await controller.create(request, user);
  },
  [1, 2, 3]
);

export const GET = withAuth(
  //1,2,3
  async (request: NextRequest, user) => {
    const searchParams = request.nextUrl.searchParams;
    const encid = searchParams.get("encid");
    const form_id = searchParams.get("form_id");
    const data_get = searchParams.get("data_get");
    console.log(data_get)
    if (encid || form_id || data_get) {
      return await controller.read(request, user);
    } else {
      return await controller.list(request);
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
