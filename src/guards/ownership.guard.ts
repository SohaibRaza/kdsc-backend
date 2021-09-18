import {
  Injectable,
  CanActivate,
  ExecutionContext,
  NotFoundException,
} from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import { Model } from "mongoose"
import { ChecklistDocument } from "~src/db"

@Injectable()
export class OwnershipGuard implements CanActivate {
  constructor(
    @InjectModel("Checklist") private ChecklistModel: Model<ChecklistDocument>
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest()

    const checklist = await this.ChecklistModel.findOne({
      slug: request.params?.slug,
    })

    if (!checklist) throw new NotFoundException("No Checklist Found")

    if (checklist.owner.toString() === request.auth.user?.id) {
      request.checklist = checklist
      return true
    }

    return false
  }
}
