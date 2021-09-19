import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Therapist, TherapistDocument } from '~src/db';
import { CreateTherapistDto } from './dto/create-therapist.dto';
import { UpdateTherapistDto } from './dto/update-therapist.dto';

@Injectable()
export class TherapistService {
  constructor(
    @InjectModel('Therapist') private TherapistModel: Model<TherapistDocument>,
  ) {}
  async create(createTherapistDto: CreateTherapistDto): Promise<Therapist> {
    const therapist = new this.TherapistModel(createTherapistDto);
    therapist.save();

    return therapist;
  }

  async findAll(): Promise<Therapist[]> {
    const therapist = await this.TherapistModel.find();

    return therapist;
  }

  async findOne(slug: string): Promise<Therapist> {
    const therapist = await this.TherapistModel.findOne({ slug });

    if (!therapist) throw new NotFoundException('therapist not found');

    return therapist;
  }

  async update(
    slug: string,
    updateTherapistDto: UpdateTherapistDto,
  ): Promise<Therapist> {
    const therapist = await this.TherapistModel.findOne({ slug });

    if (!therapist) throw new NotFoundException('Not record found.');

    const updatedTherapist = await therapist.update(updateTherapistDto);

    return updatedTherapist;
  }

  async remove(id: number): Promise<Therapist> {
    return;
  }
}
