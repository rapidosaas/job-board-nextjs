import { skillsList } from "@/lib/skills-input";
import { forwardRef, useMemo, useState, useEffect } from "react";
import { Input } from "./ui/input";
import { X } from "lucide-react";

interface LocationInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  onLocationSelected: (skills: string[]) => void;
  knownskills?: string[];
}

export default forwardRef<HTMLInputElement, LocationInputProps>(
  function SkillsInput({ onLocationSelected, knownskills = [],...props }, ref) {
    const [locationSearchInput, setLocationSearchInput] = useState("");
    const [hasFocus, setHasFocus] = useState(false);
    const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

    useEffect(() => {
      if (knownskills.length > 0) {
        setSelectedSkills(knownskills);
      }
    }, [knownskills]);

    const cities = useMemo(() => {
      if (!locationSearchInput.trim()) return [];

      const searchWords = locationSearchInput.split(" ");

      return skillsList
        .map((city: { value: string; description: string }) => `${city.value}`)
        .filter(
          (city: string) =>
            city.toLowerCase().startsWith(searchWords[0].toLowerCase()) &&
            searchWords.every((word) =>
              city.toLowerCase().includes(word.toLowerCase()),
            ),
        )
        .slice(0, 5);
    }, [locationSearchInput]);

    const handleSkillSelect = (skill: string) => {
      if (!selectedSkills.includes(skill)) {
        const updatedSkills = [...selectedSkills, skill];
        setSelectedSkills(updatedSkills);
        onLocationSelected(updatedSkills);
      }
      setLocationSearchInput("");
    };

    const handleSkillRemove = (skill: string) => {
      const updatedSkills = selectedSkills.filter((s) => s !== skill);
      setSelectedSkills(updatedSkills);
      onLocationSelected(updatedSkills);
    };

    return (
      <div className="relative">
        <Input
          placeholder="Search for a skill..."
          type="search"
          value={locationSearchInput}
          onChange={(e) => setLocationSearchInput(e.target.value)}
          onFocus={() => setHasFocus(true)}
          onBlur={() => setHasFocus(false)}
          {...props}
          ref={ref}
        />
        {locationSearchInput.trim() && hasFocus && (
          <div className="absolute z-20 w-full divide-y rounded-b-lg border-x border-b bg-background shadow-xl">
            {!cities.length && <p className="p-3">No results found.</p>}
            {cities.map((city) => (
              <button
                key={city}
                className="block w-full p-2 text-start"
                onMouseDown={(e) => {
                  e.preventDefault();
                  handleSkillSelect(city);
                }}
              >
                {city}
              </button>
            ))}
          </div>
        )}
        <div className="mt-2 flex flex-wrap gap-2">
          {selectedSkills.map((skill) => (
            <div key={skill} className="flex items-center gap-1 bg-gray-200 p-1 rounded">
              <span>{skill}</span>
              <button type="button" onClick={() => handleSkillRemove(skill)}>
                <X size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  },
);