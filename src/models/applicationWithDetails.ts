import {AppDetail} from './app-detail.model';
import {Application} from './application.model';

export class ApplicationWithDetails extends Application {
  details: AppDetail | null;
}