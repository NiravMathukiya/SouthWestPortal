import prisma from "@/lib/prisma";
import { date } from "joi";

interface CreateUserInput {
  username: string;
  password: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  status: number;
  access_level_id: number;
  budget_team_id: number;
  forceChangePassword: number;
  dashboard_type: number;
  role_id : [];
}

export async function check_role_id(role_id: number[]): Promise<boolean> {
  const exists = await prisma.ur_admin_role.findMany({
    where: {
      admin_role_id: {
        in: role_id,
      },
    },
  });

  return exists.length == role_id.length;
}


export async function create_user(input: CreateUserInput) {
  const {
    username,
    password,
    first_name,
    last_name,
    email,
    phone,
    status,
    access_level_id,
    budget_team_id,
    forceChangePassword,
    dashboard_type,
    role_id,
  } = input;

  const result = await prisma.$transaction(async (tx) => {
    const user = await tx.ur_admin_user.create({
      data: {
        admin_role: 0,
        access_level_id: 0,
        budget_team_id: 0,
        username,
        password,
        password_sha: "",
        first_name,
        last_name,
        email,
        phone,
        date_added: new Date(),
        status: 1,
        forceChangePassword: 0,
        dashboard_type: 0,
      },
    });

    const rolePromises = role_id.map((role) =>
      tx.ur_admin_user_role.create({
        data: {
          user_id: user.admin_id,
          role_id: role,
          date_added: new Date(),
        },
      })
    );

    await Promise.all(rolePromises);

    return user;
  });

  return result;
}

interface UpdateUserInput {
  username: string;
  password: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  status: number;
  access_level_id: number;
  budget_team_id: number;
  forceChangePassword: number;
  dashboard_type: number;
  id: number;
}

export async function update_user(input: UpdateUserInput) {
  const {
    username,
    password,
    first_name,
    last_name,
    email,
    phone,
    status,
    access_level_id,
    budget_team_id,
    forceChangePassword,
    dashboard_type,
    id,
  } = input;

  const user = await prisma.ur_admin_user.update({
    where: {
      admin_id: id,
    },
    data: {
      admin_role: 0,
      access_level_id: 0,
      budget_team_id: 0,
      username,
      password,
      password_sha: "",
      first_name,
      last_name,
      email,
      phone,
      date_added: new Date(),
      status: 1,
      forceChangePassword: 0,
      dashboard_type: 0,
    },
  });

  return user;
}

interface IdUserInput {
  id: number;
}

export async function delete_user(input: IdUserInput) {
  const { id } = input;

  const deletedUser = await prisma.ur_admin_user.delete({
    where: { admin_id: id },
  });

  return deletedUser;
}

export async function find_user(input: IdUserInput) {
  const { id } = input;
  const user = await prisma.ur_admin_user.findUnique({
    where: { admin_id: id },
  });

  return user;
}

interface GetUserInput {
  where?: Record<string, any>;
  skip?: number;
  take?: number;
}

export async function get_all_user(input: GetUserInput) {
  const { where = {}, skip = 1, take = 10 } = input;
  const [users, total] = await Promise.all([
    prisma.ur_admin_user.findMany({
      where: where,
      skip,
      take: take,
    }),
    prisma.ur_admin_user.count({ where: where }),
  ]);

  return { users, total };
}
