import {AppDetail} from './app-detail.model';
import {Application} from './application.model';

interface ApplicationWithDetails extends Application {
  details: AppDetail | null;
}