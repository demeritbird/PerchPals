import { Query } from 'mongoose';

// FIXME: clean up 'any' types
// TODO: Documentation
// NOTE: 'Query<any[], any, {}, any>' might need to be 'any'

class APIFeatures {
  constructor(
    private query: Query<unknown, unknown, {}, unknown>,
    private readonly queryString: Record<string, string>
  ) {
    this.query = query;
    this.queryString = queryString;
  }

  // Filtering
  filter(): this {
    const queryObj: Record<string, string> = { ...this.queryString };
    const excludedFields: Array<string> = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach((el: string) => delete queryObj[el]);

    let queryStr: string = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match: string) => `$${match}`);

    this.query = this.query.find(JSON.parse(queryStr));

    return this;
  }

  // Sorting
  sort(): this {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(',').join(` `);
      this.query = this.query.sort(sortBy);
    }

    return this;
  }

  // Limiting Fields
  limitFields(): this {
    if (this.queryString.fields) {
      const fields: string = this.queryString.fields.split(',').join(` `);
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select('-__v');
    }

    return this;
  }

  // Pagination
  paginate(): this {
    const page: number = +this.queryString.page || 1;
    const limit: number = +this.queryString.limit || 100;
    const skip: number = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);

    return this;
  }
}

module.exports = APIFeatures;
