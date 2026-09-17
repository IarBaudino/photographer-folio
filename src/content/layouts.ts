export const WORK_LAYOUTS = [
  {
    id: "wide",
    label: "Horizontal ancha",
    span: "md:col-span-8",
    aspect: "aspect-[16/10]",
    className: "",
  },
  {
    id: "tall",
    label: "Vertical",
    span: "md:col-span-4",
    aspect: "aspect-[2/3]",
    className: "",
  },
  {
    id: "square",
    label: "Cuadrada",
    span: "md:col-span-5",
    aspect: "aspect-square",
    className: "",
  },
  {
    id: "medium",
    label: "Horizontal media",
    span: "md:col-span-6",
    aspect: "aspect-[16/10]",
    className: "",
  },
] as const;

export type WorkLayoutId = (typeof WORK_LAYOUTS)[number]["id"];

export function layoutFromWork(span: string, aspect: string) {
  return (
    WORK_LAYOUTS.find((layout) => layout.span === span && layout.aspect === aspect)
      ?.id ?? "wide"
  );
}
