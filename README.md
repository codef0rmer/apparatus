#Apparatus
Find who owns a device among your peers without asking each one of them and being lucky!

##Why?
Because I'm a problem solver and become frustrated when it comes to get any device such as iPad, Android, Windows 8, or Mac for testing purpose at work. In short, I wanted to see a real-time visualization to point me to a relevant person who actually owns a device than asking everybody for it. As an alternative, we could have used Google Docs to maintain the same details in spreadsheet that updates itself in realtime but we or many other companies restrict access to Google Services.

##How?
I did not have enough time to spend on backend and wanted to save trivial information in DB so I decided to use [Firebase](http://firebase.com) - Scalable real-time backend. Also includes:

* [Angular.js](http://angularjs.org)
* [AngularFire](http://angularfire.com)
* [Angular Timer](http://siddii.github.io/angular-timer)
* [Twitter Bootstrap](http://getbootstrap.com/2.3.2)
* [Underscore.js](http://underscorejs.org)
* [Karma Test Runner](http://karma-runner.github.io/0.10/index.html)
* [Jasmine](http://jasmine.github.io/)

##Want to use at your place?
Just modify `app/CONFIG.js` to suit your need.

##Want to contribute?
### basic setup
    sudo npm install && bower install

### Fire up an app or create a build
    grunt server/build

### Run unit tests
    grunt test:unit

### Run e2e tests
    grunt test:e2e

##Todo?
* Real-time messaging with peers
* Browser based notification (such as Chrome Notification) If any device becomes available/unavailable


##License
[Mozilla Public License](http://www.mozilla.org/MPL/)
