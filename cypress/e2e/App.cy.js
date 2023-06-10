describe('Апп', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/');
  });

  it('Displays a list of repositories on page load', () => {
    cy.get('.repositoryItem').should('have.length.greaterThan', 0);
  });

  it('Enters a value in the search field and checks the display of corresponding search results', () => {
    const searchQuery = 'example';

    cy.get('.searchInput').type(searchQuery);
    cy.wait(5000);

    cy.get('.repositoryItem').each((repositoryItem) => {
      cy.wrap(repositoryItem).find('h3').should('contain', searchQuery);
    });
  });

  it('Switches pages and displays repositories', () => {

    cy.get('.paginator').then(($paginator) => {
      if ($paginator.length > 0) {
        cy.get('.page').its('length').as('totalPages');

        cy.get('.page').each(($page) => {
          cy.wrap($page).click();

          cy.get('.repositories').should('exist');

          cy.wrap($page).should('have.class', 'active');
        });

        cy.get('@totalPages').then((totalPages) => {
          cy.get('.paginator .page').eq(totalPages - 1).click();

          cy.get('.repositoryItem').should('exist');

          cy.get('.paginator .page').eq(totalPages - 1).should('have.class', 'active');
        });
      }
    });
  });


  it('should navigate to repository card on repository name click', () => {
    cy.visit('/');

    cy.get('.repositoryItem').should('have.length.gt', 0);

    cy.get('.repositoryItem').first().find('h3').click();

    cy.url().should('include', '/repository/');

    cy.get('.containerRepositoryCard').should('exist');
  });

  it('should display repository details on repository card', () => {
    cy.visit('/repository/{repository_id}');

    cy.get('.containerRepositoryCard h3').should('contain', 'Repository Name');

    cy.get('.containerRepositoryCard span').should('contain', 'Stars: {stargazerCount}');

    cy.get('.containerRepositoryCard span').should('contain', 'Last Commit: {last_commit_date}');

    cy.get('.containerRepositoryCard a').should('have.attr', 'href', '{owner_url}');
    cy.get('.containerRepositoryCard a').should('contain', '{owner_login}');

    cy.get('.containerRepositoryCard ul li').should('have.length.gt', 0);
  });

  it('should navigate back to the homepage when clicking "Go to HomePage" link', () => {
    cy.visit('/repository/{repository_id}');

    cy.get('.containerRepositoryCard a').click();

    cy.url().should('eq', '{homepage_url}');
  });
});
