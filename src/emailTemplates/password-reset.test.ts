import PasswordReset from "./password-reset"

describe("email-templates/password-reset", () => {
  test("returns html and subject", () => {
    expect(PasswordReset.content()).toContain(
      "password has been successfully reset!"
    )
    expect(PasswordReset.subject).toBe("Password successfully reset")
  })
})
