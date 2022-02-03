/// <reference types="cypress" />

import { BASE_URL } from "../../constants/urls"
import { testConfig } from "../../fixtures/test-data";

context('Admin Flow', () => {
    beforeEach(() => {
        cy.visit(BASE_URL)
    })

    it('Should able to login and do his operation', () => {
        cy.get('[data-test-id="login-page"')
            .find('[data-test-id="login-page-title"]')
            .should('have.text', 'Enter token below for login.');


        cy.get('[data-test-id="login-page-token-input"]')
            .type(testConfig.adminLoginToken);

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
            .should('be.visible')

        cy.intercept('GET', 'http://localhost:3001/report/getuserReport').as('getuserReport');

        cy.get('[data-test-id="menu-view-report"]')
            .click();

        cy.wait('@getuserReport');

        cy.get('[data-test-id="report-page-admin-section"]')
            .should('be.visible')

        cy.get('[data-test-id="report-page-title"]')
            .contains('Your last 7 days calorie consumption report');

        cy.wait(1000);

        cy.get('[data-test-id="report-page-admin-report"]')
            .click();

        cy.get('canvas')
            .should(($canvas) => {
                expect($canvas).to.have.length(2);
            });

        cy.get('[data-test-id="menu-manage-food-entries"]')
            .click();

        cy.get('[data-test-id="manageFoodEntryPage-add-new-food-entry" ]')
            .click();

        cy.wait(1000);
        const { adminNewAdd } = testConfig;
        cy.get('[data-test-id="input-form-foodname"]')
            .type(adminNewAdd.foodName);
        cy.get('[data-test-id="input-form-consumedqty"]')
            .type(adminNewAdd.qty);
        cy.get('[data-test-id="input-form-consumedcalories"]')
            .type(adminNewAdd.calories);
        cy.get('[data-test-id="input-form-servingunit"]')
            .type(adminNewAdd.unit);
        cy.get('[data-test-id="input-form-consumedweightgrams"]')
            .type(adminNewAdd.weightGrams);
        cy.get('[data-test-id="input-form-imageurl"')
            .type(adminNewAdd.imgUrl);
        cy.get('[data-test-id="input-form-userid"]')
            .type(adminNewAdd.userId);

        cy.wait(500);

        cy.intercept('POST', 'http://localhost:3001/tracker/addOtherUserFoodEntry').as('saveFood');

        cy.get('[data-test-id="input-form-submit-bt"]')
            .click();
        
        cy.wait('@saveFood');
        
        cy.contains('p',adminNewAdd.foodName);

        cy.get('[data-test-id="menu-sign-out"]')
            .click();

        cy.get('[data-test-id="login-page"')
            .find('[data-test-id="login-page-title"]')
            .should('have.text', 'Enter token below for login.');
    });

})
