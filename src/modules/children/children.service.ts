import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Children, ChildrenDocument } from '~src/db';
import { CreateChildDto } from './dto/create-child.dto';
import { UpdateChildDto } from './dto/update-child.dto';

@Injectable()
export class ChildrenService {
  constructor(
    @InjectModel('Children') private ChildModel: Model<ChildrenDocument>,
  ) {}

  async create(createChildDto: CreateChildDto): Promise<Children> {
    const child = new this.ChildModel(createChildDto);
    child.save();

    return child;
  }

  async findAll(): Promise<Children[]> {
    const children = await this.ChildModel.find();

    return children;
  }

  async findOne(slug: string): Promise<Children> {
    const child = await this.ChildModel.findOne({ slug });

    if (!child) throw new NotFoundException('child not found');

    return child;
  }

  async update(
    slug: string,
    updateChildDto: UpdateChildDto,
  ): Promise<Children> {
    return;
  }

  async remove(slug: string): Promise<Children> {
    return;
  }
}
