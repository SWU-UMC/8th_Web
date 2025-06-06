import { memo, useState } from "react";
import { Input } from "./Input";
import LanguageSelector from "./LanguageSelector";
import { SelectBox } from "./SelectBox";
import { LANGUAGE_OPTIONS } from "../constants/movie";
import { MovieFilters, MovieLanguage } from "../types/movie";

interface MovieFilterProps {
  onChange: (filter: MovieFilters) => void;
}

const MovieFilter = ({ onChange }: MovieFilterProps) => {
  const [query, setQuery] = useState<string>("");
  const [includeAdult, setIncludeAdult] = useState<boolean>(false);
  const [language, setLanguage] = useState<MovieLanguage>("ko-KR");

  const handleSubmit = () => {
    const filters: MovieFilters = {
      query,
      include_adult: includeAdult,
      language,
    };
    console.log(filters);
    onChange(filters);
  };

  return (
    <div className="mb-10 transform space-y-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-xl transition-all hover:shadow-2xl">
      <div className="flex flex-wrap gap-6">
        <div className="min-w-[450px] flex-1">
          <label className="mb-2 block text-center text-sm font-medium text-gray-700">
            🎬 영화 제목
          </label>
          <Input value={query} onChange={setQuery} />
        </div>

        <div className="min-w-[250px] flex-1">
          <label className="mb-2 block text-center text-sm font-medium text-gray-700">
            ⚙️ 옵션
          </label>
          <SelectBox
            checked={includeAdult}
            onChange={setIncludeAdult}
            label="성인 콘텐츠 표시"
            id="include-adult"
            className="border border-gray-300 rounded-md p-3 shadow-sm"
          />
        </div>
      </div>

      <div className="min-w-[250px] w-full">
        <label className="mb-2 block text-center text-sm font-medium text-gray-700">
          🌐 언어
        </label>
        <LanguageSelector
          value={language}
          onChange={setLanguage}
          options={LANGUAGE_OPTIONS}
          className="w-full rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex justify-center pt-2">
        <button
          onClick={handleSubmit}
          className="w-full rounded bg-blue-600 px-6 py-2 text-white hover:bg-blue-700"
        >
          🔍 검색하기
        </button>
      </div>
    </div>
  );
};

export default memo(MovieFilter);
