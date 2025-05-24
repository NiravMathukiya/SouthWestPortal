import prisma from "@/lib/prisma";

// types/portalUpdateTypes.ts
export interface CreatePortalUpdateInput {
  description: string;
  txtEmail: string;
  cost_per_person: number;
  ref_restaurant_id: number;
  ref_category_id: number;
  status: number;
  priority: number;
  txtSubmittedBy?: string;
}

export interface UpdatePortalUpdateInput extends CreatePortalUpdateInput {
  update_id: number;
}


export async function create(input: CreatePortalUpdateInput) {
  const newUpdate = await prisma.ur_portalupdates.create({
    data: {
      description: input.description,
      txtEmail: input.txtEmail,
      cost_per_person: input.cost_per_person,
      ref_restaurant_id: input.ref_restaurant_id,
      ref_category_id: input.ref_category_id,
      status: input.status,
      priority: input.priority,
      txtSubmittedBy: input.txtSubmittedBy || '',
      date_added: new Date(),
      date_modified: new Date(),
    },
  });

  return newUpdate;
}
export async function update(input: UpdatePortalUpdateInput) {
  const updated = await prisma.ur_portalupdates.update({
    where: { update_id: input.update_id },
    data: {
      description: input.description,
      txtEmail: input.txtEmail,
      cost_per_person: input.cost_per_person,
      ref_restaurant_id: input.ref_restaurant_id,
      ref_category_id: input.ref_category_id,
      status: input.status,
      priority: input.priority,
      txtSubmittedBy: input.txtSubmittedBy,
      date_modified: new Date(),
    },
  });
  return updated;
}

interface id_check {
  id: number;
}

export async function delete_recode(input: id_check) {
  const { id } = input;
  return await prisma.ur_portalupdates.delete({
    where: { update_id: id },
  });
}

export async function find_one(input: id_check) {
  const { id } = input;
  return await prisma.ur_portalupdates.findUnique({
    where: { update_id: id },
  });
}

interface GetPortalUpdatesInput {
  where?: Record<string, any>;
  skip?: number;
  take?: number;
  sort: string;
  order: string;
}


export async function ge_all_portal(input: GetPortalUpdatesInput) {
  const { where = {}, skip = 0, take = 10, sort = "form_id", order = "desc" } = input;
  const [updates, total] = await Promise.all([
    prisma.ur_portalupdates.findMany({
      where,
      orderBy: { [sort]: order },
      skip,
      take,
    }),
    prisma.ur_portalupdates.count({ where }),
  ]);
  return { updates, total };
}


interface name_check {
  category_name: string;
  id?: number;
}

export async function find_by_name(input: name_check) {
  const { category_name, id } = input;
  let where: any = {
    category_name
  };
  console.log(id)
  if (id) {
    where.category_id = {
      not: id
    };
  }
  return await prisma.ur_portalupdates_category.findFirst({
    where
  });
}

interface id_check {
  id: number;
}
export async function category_find_one(input: id_check) {
  const { id } = input;
  return await prisma.ur_portalupdates_category.findUnique({
    where: { category_id: id },
    select: { category_name: true },
  });
}