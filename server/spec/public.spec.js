var Request = require('request');
var database = require('./database.js');

let url = 'http://localhost:3000/';

describe('Public', () => {
  
  beforeAll((done) => {
    database.fill(done);
  });
  afterAll((done) => {
    database.dump(done);
  });

  describe('Server', () => {
    
    let data = {};
    beforeAll((done) => {
      Request({
        method: 'GET',
        uri: url+'api/',
        json: true
      }, (error, response, body) => {
        data.status = response.statusCode;
        data.body = body;
        done();
      });
    });

    it('online', () => {
      expect(data.status).toBe(200);
    });
   });

  // > SNACKS

  // >> test get all snacks
  describe('All snacks', () => {
    let data = {};
    beforeAll((done) => {
      Request({
        method: 'GET',
        uri: url+'api/snacks',
        json: true
      }, (error, response, body) => {
        data.status = response.statusCode;
        data.body = body;
        done();
      });
    });

    it('count', () => {
      expect(data.body.length).toBe(6);
    });

    it('usage sorting', () => {
      expect(data.body[0].name).toBe('Kipknots');
    });

    it('usage sorting default', () => {
      expect(data.body[5].name).toBe('Speciaal');
    });
  });

  // >> test get specific snack
  describe('Get snack', () => {
    let data = {};
    beforeAll((done) => {
      Request({
        method: 'GET',
        uri: url+'api/snacks/5a25ac5d0feeef4258064d19',
        json: true
      }, (error, response, body) => {
        data.status = response.statusCode;
        data.body = body;
        done();
      });
    });

    it('data', () => {
      expect(data.body.name).toBe('Kaaskroket');
      expect(data.body.type).toBe('Snacks');
      expect(data.body.vegi).toBe(true);
    });
  });

  // >> test get all types
  describe('Get snack', () => {
    let data = {};
    beforeAll((done) => {
      Request({
        method: 'GET',
        uri: url+'api/snacks/types',
        json: true
      }, (error, response, body) => {
        data.status = response.statusCode;
        data.body = body;
        done();
      });
    });

    it('types', () => {
      expect(data.body).toContain('Snacks');
      expect(data.body).toContain('Burgers');
      expect(data.body).toContain('Andere');
    });
  });

  // >> test snack usage counter
  describe('Use snack', () => {
    let data = {};
    beforeAll((done) => {
      Request({
        method: 'POST',
        uri: url+'api/snacks/5a25ac5d0feeef4258064d1a',
        data: {},
        json: true
      }, (error, response, body) => {
        data.status = response.statusCode;
        data.body = body;
        done();
      });
    });

    describe('', () => {

      beforeAll((done) => {
        Request({
          method: 'GET',
          uri: url+'api/snacks/5a25ac5d0feeef4258064d1a',
          json: true
        }, (error, response, body) => {
          data.status = response.statusCode;
          data.body = body;
          done();
        });
      });

      it('increased', () => {
        expect(data.body.usage).toBe(4);
      });
    });
  });


  // > SHOPS

  // >> test get all shops
  describe('All shops', () => {
    let data = {};
    beforeAll((done) => {
      Request({
        method: 'GET',
        uri: url+'api/shops',
        json: true
      }, (error, response, body) => {
        data.status = response.statusCode;
        data.body = body;
        done();
      });
    });

    it('count', () => {
      expect(data.body.length).toBe(3);
    });
  });

  // >> test get specific shop
  describe('Get shop', () => {
    let data = {};
    beforeAll((done) => {
      Request({
        method: 'GET',
        uri: url+'api/shops/5a25ac5d0feeef4258064d1f',
        json: true
      }, (error, response, body) => {
        data.status = response.statusCode;
        data.body = body;
        done();
      });
    });

    it('data', () => {
      expect(data.body.name).toBe('De Punt');
      expect(data.body.municipality).toBe('Merelbeke');
      expect(data.body.lat).toBe(6.5816);
      expect(data.body.snacks.length).toBe(3);
    });
  });

  // >> test get shops based on snack
  describe('All shops by snacks', () => {
    let data = {};
    beforeAll((done) => {
      Request({
        method: 'POST',
        uri: url+'api/shops',
        json: { snacks: JSON.stringify(["5a25ac5d0feeef4258064d1c"]) }
      }, (error, response, body) => {
        data.status = response.statusCode;
        data.body = body;
        done();
      });
    });

    it('count', () => {
      expect(data.body.length).toBe(1);
      expect(data.body[0].name).toBe('Frietshop');
    });
  });

})
