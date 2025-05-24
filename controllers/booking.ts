import { NextRequest, NextResponse } from "next/server";
import {
  create_subscribers,
  delete_subscribers,
  list_subscribers,
  read_subscribers,
  update_subscribers,
} from "../services/subscribers";

const roleController = (modelName: string) => {
  const model = modelName;

  return {
    create: async (request: NextRequest): Promise<NextResponse> => {
      return create_subscribers(request, model);
    },
    update: async (request: NextRequest): Promise<NextResponse> => {
      return update_subscribers(request, model);
    },
    delete: async (request: NextRequest): Promise<NextResponse> => {
      return delete_subscribers(request, model);
    },
    read: async (request: NextRequest): Promise<NextResponse> => {
      return read_subscribers(request, model);
    },
    list: async (request: NextRequest): Promise<NextResponse> => {
      return list_subscribers(request, model);
    },
  };
};

export default roleController;
