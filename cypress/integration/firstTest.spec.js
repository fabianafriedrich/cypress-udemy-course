/// <reference types="cypress" />

describe('Our first suite', () => {

    it('first test', () => {
        
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        cy.get('input')

        cy.get('#inputEmail1')

        cy.get('.input-full-width')

        cy.get('[placeholder]')

        cy.get('[placeholder="Email"]')

        cy.get('[class="input-full-width size-medium shape-rectangle"]')

        cy.get('input[placeholder="Email"]')

        cy.get('[placeholder="Email"][type="email"]')

        cy.get('input[placeholder="Email"]#inputEmail1.input-full-width')

        cy.get('[data-cy="imputEmail1"]')
    })

    it('second test', () => {
    
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        cy.get('.sidebar-toggle').click()

        cy.get('[data-cy="signInButton"]')
        
        cy.contains('Sign in')

        cy.contains('[status="warning"]', 'Sign in')

        cy.get('#inputEmail3')
            .parents('form')
            .find('button')
            .should('contain', 'Sign in')
            .parents('form')
            .find('nb-checkbox')
            .click()

        cy.contains('nb-card', 'Horizontal form').find('[type="email"]')

    })

    it('then and wrap methods', () => {
    
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()
        cy.get('.sidebar-toggle').click()

        // cy.contains('nb-card', 'Using the Grid')
        //     .find('[for="inputEmail1"]')
        //     .should('contain', 'Email')

        
        // cy.contains('nb-card', 'Using the Grid')
        //     .find('[for="inputPassword2"]')
        //     .should('contain', 'Password')


        // cy.contains('nb-card', 'Basic form')
        //     .find('[for="exampleInputEmail1"]')
        //     .should('contain', 'Email address')

        
        // cy.contains('nb-card', 'Basic form')
        //     .find('[for="exampleInputPassword1"]')
        //     .should('contain', 'Password')

        /**Cypress Style */

        cy.contains('nb-card', 'Using the Grid').then( firstForm => {
  
            const emailLabelFirst = firstForm.find('[for="inputEmail1"]').text()
            const passwordLabelFirst = firstForm.find('[for="inputPassword2"]').text()

            expect(emailLabelFirst).to.equal('Email')
            expect(passwordLabelFirst).to.equal('Password')

            cy.contains('nb-card', 'Basic form').then( secondForm => {

                const passwordLabelSecond = secondForm.find('[for="exampleInputPassword1"]').text()
                
                //JQuery Function
                expect(passwordLabelSecond).to.equal(passwordLabelFirst)
    
                //cypress
                cy.wrap(secondForm).find('[for="exampleInputPassword1"]').should('contain', 'Password')
            })

        })

        // cy.contains('nb-card', 'Basic form').then( secondForm => {
  
        //     const emailLabelSecond = secondForm.find('[for="exampleInputEmail1"]').text()
        //     const passwordLabelSecond = secondForm.find('[for="exampleInputPassword1"]').text()

        //     expect(emailLabelSecond).to.equal('Email address')
        //     expect(passwordLabelSecond).to.equal('Password')

        // })
    })

    it('invoke command', () => {
    
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()
        cy.get('.sidebar-toggle').click()

        //1
        cy.get('[for="exampleInputEmail1"').should('contain', 'Email address')
    
        //2
        cy.get('[for="exampleInputEmail1"]').then( label =>{
            expect(label.text()).to.equal('Email address')
        })

        //3
        cy.get('[for="exampleInputEmail1"]').invoke('text').then( text =>{
            expect(text).to.equal('Email address')
        })

        cy.contains('nb-card', 'Basic form')
            .find('nb-checkbox')
            .click()
            .find('.custom-checkbox')
            .invoke('attr', 'class')
            // .should('contain', 'checked')
            //or
            .then(classValue => {
                expect(classValue).to.contain('checked')
            })
    })

    it('assert property', () => {

        function selectDayFromCurrent(day){
            let date = new Date()
            date.setDate(date.getDate() + day)
            let futureDay = date.getDate()
            let futureMonth = date.toLocaleString('default', {month: 'short'})
            let dateAssert = futureMonth+' '+futureDay+', '+date.getFullYear()
            cy.get('nb-calendar-navigation').invoke('attr', 'ng-reflect-date').then( dateAttribute =>{
                if(!dateAttribute.includes(futureMonth)){
                    cy.get('[data-name="chevron-right"]').click()
                    selectDayFromCurrent(day)
                }else{
                    cy.get('nb-calendar-day-picker [class="day-cell ng-star-inserted"]').contains(futureDay).click()
                }
            })
            return dateAssert
        }
       
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Datepicker').click()
        cy.get('.sidebar-toggle').click()

        cy.contains('nb-card', 'Common Datepicker').find('input').then( input =>{
            cy.wrap(input).click()
            let dateAssert = selectDayFromCurrent(25)
           cy.wrap(input).invoke('prop', 'value').should('contains', dateAssert)
    
        })
    })

    it('radio button', () => {
    
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()
        cy.get('.sidebar-toggle').click()

        cy.contains('nb-card', 'Using the Grid').find('[type="radio"]').then( radionButtons =>{
            cy.wrap(radionButtons)
                .first()
                .check({force: true})
                .should('be.checked')

            cy.wrap(radionButtons)
                .eq(1)
                .check({force: true})
            
            cy.wrap(radionButtons)
                .first()
                .should('not.be.checked')

            cy.wrap(radionButtons)
                .eq(2)
                .should('be.disabled')

        })
    })

    it('check boxes', () => {
    
        cy.visit('/')
        cy.contains('Modal & Overlays').click()
        cy.contains('Toastr').click()
        cy.get('.sidebar-toggle').click()

        //this will check all the check boxes even if they are already checked
        // cy.get('[type="checkbox"]').check({force: true})
        
        //to uncheck we just need ti click it
        cy.get('[type="checkbox"]').eq(0).click({force: true})

        cy.get('[type="checkbox"]').eq(1).check({force: true})

    })

    it('list and dropdowns', () => {
    
        cy.visit('/')

        //1 Checking only one from the dropdown
        // cy.get('nav nb-select').click()
        // cy.get('.options-list').contains('Dark').click()
        // cy.get('nav nb-select').should('contain', 'Dark')
        // cy.get('nb-layout-header nav').should('have.css', 'background-color', 'rgb(34, 43, 69)')
    
        //2 Checking all options from dropdown doing a for each loop
        cy.get('nav nb-select').then( dropdown =>{
            cy.wrap(dropdown).click()
            cy.get('.options-list nb-option').each( (listItem, index )=> {
                const itemText = listItem.text().trim()
                const colors ={
                    "Light": "rgb(255, 255, 255)",
                    "Dark": "rgb(34, 43, 69)",
                    "Cosmic": "rgb(50, 50, 89)",
                    "Corporate": "rgb(255, 255, 255)"
                }

                cy.wrap(listItem).click()
                cy.wrap(dropdown).should('contain', itemText)
                cy.get('nb-layout-header nav').should('have.css', 'background-color', colors[itemText])
                if(index < 3){
                    cy.wrap(dropdown).click()
                }
            })
        })
    })

    it('check boxes', () => {
    
        cy.visit('/')
        cy.contains('Tables & Data').click()
        cy.contains('Smart Table').click()
        cy.get('.sidebar-toggle').click()

        //1
        cy.get('tbody').contains('tr', 'Larry').then( tableRow => {
            cy.wrap(tableRow).find('.nb-edit').click()
            cy.wrap(tableRow).find('[placeholder="Age"]').clear().type('25')
            cy.wrap(tableRow).find('.nb-checkmark').click()

            cy.wrap(tableRow).find('td').eq(6).should('contain', '25')

        })

        //2
        cy.get('thead').find('.nb-plus').click()
        cy.get('thead').find('tr').eq(2).then( tableRow =>{
            cy.wrap(tableRow).find('[placeholder="First Name"]').type('Artem')
            cy.wrap(tableRow).find('[placeholder="Last Name"]').type('Bondar')
            cy.wrap(tableRow).find('.nb-checkmark').click()
        })
        cy.get('tbody tr').first().find('td').then( tableColumns => {
            cy.wrap(tableColumns).eq(2).should('contain', 'Artem')
            cy.wrap(tableColumns).eq(3).should('contain', 'Bondar')

        })

        //3
        const age = [20 , 30 , 40, 200]
        cy.wrap(age).each( age =>{
            cy.get('thead [placeholder="Age"]').clear().type(age)
            cy.wait(500)
            cy.get('tbody tr').each( tableRow => {
                if(age == 200){
                    cy.wrap(tableRow).should('contain', 'No data found')
                }else{
                    cy.wrap(tableRow).find('td').eq(6).should('contain', age)
                }
            })

        })
    })

    it('tooltip', () => {
    
        cy.visit('/')
        cy.contains('Modal & Overlays').click()
        cy.contains('Tooltip').click()
        cy.get('.sidebar-toggle').click()

        cy.contains('nb-card', 'Colored Tooltips')
            .contains('Default').click()
        cy.get('nb-tooltip').should('contain', 'This is a tooltip')
    })

    it.only('dilog box', () => {
    
        cy.visit('/')
        cy.contains('Tables & Data').click()
        cy.contains('Smart Table').click()
        cy.get('.sidebar-toggle').click()

        //1 NOT THE BEST
        // cy.get('tbody tr').first().find('.nb-trash').click()
        // cy.on('window:confirm', (confirm) => {
        //     expect(confirm).to.equal('Are you sure you want to delete?')
        // })

        //2 Is the correct one because it will give the right assertion
        const stub = cy.stub()
        cy.on('window:confirm', stub)
        cy.get('tbody tr').first().find('.nb-trash').click().then(() => {
            expect(stub.getCall(0)).to.be.calledWith('Are you sure you want to delete?')
        })

        //not confirm 
        // cy.get('tbody tr').first().find('.nb-trash').click()
        // cy.on('window:confirm', () => false)


    })
})