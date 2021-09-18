import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { Children } from '~src/db/children';
import { ChildrenService } from './children.service';
import { CreateChildDto } from './dto/create-child.dto';
import { UpdateChildDto } from './dto/update-child.dto';

@Controller('children')
export class ChildrenController {
  constructor(private readonly childrenService: ChildrenService) {}

  @Post()
  async create(@Body() createChildDto: CreateChildDto): Promise<Children> {
    return await this.childrenService.create(createChildDto);
  }

  @Get()
  async findAll() {
    return await this.childrenService.findAll();
  }

  @Get(':slug')
  async findOne(@Param('slug') slug: string) {
    return await this.childrenService.findOne(slug);
  }

  @Patch(':slug')
  async update(
    @Param('slug') slug: string,
    @Body() updateChildDto: UpdateChildDto,
  ) {
    return await this.childrenService.update(slug, updateChildDto);
  }

  @Delete(':slug')
  async remove(@Param('slug') slug: string) {
    return await this.childrenService.remove(slug);
  }
}
