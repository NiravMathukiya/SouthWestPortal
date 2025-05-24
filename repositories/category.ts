import prisma from "@/lib/prisma";
import { boolean, number } from "joi";

interface CreatecategoryInput {
  category_name: string;
  status: number;
}

export async function create(input: CreatecategoryInput) {
  const { category_name, status } = input;
  return await prisma.ur_portalupdates_category.create({
    data: {
      category_name,
      status: Number(status),
      sort_order: 1,
    },
  });
}

interface UpdatecategoryInput {
  id: number;
  category_name: string;
  sort_order: number;
  status: number;
}

export async function update(input: UpdatecategoryInput) {
  const { id, category_name, sort_order = 1, status } = input;
  const category = await prisma.ur_portalupdates_category.update({
    where: { category_id: id },
    data: {
      category_name,
      sort_order,
      status: Number(status),
    },
  });

  return category;
}

interface id_check {
  id: number;
}

export async function delete_recode(input: number[]) {
  return await prisma.ur_portalupdates_category.deleteMany({
    where: { category_id: { in: input } },
  });
}

export async function find_one(input: id_check) {
  const { id } = input;
  const category = await prisma.ur_portalupdates_category.findUnique({
    where: { category_id: id },
  });

  return category;
}

interface GetcategorysInput {
  where?: Record<string, any>;
  skip?: number;
  take?: number;
}

export async function get_all_category(input: GetcategorysInput) {
  const { where = {}, skip = 1, take = 10 } = input;
  const [category, total] = await Promise.all([
    prisma.ur_portalupdates_category.findMany({
      where: where,
      skip,
      take: take,
    }),
    prisma.ur_portalupdates_category.count({ where: where }),
  ]);

  return { category, total };
}

interface name_check {
  category_name: string;
  id?: number;
}

export async function find_by_name(input: name_check) {
  const { category_name, id } = input;
  let where: any = {
    category_name,
  };
  console.log(id);
  if (id) {
    where.category_id = {
      not: id,
    };
  }
  return await prisma.ur_portalupdates_category.findFirst({
    where,
  });
}
