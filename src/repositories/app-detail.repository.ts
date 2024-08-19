import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {AppDetail, AppDetailRelations} from '../models';

export class AppDetailRepository extends DefaultCrudRepository<
  AppDetail,
  typeof AppDetail.prototype._id,
  AppDetailRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(AppDetail, dataSource);
  }
}
