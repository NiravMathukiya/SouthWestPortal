import { NextRequest, NextResponse } from "next/server";
import {
  // create_graphics_request,
  // delete_graphics_request,
  // read_graphics_request,
  // update_graphics_request,
  list_graphics_request,
} from "../services/graphics_request";

const roleController = (modelName: string) => {
  const model = modelName;

  return {
    // create: async (request: NextRequest): Promise<NextResponse> => {
    //   return create_graphics_request(request, model);
    // },
    // update: async (request: NextRequest): Promise<NextResponse> => {
    //   return update_graphics_request(request, model);
    // },
    // delete: async (request: NextRequest): Promise<NextResponse> => {
    //   return delete_graphics_request(request, model);
    // },
    // read: async (request: NextRequest): Promise<NextResponse> => {
    //   return read_graphics_request(request, model);
    // },
    list: async (request: NextRequest): Promise<NextResponse> => {
      return list_graphics_request(request, model);
    },
  };
};

export default roleController;
