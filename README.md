
# tretton37 code assignment

A brief introduction to everyone within [1337](https://1337.life/) team.

## A live version is available on [heroku](mike4tretton37.herokuapp.com/).

## Brief intro

An app consists of a simple web-server running on Express.js and a frontend part build with React in TypeScript. The skeleton of the project is created with the standard `create-react-app` utility with a bunch of useful defaults.

The following stories are implemented:

* Use Typescript (or similar, no any’s!). For me this is actually not a requirement but an advisable approach to use in general. It offers code checking and potential error highlighting right in the editor to prevent unobvious type-related errors in runtime.

* Responsive design, works on mobile and tablets. This is another natural approach for the web. The card panel is created with CSS grid.

* Filter by name and office. This offers a way to use some imagination of how to filter items on the page, and that is the main reasoning. I didn't add the sorting part because in my opinion it doesn't really add anything in coding part other than extending the toolbar and adding another function. But I did some improvements on top of the default task, which included adding debounce on the input box and pagination-like interface to prevent rendering the whole long list of cards at once. I think these subtle features are more important,  and it is them I spent the most time on.

* Available on a free public url (such as Azure, Heroku). I'm familiar with Heroku, but the last time I used it is probably when their CLI tool was written in Ruby. So I choose it as an exercise to refresh the good memories.

* I added integration tests to test basic functionality and logic.

The rest of stories for me must have taken some time to dive into and research (accessibility tasks, CI/CD and other testing libraries). I definitely spent more time on the project than it was suggested, so I turned to the things I know better.

I was a little bit confused with the server part but decided to implement what I think was better. This private api key is an entity that must only exist on the backend so I'm querying the original data source from my small proxy-handle. Adding something like process.env.API_KEY to query the original data source from the web app is not secure. I could have downloaded the dataset and served it statically but the api key was provided for a reason so I did what I did.

Not going to lie I spent a lot more time on the project than was advised but I was trying to finish it during the weekend and at the end have the best version of it.

## Getting started

First you need to obtain a valid API key to access the 1337's team resources which we are going to pull the data from.

Then you need to export the following ENV variables with the API key contents and the server address the frontend will pull the data from:

```
$ export TRETTON37_API_KEY='api-key 1234abcd...' # API key omitting the leading 'Authorization: ' part
$ export REACT_APP_SERVER=mike4tretton37.herokuapp.com # 
```

### Installing

Clone the repository

```
$ git clone git@github.com:mie/mike4tretton37.git
$ cd mike4tretton37
```

Install the dependencies:

```
$ npm install
```

Build the frontend:

```
$ npm run build
```

Run the local server:

```
$ npm run start
```

Running the tests

```
$ npm run test
```
