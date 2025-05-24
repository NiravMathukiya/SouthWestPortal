import { NextRequest, NextResponse } from "next/server";
import {
  createCategory,
  deleteCategory,
  getAllCategory,
  getCategory,
  updateCategory,
} from "../services/category";

const roleController = (modelName: string) => {
  const model = modelName;

  return {
    createCategory: async (request: NextRequest): Promise<NextResponse> => {
      return createCategory(request, model);
    },
    updateCategory: async (request: NextRequest): Promise<NextResponse> => {
      return updateCategory(request, model);
    },
    deleteCategory: async (request: NextRequest): Promise<NextResponse> => {
      return deleteCategory(request, model);
    },
    getCategory: async (request: NextRequest): Promise<NextResponse> => {
      return getCategory(request, model);
    },
    getAllCategory: async (request: NextRequest): Promise<NextResponse> => {
      return getAllCategory(request, model);
    },
  };
};

export default roleController;
