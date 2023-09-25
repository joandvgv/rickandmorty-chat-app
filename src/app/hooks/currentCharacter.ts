import { GET_CHARACTERS_COUNT_QUERY } from "@/graphql/characters-queries";
import { useSuspenseQuery } from "@apollo/client";
import { useEffect, useMemo, useState } from "react";

/**
 * Get a random character id from Rick&Morty API
 * and store it in local storage if it's not stored already
 */
export default function useCurrentCharacter() {
  const { data: countData } = useSuspenseQuery<{
    characters: { info: Pagination };
  }>(GET_CHARACTERS_COUNT_QUERY, {
    context: {
      clientName: "rickMorty",
    },
  });

  const totalCharacters = countData.characters.info.count;

  const currentCharacterId = useMemo(() => {
    return (Math.floor(Math.random() * totalCharacters) + 1).toString();
  }, [totalCharacters]);

  const [currentCharacter, setCurrentCharacter] = useState<string>();

  useEffect(() => {
    const storedCharacter = localStorage.getItem("currentCharacter");
    if (!storedCharacter) {
      localStorage.setItem("currentCharacter", currentCharacterId);
      setCurrentCharacter(currentCharacterId);
    } else {
      setCurrentCharacter(storedCharacter);
    }
  }, []);

  return currentCharacter;
}
