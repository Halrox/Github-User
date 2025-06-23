
import '../css/components/SearchBar.css';

type Props = {
  value: string;
  onChange: (val: string) => void;
};

export default function SearchBar({ value, onChange }: Props) 
{
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search GitHub users..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
