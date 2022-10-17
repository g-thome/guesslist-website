import { prisma } from "./prisma";
import { IDraft } from "../types";
import { ListStatus } from "@prisma/client";

export function createList(authorId: string, list: IDraft) {
  return prisma.list.create({
    data: {
      ...list,
      status: ListStatus.IN_REVIEW,
      plays: 0,
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

export function createDraft(authorId: string) {
  return prisma.list.create({
    data: {
      title: "",
      items: [""],
      categories: [],
      language: "english",
      clears: 0,
      skips: 0,
      likes: 0,
      dislikes: 0,
      plays: 0,
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