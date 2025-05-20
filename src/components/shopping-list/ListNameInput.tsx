
import { Input } from "@/components/ui/input";

interface ListNameInputProps {
  value: string;
  onChange: (value: string) => void;
}

export default function ListNameInput({ value, onChange }: ListNameInputProps) {
  return (
    <div className="mb-6">
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="text-lg font-medium p-3 border-2 focus-visible:ring-feira-green"
        placeholder="Nome da lista"
      />
    </div>
  );
}
