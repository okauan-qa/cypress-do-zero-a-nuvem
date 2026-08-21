describe('Central de Atendimento ao Cliente TAT', () => {
  beforeEach(() => {
    cy.visit('./src/index.html') //Evita que fique repetindo o código antes de cada teste
    //cy.get('#firstName').clear()
    //cy.get('#lastName').clear()
    //cy.get('#email').clear()
    //cy.get('#phone').clear()
    //cy.get('#open-text-area').clear()
    })
  it('verifica o título da aplicação', () => {
    const longText = Cypress._.repeat('Teste ', 15) // Cypress._.repeat('O que o texto vai digitar', A quantidade de vezes que será digitado). No caso vai digitar 'Teste', 10 vezes
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')

    cy.get('#firstName').type('Hello World', {delay: 5})
    cy.get('#lastName').type('Hello World', {delay:0})
    cy.get('#email').type('error@gmail.com', {delay: 5})
    cy.get('#open-text-area').type(longText, {delay:8})
    cy.get('.button').click()

    cy.get('.success').should('be.visible')

  })

  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
    
    cy.get('#firstName').type('Kauan')
    cy.get('#lastName').type('Brito')
    cy.get('#open-text-area').type('Exercicio 2')
    cy.get('#email').type('error@gmailcom')
    
    cy.get('.button').click()
    
    
    cy.get('.error').should('be.visible')
    
  })

  it('verificar numero de telefone',() => {
    cy.get('#phone')
    .type('abcde')
    .should('have.value', '')
    
  })

  it.only('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () =>{
    cy.get('#firstName').type('Kauan')
    cy.get('#lastName').type('Brito')
    cy.get('#email').type('error@gmail.com')
    cy.get('#open-text-area').type('Exercicio 2')
    cy.get('#phone-checkbox').check()
    cy.get('.button').click()
    
    cy.get('.button').should('be.visible')
  })
  
  it('preenche e limpa os campos nome, sobrenome, email e telefone', () =>{
    cy.get('#firstName')
    .type('Kauan')
    .should('have.value','Kauan')
    .clear() 
    .should('have.value','')
  })
  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
    cy.get('.button').click()
    
    cy.get('.error').should('be.visible')
  })

  it('envia o formuário com sucesso usando um comando customizado', () =>{
    cy.fillMandatoryFieldsAndSubmit()

    cy.get('.success').should('be.visible')

  })

  it('envia um formulário com o telefone como obrigatório utilizando comando customizado', () => {

    //Declarando objeto em JS
    const data ={
      firstName: 'Kauan',
      lastName: 'Brito',
      email: 'kauanteste@gmail.com',
      phone: '987654321',
      text:'Teste.',
    }

    cy.fillMandatoryFieldsWithPhoneAndSubmit (data)

    cy.get('.success').should('be.visible')
  })

  it('seleciona um produto (YouTube) por seu texto', () =>{

    cy.get('#product')
    .select('YouTube')
    .should('have.value', 'youtube') // O value dentro da caixa de seleção esta com o Y minusuculo
    })
  it('seleciona um produto (Mentoria) por seu valor (value)', () =>{
    cy.get('#product')
    .select('mentoria')
    .should('have.value', 'mentoria') // O value dentro da caixa de seleção esta com o M minusuculo
  })
  it('seleciona um produto (Blog) por seu índice', () => {
    cy.get('#product')
    .select(1)
    .should('have.value', 'blog')
  })
  it('marca o tipo de atendimento "Feedback"', () =>{
    cy.get('input[type="radio"]')
    .check('feedback')
    .should('be.checked')
  })
  it('marca cada tipo de atendimento',() =>{
     cy.get('input[type="radio"]') //Seleciona todos elementos do input que seja do tipo "radio"
     .each(typeOfService => {  //Repete cada elemento, um de cada vez
      cy.wrap(typeOfService)
      .check()
      .should('be.checked')
     })
  })
  it('marca ambos checkboxes, depois desmarca o último', () =>{
    cy.get('input[type=checkbox]')
    .check()

    .should('be.checked')

    .last()
    .uncheck()

    .should('not.be.checked')
     })

  it('seleciona um arquivo da pasta fixtures', () =>{
    cy.get('input[type=file]')
    .selectFile('cypress/fixtures/example.json')

    .should(input => {
      expect(input[0].files[0].name).to.equal('example.json')
    })
  })

  it('seleciona um arquivo simulando um drag-and-drop', () =>{
    cy.get('input[type=file]')
    .selectFile('cypress/fixtures/example.json',{action: 'drag-drop'})

    .should(input => {
      expect(input[0].files[0].name).to.equal('example.json')
    })
  })

  it('seleciona um arquivo simulando um drag-and-drop', () =>{
    cy.get('input[type=file]')
    .selectFile('C:/Users/okaua/OneDrive/Documentos/antecedente.pdf')

    .should(input => {
      expect(input[0].files[0].name).to.equal('antecedente.pdf')
    })
  })

  it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', ()=>{
    cy.fixture('example.json').as('sampleFile')

    cy.get('input[type=file]')
    .selectFile('@sampleFile')

    .should(input => {
      expect(input[0].files[0].name).to.equal('example.json')
    })
  })
  it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () =>{
      cy.contains('a','Política de Privacidade') //cy.get('a') fica muito genérico, neste caso é melhor utilizar o contains
      .should('have.attr', 'target','_blank')
  })
  it('acessa a página da política de privacidade removendo o target e então clicando no link', () =>{
    cy.contains('a','Política de Privacidade')
    .invoke('removeAttr', 'target')
    .click()
    cy.contains('h1','Política de Privacidade')
  })
  it.only('testa a página da política de privacidade de forma independente', ()=>{
    cy.visit('src/privacy.html')
    
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT - Política de Privacidade')
  })
})