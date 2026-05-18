import { ClothingItem } from "../data/closet";
import ClothingIcon from "./ClothingIcon";

interface Props {
  item: ClothingItem;
  size?: "sm" | "md" | "lg";
}

const heightClass: Record<string, string> = {
  sm: "h-36",
  md: "h-44",
  lg: "h-64",
};

export default function ItemPhoto({ item, size = "md" }: Props) {
  const h = heightClass[size];
  return (
    <div
      className={`w-full ${h} flex items-center justify-center rounded-xl overflow-hidden p-4`}
      style={{
        background: `linear-gradient(145deg, ${item.color}28, ${item.color}10)`,
      }}
    >
      <ClothingIcon iconType={item.icon} color={item.color} />
    </div>
  );
}
