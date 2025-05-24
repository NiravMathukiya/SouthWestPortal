import { withAuth } from "@/lib/withAuth";
import { NextRequest } from "next/server";
import categoryController from "../../../../../controllers/category";

const controller = categoryController("role");

export const POST = withAuth(
  async (request: NextRequest) => {
    return await controller.createCategory(request);
  },
  [1]
);

export const GET = withAuth(
  async (request: NextRequest) => {
    const searchParams = request.nextUrl.searchParams;
    const idParam = searchParams.get("id");
    if (idParam) {
      return await controller.getCategory(request);
    } else {
      return await controller.getAllCategory(request);
    }
  },
  [1]
);

export const PUT = withAuth(
  async (request: NextRequest) => {
    return await controller.updateCategory(request);
  },
  [1]
);

export const DELETE = withAuth(
  async (request: NextRequest) => {
    return await controller.deleteCategory(request);
  },
  [1]
);
