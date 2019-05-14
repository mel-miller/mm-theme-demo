Feature: Content
  In order to test some basic Behat functionality
  As a website user
  I need to be able to see that the Drupal and Drush drivers are working

# TODO: 'Given ... content' (below) works, but 'When I am viewing ... content'
# uses data that pantheonssh rejects

  @api
  Scenario: Create users
    Given users:
    | name     | mail            | status |
    | Devin Miller | devin@example.com | 1      |
    And I am logged in as a user with the "administrator" role
    When I visit "admin/people"
    Then I should see the link "Devin Miller"

  @api
  Scenario: Login as a user created during this scenario
    Given users:
    | name      | status | mail             |
    | Test user |      1 | test@example.com |
    When I am logged in as "Test user"
    Then I should see the link "Log out"

  @api
  Scenario: Create many terms
    Given "tags" terms:
    | name    |
    | Tag one |
    | Tag two |
    And I am logged in as a user with the "administrator" role
    When I go to "admin/structure/taxonomy/manage/tags/overview"
    Then I should see "Tag one"
    And I should see "Tag two"