import { StaticImageData } from "next/image";

import avatar1 from "@/assets/avatar-1.png";
import avatar2 from "@/assets/avatar-2.png";
import avatar3 from "@/assets/avatar-3.png";

export interface Avatar {
  name: string;
  source: string;
  image: StaticImageData;
}

export const avatars: Avatar[] = [
  { name: "Avatar 1", source: "avatar-1.png", image: avatar1 },
  { name: "Avatar 2", source: "avatar-2.png", image: avatar2 },
  { name: "Avatar 3", source: "avatar-3.png", image: avatar3 },
];