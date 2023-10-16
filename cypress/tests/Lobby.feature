Feature: Casino Lobby Search Validations

    Scenario: Display error message for search not at least 3 characters
        Given the user visit the Casino lobby
        When searching for a game with not at least 3 characters
        Then an error message should be visible

    Scenario Outline: Search an existing word in the list of games
        Given the user visit the Casino lobby
        When searching for a game with "<word>" as an existing word
        Then the games should be filtered with the searched word "<word>"

        Examples:
        |word |
        |gates|
        |rush |

    Scenario Outline: Search an existing word to have the same count to verify case insensitivity
        Given the user visit the Casino lobby
        When searching for a game with "<first_word>" and "<second_word>" as existing words
        Then the number of games searched should be the same

        Examples:
        |first_word|second_word|
        |gAtES     |GATES      |
        |rUSH      |Rush       |
