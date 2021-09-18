import newRun from "./new-run"

describe("email-templates/new-run", () => {
  test("should return new Run Email Subject", () => {
    expect(newRun.subject({ checklistName: "Test Run" })).toBe("Due: Test Run")
  })

  test("should return new Run Email Content", () => {
    expect(
      newRun.content({ checklistName: "Test Run", runUrl: "www.google.com" })
    ).toMatchSnapshot()
  })
})
