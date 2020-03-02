// Angular pages
import { ProductInfoConfigCtrl } from './pages/config';
import { ProductInfoPageCtrl } from './pages/product_info';
import { AppPlugin } from '@grafana/data';
import { RootPage } from './RootPage';

// Legacy exports just for testing
export {
  ProductInfoConfigCtrl as ConfigCtrl,
  ProductInfoPageCtrl, // Must match `pages.component` in plugin.json
};

export interface ProductInfoAppSettings {}

export const plugin = new AppPlugin<ProductInfoAppSettings>().setRootPage(RootPage);
//.addConfigPage({
//  title: 'Page 1',
//  icon: 'fa fa-info',
//  body: ExamplePage1,
//  id: 'page1',
//})
