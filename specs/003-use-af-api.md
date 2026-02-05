# 003-use-af-api

## Goal

## Braindump

Jobsearch endppoint
https://jobsearch.api.jobtechdev.se/search?q=Flen

works via querystring.

- Handle offset pagination etc.

Customise the result set
curl "https://jobsearch.api.jobtechdev.se/search?q=skogsarbetare" -H "accept: application/json" -H "X-Fields: total{value}, hits{id, headline, workplace_address{coordinates}, employer{name}}"

typeahed + debounce for getting suggestions

https://jobsearch.api.jobtechdev.se/complete?q=stor

If you want to help your end users with term suggestions you can use the typeahead function, which will return common
terms found in the job ads. This should work great with an auto complete feature in your search box. If you request ...

## Steps

1. Get data from API
   I: url, search term
   P: parse to Job type, handle response error
   O: array of jobs | error message
2. Render Data

