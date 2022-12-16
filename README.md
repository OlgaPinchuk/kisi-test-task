# Code assignment - Kisi Web Junior Development Challenge

The aim of the web development challenge is to demonstrate technical prowess to interact with Kisi REST API and to build UI interactions. For this purpose, we are providing a codesandbox with a starter template and UI, so you can get started with the task right away.

We have used Bootstrap CSS framework to create some of the initial UI, but you can use any react ui framework for the rest of the code. Create a codesandbox account if you don’t have one and fork the sandbox given below. Once you have completed the task, send the forked codesandbox to us for evaluation.

## Helpful links

[Kisi JS client](https://www.npmjs.com/package/kisi-client)  
[Fetch Groups](https://api.kisi.io/docs#/operations/fetchGroups)  
[Create Group](https://api.kisi.io/docs#/operations/createGroup)  
[Debounce](https://lodash.com/docs/4.17.15#debounce)

## Instructions

Use the given credentials to log in [link](https://web.kisi.io) (Domain: test-task)
Use the Groups present in the Organization to finish the test task.

## Task: Implement Groups page

Implement fetching and showing the list of the groups
Implement pagination so that you show 10 groups at a time on the page. Use the offset and limit query parameters
Implement adding a group. Just the name field is enough in the form. You can either create a new page or use a dialog component for this. Remember to send the place_id in the POST request
Implement searching groups, the list of groups should update as the search query gets updated. Debounce the search query so that the app doesn’t hit our API rate limits
Implement deleting a group. Show a confirmation dialog before the group can be deleted
