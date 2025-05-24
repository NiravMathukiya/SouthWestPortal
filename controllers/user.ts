import { NextRequest, NextResponse } from "next/server";
import {
  createUser,
  deleteUser,
  getAllUser,
  getUser,
  updateUser,
} from "../services/user";

const userController = (modelName: string) => {
  const model = modelName;
  return {
    createUser: async (
      request: NextRequest,
      user: any
    ): Promise<NextResponse> => {
      return createUser(request,  user);
    },
    updateUser: async (request: NextRequest): Promise<NextResponse> => {
      return updateUser(request, model);
    },
    deleteUser: async (request: NextRequest): Promise<NextResponse> => {
      return deleteUser(request, model);
    },
    getUser: async (request: NextRequest): Promise<NextResponse> => {
      return getUser(request, model);
    },
    getAllUser: async (request: NextRequest): Promise<NextResponse> => {
      return getAllUser(request, model);
    },
  };
};

export default userController;
