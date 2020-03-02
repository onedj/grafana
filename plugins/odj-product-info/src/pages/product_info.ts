export class ProductInfoPageCtrl {
  static templateUrl = 'pages/product_info.html';

  pageInfo: string;

  /** @ngInject */
  constructor($scope: any, $rootScope: any) {
    //this.appEditCtrl.setPostUpdateHook(this.postUpdate.bind(this));

    console.log('ProductInfoPageCtrl:', this);

    this.pageInfo = 'ODJ Product';
  }
}
