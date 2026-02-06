# 004-search-suggestions

## Goal 
When typing in the search bar a popu appears below the search field and shows
suggestions from the af api.

## Think

### Type Ahead
/complete?q={typed string}

If you want to help your end users with term suggestions you can use the typeahead function, which will return common
terms found in the job ads. This should work great with an auto complete feature in your search box. If you request ...

https://jobsearch.api.jobtechdev.se/complete?q=stor


... you'll get storkök, storhushåll, storesupport, and storage as they are the most common terms starting with "stor*"
in ads.
If you have a trailing space in your request

https://jobsearch.api.jobtechdev.se/complete?q=storage%20s


... you'll get sverige, stockholms län, stockholm, svenska, and script since they are the most common terms beginning
with "s" for ads that contain the word "storage"
N.B. The number you get in "occurences" is an approximate value, it will differ from the actual search result
(due to differences in the query to Elastic). Use it as a guideline, not as an exact result.

## Steps
- [x] Figure out how the api endpoint for this works
- [ ] Test the type ahead feature of the api 
