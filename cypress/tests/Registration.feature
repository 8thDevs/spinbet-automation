Feature: SpinBet Registration Validations

    Scenario: Display error messages when all required fields are empty
        Given the user opens the registration modal
        When required fields are empty 
        And user click the register button
        Then error messages should display

    Scenario: Display error message for username not at least 6 characters long
        Given the user opens the registration modal
        When username field is not at least 6 characters long
        Then error message for username field should display for "not at least 6 characters" issue

    Scenario: Display error message for username with spaces only
        Given the user opens the registration modal
        When username field is spaces only
        Then error message for username field should display for "with spaces" issue

    Scenario: Display error message for username with special characters
        Given the user opens the registration modal
        When username field is special characters only
        Then error message for username field should display for "with special characters" issue

    Scenario Outline: Display error message for email with incorrect format
        Given the user opens the registration modal
        When email field has "<email>" as the incorrect format
        Then error message for email field should display

        Examples:
        |email          |
        |sample         |
        |sample@        |
        |sample@gmail   |
        |sample@gmail.  |

    Scenario: Display error message for password not at least 6 characters
        Given the user opens the registration modal
        When password is not at least 6 characters
        Then error message for password field should display

    Scenario Outline: Display error message for incomplete and invalid date of birth
        Given the user opens the registration modal
        When date has "<month>", "<day>" and "<year>" not completely filled
        Then error message for date field should display based on the "<month>", "<day>", and "<year>" values

        Examples:
        |month|day|year|
        |12   |   |    |
        |     |26 |    |
        |     |   |1994|
        |12   |26 |    |
        |12   |   |1994|
        |     |26 |1994|
        |123  |26 |1994|
        |12   |261|1994|
        |12   |26 |94  |
    
    Scenario: Display the Captcha modal after completing all required fields
        Given the user opens the registration modal
        When all required fields were completely filled
        Then a Captcha test should display after click the Register button
