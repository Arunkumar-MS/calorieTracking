/// <reference types="cypress" />

import { BASE_URL } from "../../constants/urls"
import { testConfig } from "../../fixtures/test-data";
import getUnixTime from 'date-fns/getUnixTime';

context('User Flow', () => {
  let userName = '';
  beforeEach(() => {
    userName = `userName_${getUnixTime(new Date())}`;
    cy.visit(BASE_URL)
  })

  it('Should able to login and do his operation', () => {
    cy.get('[data-test-id="login-page"')
      .find('[data-test-id="login-page-title"]')
      .should('have.text', 'Enter token below for login.');


    cy.get('[data-test-id="login-page-token-input"]')
      .type(testConfig.userLoginToken);

    cy.get('[data-test-id="login-page-submit"]')
      .click();

    cy.get('[data-test-id="home-page-add-item-card"]')
      .click();

    cy.get('[data-test-id="home-page-add-item-modal-input"]')
      .type(testConfig.searchTerm);

    cy.wait(2000);

    cy.get('[data-test-id="home-page-suggesion-list"]')
      .first()
      .first()
      .first()
      .click();
    cy.wait(3000);
    let text = '';
    cy.get('[data-test-id="suggesion-food-modal-selected-food-name"]').then(($div) => {
      text = $div.text();

      cy.wait(1000);

      cy.get('[data-test-id="suggesion-food-modal-add-button"]')
        .click();

      cy.contains('p', text);
    });

    cy.get('[data-test-id="menu-manage-food-entries"]')
      .should('not.exist')

    cy.get('[data-test-id="menu-view-report"]')
      .click();

    cy.get('[data-test-id="report-page-admin-section"]')
      .should('not.exist')

    cy.get('[data-test-id="report-page-title"]')
      .contains('Your last 7 days calorie consumption report');
    cy.get('canvas')
      .should(($canvas) => {
        expect($canvas).to.have.length(1);
      });

    cy.get('[data-test-id="menu-invite-friend"]')
      .click();

    cy.get('[data-test-id="invite-friend-page-name"]')
      .type(userName);

    cy.get('[data-test-id="invite-friend-page-email"]')
      .type(`${userName}@xyz.com`);


    cy.get('[data-test-id="invite-friend-page-btc"]')
      .click();
    cy.wait(1000);


    cy.get('[data-test-id="invite-friend-page-token"]')
      .then(($div) => {
        const text = $div.text();

        cy.wait(1000);

        cy.get('[data-test-id="menu-sign-out"]')
          .click();

        cy.get('[data-test-id="login-page"')
          .find('[data-test-id="login-page-title"]')
          .should('have.text', 'Enter token below for login.');

        cy.get('[data-test-id="login-page-token-input"]')
          .type(text);

        cy.get('[data-test-id="login-page-submit"]')
          .click();
      });

    cy.get('[data-test-id="menu-sign-out"]')
      .click();
  });
})
