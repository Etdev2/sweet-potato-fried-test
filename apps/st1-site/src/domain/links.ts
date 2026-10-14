export const REPO_URL = "https://github.com/Etdev2/sweet-potato-fried-test";

const BLOB_ROOT = `${REPO_URL}/blob/main/`;

/** Joins a folder and a relative path, resolving "." and ".." segments. */
function resolvePath(fromDir: string, relative: string): string {
  const parts = fromDir.split("/").filter((part) => part !== "");
  for (const part of relative.split("/")) {
    if (part === "..") {
      parts.pop();
    } else if (part !== "." && part !== "") {
      parts.push(part);
    }
  }
  return parts.join("/");
}

function isAbsolute(url: string): boolean {
  return /^[a-z][a-z0-9+.-]*:/i.test(url) || url.startsWith("#") || url.startsWith("/");
}

/**
 * Where a link written inside an ST-1 file should go on the site. Web links
 * stay as they are. A link to another repository file goes to that file on
 * GitHub, because the site does not republish every ST-1 file.
 */
export function repoLink(url: string, fromDir: string): string {
  return isAbsolute(url) ? url : `${BLOB_ROOT}${resolvePath(fromDir, url)}`;
}
