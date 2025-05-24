import prisma from "@/lib/prisma";

export interface SubscriberPayload {
  institution: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  sub_role: number;
  status: number;
  attachments: number;
}

export interface UpdatePortalUpdateInput extends SubscriberPayload {
  subscriber_id: number;
}

export async function create(input: SubscriberPayload) {
  return await prisma.ur_announcement_subscriber.create({
    data: {
      institution: input.institution,
      first_name: input.first_name,
      last_name: input.last_name,
      email: input.email,
      phone: input.phone,
      attachments: input.attachments,
      status: input.status,
      sub_role: input.sub_role,
      date_added: new Date(),
    },
  });
}
export async function update(input: UpdatePortalUpdateInput) {
  return await prisma.ur_announcement_subscriber.update({
    where: { subscriber_id: input.subscriber_id },
    data: {
      institution: input.institution,
      first_name: input.first_name,
      last_name: input.last_name,
      email: input.email,
      phone: input.phone,
      attachments: input.attachments,
      status: input.status,
      sub_role: input.sub_role,
    },
  });
}

interface id_check {
  id: number;
}

export async function delete_recode(input: number[]) {
  return await prisma.ur_announcement_subscriber.deleteMany({
    where: { subscriber_id: { in: input } },
  });
}

export async function find_one(input: id_check) {
  const { id } = input;
  return await prisma.ur_announcement_subscriber.findUnique({
    where: { subscriber_id: id },
  });
}

interface GetPortalUpdatesInput {
  where?: Record<string, any>;
  skip?: number;
  take?: number;
  sort: string;
  order: string;
}

export async function ge_all_subscribers(input: GetPortalUpdatesInput) {
  const {
    where = {},
    skip = 0,
    take = 10,
    sort = "subscriber_id",
    order = "desc",
  } = input;
  const [updates, total] = await Promise.all([
    prisma.ur_announcement_subscriber.findMany({
      where: where,
      orderBy: { [sort]: order },
      skip,
      take: take,
    }),
    prisma.ur_announcement_subscriber.count({ where }),
  ]);
  return { updates, total };
}
