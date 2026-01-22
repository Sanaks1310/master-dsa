import { Filter } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export type DifficultyLevel = 'all' | 'beginner' | 'intermediate' | 'advanced';

interface DifficultyFilterProps {
  value: DifficultyLevel;
  onChange: (value: DifficultyLevel) => void;
}

const DifficultyFilter = ({ value, onChange }: DifficultyFilterProps) => {
  return (
    <div className="flex items-center gap-2">
      <Filter className="w-4 h-4 text-muted-foreground" />
      <Select value={value} onValueChange={(val) => onChange(val as DifficultyLevel)}>
        <SelectTrigger className="w-[160px] bg-card border-border">
          <SelectValue placeholder="All Levels" />
        </SelectTrigger>
        <SelectContent className="bg-card border-border z-50">
          <SelectItem value="all">All Levels</SelectItem>
          <SelectItem value="beginner">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500" />
              Beginner
            </span>
          </SelectItem>
          <SelectItem value="intermediate">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-orange-500" />
              Intermediate
            </span>
          </SelectItem>
          <SelectItem value="advanced">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-pink-500" />
              Advanced
            </span>
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default DifficultyFilter;
