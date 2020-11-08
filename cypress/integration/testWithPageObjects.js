import { navigateTo } from "../support/page_objects/navigationPage"
import { onFormLayoutsPage } from "../support/page_objects/formLayoutsPage"
import { onDatepickerPage } from "../support/page_objects/datepickerPage"
import { onSmartTablePage } from "../support/page_objects/smartTablePage"


describe('Test with Psge Objects', () =>{

    beforeEach('open application', () =>{
        cy.openHomePage()
    })

    it('verify navigation across the pages', () => {
        navigateTo.formLayoutsPage()
        navigateTo.datepickerPage()
        navigateTo.smartTablePage()
        navigateTo.tooltipPage()
        navigateTo.toasterPage()
    })

    it.only('should submit Inline and Basic forms and select tomorrow date in calendar', () => {

        navigateTo.formLayoutsPage()
        cy.get('.sidebar-toggle').click()
        onFormLayoutsPage.submitInlineFormWithNameAndEmail('Fabiana', 'bia@gmail.com')
        onFormLayoutsPage.submitBasicFormWithNameAndEmail('bia@gmail.com', '12345')
        cy.get('.sidebar-toggle').click()
        navigateTo.datepickerPage()
        onDatepickerPage.selectCommonDatepickerDateFromToday(1)
        onDatepickerPage.selectDatepickerWithRangeFromToday(7, 14)
        navigateTo.smartTablePage()
        cy.get('.sidebar-toggle').click()
        onSmartTablePage.addNewRecordWithFirstAndLastName('Fabiana', 'Friedrich')
        onSmartTablePage.updateAgeByFirstName('Fabiana', '23')
        onSmartTablePage.deleteRowByIndex(1)
    })

})