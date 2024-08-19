import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

/*const config = {
  name: 'db',
  connector: 'mongodb',
  // url: '',
  url: 'mongodb+srv://HeyrexMg:Cacahuat3@clusteryhmy.lrpbm.mongodb.net/MyLocalApps?retryWrites=true&w=majority&appName=ClusterYHMY',
  host: null,
  port: null,
  user: null,
  password: null,
  database: 'MyLocalApps',
  useNewUrlParser: true
};*/

const config = {
  name: 'db',
  connector: 'mongodb',
  host: 'clusteryhmy.lrpbm.mongodb.net',
  user: 'HeyrexMg',
  password: 'Cacahuat3',
  database: 'MyLocalApps',
  protocol: 'mongodb+srv',
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class DbDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'db';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.db', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
