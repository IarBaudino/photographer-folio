import { cn } from "@/lib/cn";

const paths = {
  mail: "M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2Zm0 4-8 5-8-5V6l8 5 8-5v2Z",
  arrow_downward: "M11 4v12.17l-4.59-4.58L5 13l7 7 7-7-1.41-1.41L13 16.17V4h-2Z",
  menu: "M3 6h18v2H3V6Zm0 5h18v2H3v-2Zm0 5h18v2H3v-2Z",
  close: "M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41Z",
} as const;

type MaterialIconProps = {
  name: keyof typeof paths;
  className?: string;
};

export function MaterialIcon({ name, className }: MaterialIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden
      className={cn("inline-block size-[1em] fill-current", className)}
    >
      <path d={paths[name]} />
    </svg>
  );
}
