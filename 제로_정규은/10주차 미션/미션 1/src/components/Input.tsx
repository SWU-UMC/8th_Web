interface InputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export const Input = ({
  value,
  onChange,
  placeholder = "검색어를 입력하세요.",
  className = "",
}: InputProps) => {
  return (
    <input
      className={`w-full rounded-md p-2 border border-gray-300 shadow-sm
        focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400
        ${className}`}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};
