import prisma from "@/lib/prisma";

interface CreateRoleInput {
  role_name: string;
  date_added: Date;
}

export async function create_role(input: CreateRoleInput) {
  const { role_name, date_added } = input;
  const role = await prisma.ur_admin_role.create({
    data: {
      role_name,
      date_added,
    },
  });

  return role;
}

interface UpdateRoleInput {
  id: number;
  role_name: string;
  date_added: Date;
}

export async function update_role(input: UpdateRoleInput) {
  const { id, role_name, date_added } = input;
  console.log(id, "---- Role Id ---------------");
  const role = await prisma.ur_admin_role.update({
    where: { admin_role_id: id },
    data: {
      role_name,
      date_added,
    },
  });

  return role;
}

interface IdRoleInput {
  id: number;
}

export async function delete_role(input: IdRoleInput) {
  const { id } = input;

  const deletedRole = await prisma.ur_admin_role.delete({
    where: { admin_role_id: id },
  });

  return deletedRole;
}

export async function find_role(input: IdRoleInput) {
  const { id } = input;
  const role = await prisma.ur_admin_role.findUnique({
    where: { admin_role_id: id },
  });

  return role;
}

interface GetRolesInput {
  where?: Record<string, any>;
  skip?: number;
  take?: number;
}

export async function get_all_role(input: GetRolesInput) {
  const { where = {}, skip = 1, take = 10 } = input;
  const [roles, total] = await Promise.all([
    prisma.ur_admin_role.findMany({
      where: where,
      skip,
      take: take,
    }),
    prisma.ur_admin_role.count({ where: where }),
  ]);

  return { roles, total };
}

interface name_check {
  role_name: string;
}

export async function find_one(input: name_check) {
  const { role_name } = input;
  return await prisma.ur_admin_role.findFirst({
    where: {
      role_name,
    },
  });
}
