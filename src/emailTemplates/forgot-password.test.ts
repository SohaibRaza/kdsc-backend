import ForgotPassword from "./forgot-password"

describe("email-templates/forgot-password", () => {
  test("returns html and subject", () => {
    const data = { resetPasswordUrl: "https://google.com" }
    expect(ForgotPassword.content(data)).toContain("https://google.com")
    expect(ForgotPassword.subject).toBe("Reset your password")
  })
})
