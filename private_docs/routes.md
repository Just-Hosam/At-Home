# Routes

## USERS

BROWSE  GET     /users
READ    GET     /users/:id
EDIT    PATCH   /users/:id (STRETCH)
ADD     POST    /users
<!-- DELETE  DELETE  /users/:id -->

## DASHBOARDS

<!-- BROWSE  GET     /dashboards -->
READ    GET     /dashboards/:id
EDIT    PATCH   /dashboards/:id (STRETCH)
ADD     POST    /dashboards
DELETE  DELETE  /dashboards/:id (STRETCH)

## DASHBOARD/ID/GROCERIES

BROWSE  GET     /groceries (DONE)
<!-- READ    GET     /groceries/:id -->
EDIT    PATCH   /groceries/:id (DONE)
ADD     POST    /groceries (DONE)
DELETE  DELETE  /groceries/:id (STRETCH)

## DASHBOARD/ID/RECIPES

BROWSE  GET     /recipes (DONE)
READ    GET     /recipes/:id (DONE)
EDIT    PATCH   /recipes/:id
ADD     POST    /recipes (DONE)
DELETE  DELETE  /recipes/:id (DONE)

## DASHBOARD/ID/RECIPES/ID/INDGREDIENTS

<!-- BROWSE  GET     /indgredients -->
READ    GET     /indgredients/:id
EDIT    PATCH   /indgredients/:id
ADD     POST    /indgredients
DELETE  DELETE  /indgredients/:id (STRETCH)

## DASHBOARD/ID/CHORES

BROWSE  GET     /chores
<!-- READ    GET     /chores/:id -->
EDIT    PATCH   /chores/:id
ADD     POST    /chores
DELETE  DELETE  /chores/:id (STRETCH)

## DASHBOARD/ID/PHOTOS

BROWSE  GET     /photos
READ    GET     /photos/:id
EDIT    PATCH   /photos/:id
ADD     POST    /photos
DELETE  DELETE  /photos/:id (STRETCH)

## DASHBOARD/ID/EVENTS

BROWSE  GET     /events
READ    GET     /events/:id
EDIT    PATCH   /events/:id
ADD     POST    /events
DELETE  DELETE  /events/:id

## DASHBOARD/ID/CONTACTS

BROWSE  GET     /contacts
READ    GET     /contacts/:id
EDIT    PATCH   /contacts/:id (STRETCH)
ADD     POST    /contacts
DELETE  DELETE  /contacts/:id (STRETCH)

## DASHBOARD/ID/POLLS

<!-- BROWSE  GET     /polls -->
READ    GET     /polls/:id
EDIT    PATCH   /polls/:id (STRETCH)
ADD     POST    /polls
DELETE  DELETE  /polls/:id

## DASHBOARD/ID/OPTIONS

BROWSE  GET     /options
<!-- READ    GET     /options/:id -->
EDIT    PATCH   /options/:id (STRETCH)
ADD     POST    /options
<!-- DELETE  DELETE  /options/:id -->
