import layout from "./layout"

describe("email-templates/layout", () => {
  test("returns layout html with content part in it", () => {
    const content = "Hello there!"
    const opts = {
      ORIGIN: "https://google.com",
    }
    const result = layout(content, opts)
    expect(result).toContain(content)
    expect(result).toContain(opts.ORIGIN)
  })
})
