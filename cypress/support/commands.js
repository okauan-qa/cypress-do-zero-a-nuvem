Cypress.Commands.add('fillMandatoryFieldsAndSubmit', () =>{
    const longText = Cypress._.repeat('Comando de teste ', 5)
    cy.get('#firstName').type('Kauan')
    cy.get('#lastName').type('Brito')
    cy.get('#email').type('kauan.brito@gmail.com')
    cy.get('#open-text-area').type(longText, {delay:0})
    cy.get('button').click()
})

Cypress.Commands.add('fillMandatoryFieldsWithPhoneAndSubmit', (data) =>{
    const longText = Cypress._.repeat(data.text, 10)

    cy.get('#firstName').type(data.firstName)
    cy.get('#lastName').type(data.lastName)
    cy.get('#phone-checkbox').click()
    cy.get('#email').type(data.email)
    cy.get('#phone').type(data.phone)
    cy.get('#open-text-area').type(longText, {delay:5})
    cy.contains('button','Enviar').click()
})

