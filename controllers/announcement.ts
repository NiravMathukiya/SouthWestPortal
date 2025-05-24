import { NextRequest, NextResponse } from "next/server";
import {
  create_and_update_announcement,
  // delete_announcement,
  read_announcement,
  // update_announcement,
  list_announcement,
  draft_list,
} from "../services/announcement";

const roleController = (modelName: string) => {
  const model = modelName;

  return {
    create: async (request: NextRequest, user: any): Promise<NextResponse> => {
      return create_and_update_announcement(request, user);
    },
    draft_list: async (request: NextRequest): Promise<NextResponse> => {
      return draft_list(request, model);
    },
    // update: async (request: NextRequest): Promise<NextResponse> => {
    //   return update_announcement(request, model);
    // },
    // delete: async (request: NextRequest): Promise<NextResponse> => {
    //   return delete_announcement(request, model);
    // },
    read: async (request: NextRequest, user: any): Promise<NextResponse> => {
      return read_announcement(request, user);
    },
    list: async (request: NextRequest): Promise<NextResponse> => {
      return list_announcement(request, model);
    },
  };
};

export default roleController;
