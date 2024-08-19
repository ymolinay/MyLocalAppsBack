import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Application, ApplicationRelations} from '../models';

export class ApplicationRepository extends DefaultCrudRepository<
  Application,
  typeof Application.prototype._id,
  ApplicationRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Application, dataSource);
  }
}
