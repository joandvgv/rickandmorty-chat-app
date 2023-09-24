type Character = {
  id: number;
  name: string;
  status: "Alive" | "Dead" | "unknown";
  species: string;
  type: string;
  gender: "Female" | "Male" | "Genderless" | "unknown";
  origin: {
    name: string;
    link: string;
  };
  location: {
    name: string;
    link: string;
  };
  image: string; // URL
  episode: string[]; // Array of URLs
  url: string; // URL
  created: string; // Time
};

type Pagination = {
  count: number;
  pages: number;
  next: number;
  prev: number;
};
