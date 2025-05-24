import { NextRequest, NextResponse } from "next/server";
import {
  create_portal,
  delete_portal,
  list_portal,
  read_portal,
  update_portal,
} from "../services/portalupdates";

const roleController = (modelName: string) => {
  const model = modelName;

  return {
    create: async (request: NextRequest): Promise<NextResponse> => {
      return create_portal(request, model);
    },
    update: async (request: NextRequest): Promise<NextResponse> => {
      return update_portal(request, model);
    },
    delete: async (request: NextRequest): Promise<NextResponse> => {
      return delete_portal(request, model);
    },
    read: async (request: NextRequest): Promise<NextResponse> => {
      return read_portal(request, model);
    },
    list: async (request: NextRequest): Promise<NextResponse> => {
      return list_portal(request, model);
    },
  };
};

export default roleController;
