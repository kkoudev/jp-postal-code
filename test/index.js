/**
 * @file jp postal code library.
 * @author Koichi Nagaoka
 */

define(['../lib/index.js'], function (postalCode) {

  // get address master test
  describe('getAddress', function () {

    // only number
    it('number', function (done) {

      postalCode('2130011', function (address) {

        expect('神奈川県', address.prefecture);
        expect('川崎市高津区', address.city);
        expect('久本', address.area);
        expect('', address.street);
        done();

      });

    });

    // hyphen and number
    it('hyphen_number', function (done) {

      postalCode('213-0011', function (address) {

        expect('神奈川県', address.prefecture);
        expect('川崎市高津区', address.city);
        expect('久本', address.area);
        expect('', address.street);
        done();

      });

    });

  });

});
