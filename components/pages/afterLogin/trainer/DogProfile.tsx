import Image from "next/image";
import { DogIcon } from "@/components/icons/dog";
import type { IDogStatsResponse } from "@/types/trainer/trainerUserType";

interface DogProfileProps {
  dog: IDogStatsResponse["dog"];
}

export function DogProfile({ dog }: DogProfileProps) {
  return (
    <div className="flex flex-col items-center gap-2">
      {dog.profileImage && dog.profileImage.trim() ? (
        <div className="relative size-30 rounded-full overflow-hidden">
          <Image
            src={dog.profileImage}
            alt={dog.name}
            fill
            sizes="120px"
            className="object-cover"
            priority
            unoptimized
          />
        </div>
      ) : (
        <div
          className="flex items-center justify-center relative size-30 rounded-full overflow-hidden"
          style={{
            backgroundColor: `hsl(${(dog.dogId * 137.5) % 360}, 70%, 80%)`,
          }}
        >
          <DogIcon className="size-16 text-white" />
        </div>
      )}
      <h2 className="font-bold text-2xl text-(--mt-black)">{dog.name}</h2>
    </div>
  );
}
