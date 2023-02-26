import { API_URL } from "./constants";
import { IDraft } from "./types";
import { List } from "@prisma/client";

function post(endpoint: string, body: any) {
  return fetch(API_URL + endpoint, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
}

function get(endpoint: string) {
  return fetch(API_URL + endpoint, {
    method: "GET",
    mode: "cors",
    headers: {
      Accept: "application/json",
    },
  });
}

function patch(endpoint: string, body: any) {
  return fetch(API_URL + endpoint, {
    method: "PATCH",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
}

export async function publishList(authorId: string, list: IDraft) {
  const response = await post("/list", {
    authorId,
    ...list,
  });
  return response.json();
}

export async function getUserLists(userId: string) {
  const response = await get("/list?authorId=" + userId);
  return response.json();
}

export async function getList(id: string): Promise<List> {
  const response = await get(`/list/${id}`);
  return response.json();
}

export async function createDraft(userId: string): Promise<List> {
  const response = await post("/create-draft", { authorId: userId });
  return response.json();
}

export async function saveDraft(listId: string, data: Partial<List>) {
  const response = await patch(`/list/${listId}`, data);
  return response.json();
}

export async function submitToReview(listId: string) {
  return patch(`/list/${listId}/submit-to-review`, {});
}