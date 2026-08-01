const fs = require("fs")
const path = require("path")

/**
 * React's SSR stream occasionally emits a stray NUL byte at a chunk boundary
 * that lands inside a multi-byte UTF-8 character. It corrupts the rendered
 * text (e.g. "místopředseda" -> "místop\0ředseda") and makes the file serve as
 * binary data rather than HTML. Strip those bytes from the generated pages.
 */
exports.onPostBuild = ({ reporter }) => {
  const publicDir = path.join(__dirname, "public")
  const cleaned = []

  const walk = dir => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name)
      if (entry.isDirectory()) {
        walk(full)
      } else if (entry.name.endsWith(".html")) {
        const buf = fs.readFileSync(full)
        if (buf.includes(0)) {
          fs.writeFileSync(full, Buffer.from(buf.filter(byte => byte !== 0)))
          cleaned.push(path.relative(publicDir, full))
        }
      }
    }
  }

  walk(publicDir)

  if (cleaned.length) {
    reporter.warn(
      `Stripped stray NUL bytes from ${cleaned.length} HTML file(s): ${cleaned.join(", ")}`
    )
  }
}
