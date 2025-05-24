import prisma from "@/lib/prisma";
interface GetPortalUpdatesInput {
  where?: Record<string, any>;
  skip?: number;
  take?: number;
  sort: string;
  order: string;
}

export async function ge_all_graphics_request(input: GetPortalUpdatesInput) {
  const { where = {}, skip = 0, take = 10, sort = "id", order = "desc" } = input;
  const [updates, total] = await Promise.all([
    prisma.graphics_request.findMany({
      where: where,
      orderBy: { [sort]: order },
      skip,
      take: take,
    }),
    prisma.graphics_request.count({ where }),
  ]);
  return { updates, total };
}
