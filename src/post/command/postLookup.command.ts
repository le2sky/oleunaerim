import { ICommand } from '@nestjs/cqrs';
import { ILookupQueryOption } from '../controller/post.controller';

export class PostLookupCommand implements ICommand {
  limit: number;
  type: string;

  constructor(query: ILookupQueryOption) {
    let { type = 'normal', limit = 'all' } = query;
    if (!isNaN(Number(limit))) {
      limit = Number(limit) < 1 || 100000 < Number(limit) ? 100000 : Number(limit);
    } else {
      limit = 100000;
    }
    this.limit = limit;

    switch (type.toLowerCase().trim()) {
      case 'imminent':
        this.type = 'imminent';
      case 'open':
        this.type = 'open';
        break;
      default:
        this.type = 'normal';
        break;
    }
  }
}
