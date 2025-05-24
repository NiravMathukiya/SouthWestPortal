import { NextRequest, NextResponse } from "next/server";
import {
  createRole,
  deleteRole,
  getAllRole,
  getRole,
  updateRole,
} from "../services/role";

const roleController = (modelName: string) => {
  const model = modelName;

  return {
    createRole: async (request: NextRequest): Promise<NextResponse> => {
      return createRole(request, model);
    },
    updateRole: async (request: NextRequest): Promise<NextResponse> => {
      return updateRole(request, model);
    },
    deleteRole: async (request: NextRequest): Promise<NextResponse> => {
      return deleteRole(request, model);
    },
    getRole: async (request: NextRequest): Promise<NextResponse> => {
      return getRole(request, model);
    },
    getAllRole: async (request: NextRequest): Promise<NextResponse> => {
      return getAllRole(request, model);
    },
  };
};

export default roleController;
