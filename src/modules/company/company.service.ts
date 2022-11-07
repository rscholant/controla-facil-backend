import { DefaultCrudService } from '@helpers/default-crud-service';
import { Company } from '@modules/company/schemas/company.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class CompanyService extends DefaultCrudService<Company> {
  constructor(@InjectModel(Company.name) companyModel: Model<Company>) {
    super(companyModel, 'users');
  }
}
