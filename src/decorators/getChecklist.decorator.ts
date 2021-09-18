import { createParamDecorator, ExecutionContext } from "@nestjs/common"

export const GetChecklist = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest()
    return request.checklist
  }
)
