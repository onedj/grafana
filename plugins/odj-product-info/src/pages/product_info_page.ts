import { KeyValue } from '@grafana/data';

export class ProductInfoPageCtrl {
  static templateUrl = 'pages/product_info_page.html';

  static productUrl = '/public/odj/snapshot/products/ce/ratings/ratings.json';

  fooComponent: string;
  firstValues: KeyValue[] = [];

  //appEditCtrl: any;

  /** @ngInject */
  constructor($scope: any, $rootScope: any, private $http: any) {
    //this.appEditCtrl.setPostUpdateHook(this.postUpdate.bind(this));

    console.log('ProductInfoPageCtrl:', this);

    this.fooComponent = 'N/A';
  }

  /** @ngOnInit */
  ngOnInit() {
    this.fooComponent = 'NEW';
  }

  getProductInfo() {
    this.$http
      .get(ProductInfoPageCtrl.productUrl)
      .success()
      .error();
  }

  oldSchool() {
    fetch(ProductInfoPageCtrl.productUrl)
      .then(res => {
        //const jsonResponse = res.json();
        res.json().then(json => {
          console.log('Retrieved', json['name']);
          // $scope.fooComponent = json['name']
        });
        //const productInfo = JSON.parse(jsonResponse)
        //this.fooComponent = res.json().
      })
      .catch(error => {
        console.error('Unable to fetch', ProductInfoPageCtrl.productUrl);
      });
  }

  postUpdate() {
    this.fooComponent = 'updated';
  }
}
