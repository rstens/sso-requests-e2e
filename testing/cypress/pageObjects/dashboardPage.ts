class DashboardPage {
  path: string = '/admin-dashboard';
  confirmDigitalCredentialButton: string = '[data-testid="confirm-delete-digital-credential-approve"]';
  confirmBceidButton: string = '[data-testid="confirm-delete-bceid-approve"]';
  confirmGithubButton: string = '[data-testid="confirm-delete-github-approve"]';

  selectRequest(name: string) {
    cy.contains('td', name, { timeout: 10000 }).parent().click();
  }
}

export default DashboardPage;
