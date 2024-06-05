// Creation of Integration request variants

import data from '../fixtures/requests.json'; // The data file will drive the tests
import Request from '../appActions/Request';
import Utilities from '../appActions/Utilities';
import DashboardPage from 'cypress/pageObjects/dashboardPage';
let testData = data;
let util = new Utilities();
const dashboardPage = new DashboardPage();

describe('Create Integration Requests', () => {
  const requests: Request[] = [];

  beforeEach(() => {
    cy.clearAllCookies();
  });

  const cleanup = () => {
    cy.clearAllCookies();
    cy.setid(null).then(() => {
      cy.login(null, null, null, null);
    });
    requests.forEach((request) => {
      request.deleteRequest(request.id);
      request.deleteTeam();
    });
  };

  afterEach(() => {
    cy.logout(null);
  });

  after(() => {
    cleanup();
  });

  // Iterate through the JSON file and create a team for each entry
  // The set up below allows for reporting on each test case
  testData.forEach((data, index) => {
    if (util.runOk(data)) {
      let req = new Request();
      requests.push(req);
      let creation: Cypress.Chainable;

      it(`Create ${data.create.projectname} (Test ID: ${data.create.test_id}) - ${data.create.description}`, () => {
        cy.setid(null).then(() => {
          cy.login(null, null, null, null);
        });
        req.showCreateContent(data);
        req.populateCreateContent(data);
        creation = req.createRequest();
      });

      it(`Validate creation of ${data.create.projectname}`, () => {
        // Ensure async cypress operations (e.g setting the id) are complete
        // Before attempting validation.
        creation.then(() => {
          cy.setid(null).then(() => {
            cy.login(null, null, null, null);
          });
          req.validateRequest(req.id);
        });
      });

      it('Approves the required idps', () => {
        if (data.approvals) {
          cy.setid('admin').then(() => {
            cy.login(null, null, null, null);
          });

          cy.log(String(data.approvals.digitalCredential), JSON.stringify(data.approvals));

          if (data.approvals.digitalCredential) {
            req.approveRequest('Digital Credential', dashboardPage.confirmDigitalCredentialButton);
          }

          if (data.approvals.bceid) {
            req.approveRequest('BCeID', dashboardPage.confirmBceidButton);
          }

          if (data.approvals.github) {
            req.approveRequest('GitHub', dashboardPage.confirmGithubButton);
          }
        }
      });

      it(`Update ${data.create.projectname}`, () => {
        cy.setid(null).then(() => {
          cy.login(null, null, null, null);
        });
        req.populateUpdateContent(data);
        req.updateRequest(req.id);
      });

      it(`Validate update of ${data.create.projectname}`, () => {
        cy.setid(null).then(() => {
          cy.login(null, null, null, null);
        });
        req.populateUpdateValidationContent(data);
        req.validateRequest(req.id);
      });
    }
  });
});
