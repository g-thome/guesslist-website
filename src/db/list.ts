import { prisma } from "./prisma";
import { IDraft } from "../types";
import { List, ListStatus } from "@prisma/client";

export function createList(authorId: string, list: IDraft) {
  return prisma.list.create({
    data: {
      ...list,
      status: ListStatus.IN_REVIEW,
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

export function createDraft(authorId: string) {
  return prisma.list.create({
    data: {
      title: "",
      items: [""],
      categories: [],
      language: "english",
      status: ListStatus.DRAFT,
      authorId,
    },
  });
}

export function getListById(id: string) {
  return prisma.list.findFirst({
    where: {
      id,
    },
  });
}

export function updateList(id: string, data: Partial<List>) {
  return prisma.list.update({
    where: { id },
    data,
  });
}