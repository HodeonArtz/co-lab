import { backendPath } from "./paths";

export async function getFile(filename: string): Promise<string> {
  const res = await fetch(
    `${backendPath}/files/${encodeURIComponent(filename)}`
  );

  if (!res.ok) {
    throw new Error(`Error ${res.status}: ${res.statusText}`);
  }

  const blob = await res.blob(); // 2⃣
  const url = URL.createObjectURL(blob); // 3⃣
  return url;
}
