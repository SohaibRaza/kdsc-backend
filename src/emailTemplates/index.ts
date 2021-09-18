import forgotPassword from "./forgot-password"
import passwordReset from "./password-reset"
import newRun from "./new-run"

const templates = {
  forgotPassword,
  passwordReset,
  newRun,
}

export { templates }
export { default as layout } from "./layout"
export type Template = keyof typeof templates
