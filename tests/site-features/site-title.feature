Feature: Confirm that configuration was applied
  In order to know that the Drupal configuration was correctly applied for the tests
  As a website developer
  I need to be able to confirm that the site title is correct

  @api
  Scenario: Site title is correct
    Given I am on "/"
    Then I should see "MM Demo"