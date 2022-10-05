import { prisma } from "./prisma";
import { IDraft, ListStatus } from "../types";

export function createList(authorId: string, list: IDraft) {
  return prisma.list.create({
    data: {
      ...list,
      status: ListStatus.IN_REVIEW,
      impressions: 0,
      clears: 0,
      skips: 0,
      likes: 0,
      dislikes: 0,
      authorId,
    },
  });
}

export function getListsByAuthor(authorId: string) {
  return prisma.list.findMany({
    where: {
      authorId,
    },
  });
}

export function getListByTitle(title: string) {
  return prisma.list.findFirst({
    where: {
      title,
    },
  });
}

export function getListsWaitingForReview() {
  return prisma.list.findMany({
    where: {
      status: ListStatus.IN_REVIEW,
    },
  });
}