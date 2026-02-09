# 005-ghost-text-autocomplete

## Wish

It would be cool to have a ghosttext appear as I type in the search bar that
completes my search intent with the leading match from the jobtech typeahead
endpoint

## Core Primitive

Projection: Get the rest of the string from the what is currently in the input.
Ie if there is Type in the inbox and suggetsions[0] is Typescript return 'script'

## Stations

1. Data Provider
- completions array from `useJobSuggestions` hook
- searchTerm `useState` also available

2. Logic
- calculates and returns the suffix between the current search input and a
suggestion
    - `getSuggestionSuffix(query: string, suggestion: string): string`

3. UI LAyer
- handles the merging of the suffix and the current query. use a layered approach:
    - relative container
    - absolute background div non interactive with <span>{searchTerm}</span><span>{suffix}</span>
    - interactive but transparent input element with the search term 

4. Actions
- onChange cacuclating the difference
- onKeydown tab merge completion into input
