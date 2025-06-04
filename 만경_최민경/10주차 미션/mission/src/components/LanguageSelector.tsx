import { MovieLanguage } from "../types/movie";

interface LanguageOption{
    value: string;
    label: string;
}

interface LanguageSelectorProps{
    value: string;
    onChange: (value: MovieLanguage)=> void;
    options: LanguageOption[];
    className?: string;

}

const LanguageSelector = ({
    value,
    onChange,
    options,
    className="",
    }: LanguageSelectorProps) => {
    return ( 
    <select  
    value={value}
    onChange={(e)=> onChange(e.target.value as MovieLanguage)} 
    className={
            `w-full rounded-md border p-4 border-gray-300 shadow-sm 
            focus:border-blue-500 focus:ring-blue-500 ${className}`}>
        {options.map((option)=>(
            <option key={option.value} value={option.value}>
                {option.label}
            </option>
        ))}
    </select>
    )}


export default LanguageSelector