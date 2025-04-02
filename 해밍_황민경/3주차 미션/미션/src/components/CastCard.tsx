import { Cast, Crew } from "../types/movieDetails";

interface CastCardProps {
  person: Cast | Crew;
  type: "cast" | "crew";
}

export default function CastCard({ person, type }: CastCardProps) {
  const name = person.name;
  const role =
    type === "cast" ? (person as Cast).character : (person as Crew).job;
  const profilePath = (person as Cast).profile_path ?? null;

  return (
    <div className="flex flex-col items-center transition-transform duration-300 hover:scale-105">
      {profilePath ? (
        <img
          src={`https://image.tmdb.org/t/p/w185${profilePath}`}
          alt={name}
          className="w-20 h-20 object-cover rounded-full mb-2"
        />
      ) : (
        <div className=" w-20 h-20 rounded-full bg-black mb-2  flex items-center justify-center text-white text-xs">
          {" "}
          no Image
        </div>
      )}
      <p className="text-sm font-semibold text-center line-clamp-1">{name}</p>
      <p className="text-xs text-gray-400 text-center line-clamp-1">{role}</p>
    </div>
  );
}
