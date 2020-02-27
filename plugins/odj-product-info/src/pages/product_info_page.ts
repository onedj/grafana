import { KeyValue } from '@grafana/data';

export class ProductInfoPageCtrl {
  static templateUrl = 'legacy/angular_example_page.html';

  fooComponent: string;
  firstValues: KeyValue[] = [];

  /** @ngInject */
  constructor($scope: any, $rootScope: any) {
    console.log('ProductInfoPageCtrl:', this);

    this.fooComponent = 'bar';

    const product_url = '/public/odj/snapshot/products/ce/ratings/ratings.json';
    fetch(product_url)
      .then(res => {
        const json_response = res.json();
        console.info('Retrieved', json_response);
        // TODO JSON.parse()
      })
      .catch(error => {
        console.error('Unable to fetch', product_url);
      });
  }
}
