// Update of Integration request variants

import data from '../fixtures/requests-rolesafter.json'; // The data file will drive the tests
import Request from '../appActions/Request';
let testData = data;

describe('Integration Requests Roles', () => {
  beforeEach(() => {
    cy.setid(null).then(() => {
      cy.login(null, null, null, null);
    });
  });

  afterEach(() => {
    cy.logout(null);
  });

  // Remove Roles
  testData.forEach((value, index) => {
    it(`Remove Roles ${value.id}: ${value.create.projectname}`, () => {
      let req = new Request();
      req.populateCreateContent(value);
      req.showCreateContent(value);
      req.removeRoles();
      req = null;
    });
  });
});
