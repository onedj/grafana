// Angular pages
import { ExampleConfigCtrl } from './pages/config';
import { ProductInfoPageCtrl } from './pages/product_info_page';
import { AppPlugin } from '@grafana/data';
import { ExamplePage1 } from './config/ExamplePage1';
import { ExamplePage2 } from './config/ExamplePage2';
import { RootPage } from './RootPage';
import { ExampleAppSettings } from './types';

// Legacy exports just for testing
export {
  ExampleConfigCtrl as ConfigCtrl,
  ProductInfoPageCtrl, // Must match `pages.component` in plugin.json
};

export const plugin = new AppPlugin<ExampleAppSettings>()
  .setRootPage(RootPage)
  .addConfigPage({
    title: 'Page 1',
    icon: 'fa fa-info',
    body: ExamplePage1,
    id: 'page1',
  })
  .addConfigPage({
    title: 'Page 2',
    icon: 'fa fa-user',
    body: ExamplePage2,
    id: 'page2',
  });
