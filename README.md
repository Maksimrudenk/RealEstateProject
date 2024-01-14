# RealEstateProject
RealEstateProject consists of two parts:
1)	Web server application that provides a map of the property for rent. It performs functions of providing browsers with web pages, responding http requests from client. Application includes: controllers that respond http, entities that are used as storage units, DTOs, web client(html page, 1 js file ‘vars’ with variables, 1 js file ‘script’ with functions, style css file) , Java interface for storage services, mvn conf file(pom.xml).
Technologies used:
Server(java 20.0.1, spring boot, maven, tomcat), web client(html, js, css, google maps api)
2)	Storage program 



[RealEstate] --- Root directory of server 

[server] --- This directory contains two archives with the server application inside. 
Both allows to launch same application in different ways.
Jar file can be launched by simple jvm,
While war requires servlet container.

-----SERVER -----
RealEstate/src/main/resources/application.properties:
File determines port for running server.

RealEstate/src/main/resources/templates/index.html:
File determines the structure of web page.
Contains key value to set google cloud account.

RealEstate/src/main/resources/static/script.js:
Main script file

RealEstate/src/main/resources/static/vars.js:
Web client variables
Edit to change info of initial map central coordinates/ path to server

RealEstate/src/main/java/com/main/realestate/entity/realEstate/RealEstateController.java:
Edit to change storage service for RealEstate objects/ response behavior of http responding

RealEstate/src/main/java/com/main/realestate/entity/user/UserController.java:
Edit to change storage service for User objects/ response behavior of http responding

RealEstate/src/main/java/com/main/realestate/service:
Directory contains interfaces for storage services.
Also contains test instances for all services.
Create classes that implement interfaces and change values in corresponding controllers to set up the way you want to store data.
------------
