export function slugify(value: string) {
  const slug = value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return slug || `item-${Date.now()}`;
}

export function uniqueSlug(base: string, taken: string[]) {
  const root = slugify(base);
  if (!taken.includes(root)) return root;

  let index = 2;
  while (taken.includes(`${root}-${index}`)) index += 1;
  return `${root}-${index}`;
}
