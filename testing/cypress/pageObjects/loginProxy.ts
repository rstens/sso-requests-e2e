class LoginProxy {
  path: string = '/';

  idirButton: string = '#social-idir';
  azidirButton: string = '#social-azureidir';
  headerWrapper: string = '#kc-header-wrapper';
  headerText: string = 'Common Hosted Single Sign-on';

  checkLoginProxyPage() {
    cy.get(this.headerWrapper).contains(this.headerText).should('be.visible');
  }

  chooseIdir() {
    cy.get(this.idirButton).click();
  }

  chooseAzIdir() {
    cy.get(this.azidirButton).click();
  }
}

export default LoginProxy;
