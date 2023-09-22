import { RickMortyClient } from "@/lib/client";
import { GET_CHARACTER_BY_ID_FRAGMENT } from "./characters-queries";

export const getCharacterById = (id: string) => {
  const client = RickMortyClient();
  return client.readFragment({
    id: `Character:${id}`,
    fragment: GET_CHARACTER_BY_ID_FRAGMENT,
  });
};
