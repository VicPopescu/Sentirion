import { cp, readdir, rm, readFile } from "fs/promises";
import { existsSync } from "fs";
import { resolve, join } from "path";
import { createHash } from "crypto";

const source = resolve("node_modules/@beeq/core/dist/beeq/svg");
const target = resolve(process.cwd(), "public/icons/svg");

function isErrnoWithCode(err: unknown, code: string): boolean {
  return (
    typeof err === "object" &&
    err !== null &&
    "code" in err &&
    (err as { code?: unknown }).code === code
  );
}

async function safeUnlink(path: string) {
  try {
    await rm(path, { force: true });
  } catch (err: unknown) {
    if (!isErrnoWithCode(err, "ENOENT")) {
      throw err;
    }
  }
}

async function hashFile(filePath: string): Promise<string> {
  const buffer = await readFile(filePath);
  return createHash("sha256").update(buffer).digest("hex");
}

async function shouldCopy(
  sourceFile: string,
  targetFile: string
): Promise<boolean> {
  try {
    const [srcHash, tgtHash] = await Promise.all([
      hashFile(sourceFile),
      hashFile(targetFile),
    ]);
    return srcHash !== tgtHash;
  } catch {
    // Target file doesn't exist or is unreadable
    return true;
  }
}

export async function runCopyIcons({ silent = false, clean = false } = {}) {
  const start = performance.now();

  function log(msg: string) {
    if (!silent) console.log(msg);
  }

  if (clean) {
    if (existsSync(target)) {
      await rm(target, { recursive: true, force: true });
      log("🧹 Cleaned icons");
    } else {
      log("🧼 No icons to clean");
    }
    return;
  }

  if (!existsSync(source)) {
    log(`⚠️ Source icons not found at ${source}`);
    return;
  }

  log("🔍 Scanning icon directories...");

  const [srcFiles, dstFiles] = await Promise.all([
    readdir(source),
    existsSync(target) ? readdir(target) : [],
  ]);

  const srcSet = new Set(srcFiles);
  const stale = dstFiles.filter((f) => !srcSet.has(f));

  if (stale.length) {
    await Promise.all(stale.map((file) => safeUnlink(join(target, file))));
    log(`🗑 Removed ${stale.length} stale icons`);
  }

  let copiedCount = 0;

  await Promise.all(
    srcFiles.map(async (file) => {
      const srcPath = join(source, file);
      const tgtPath = join(target, file);

      if (await shouldCopy(srcPath, tgtPath)) {
        await cp(srcPath, tgtPath);
        copiedCount++;
      }
    })
  );

  const end = performance.now();
  const duration = (end - start).toFixed(1);
  log(`✅ Synced ${copiedCount} icons in ${duration} ms`);
}

// ESM entrypoint check
if (import.meta.url === `file://${process.argv[1]}`) {
  runCopyIcons().catch((err) => {
    console.error("Beeq: Icon sync failed", err);
    process.exit(1);
  });
}
