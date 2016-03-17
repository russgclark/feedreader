/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* RSS feeds test suite */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* Loops through each feed in the allFeeds object and ensures
         * it has a URL defined and that the URL is not empty.  */
         it('have URL, and URL is not empty', function() {
            for (var i = 0; i < allFeeds.length; i++){
             expect(allFeeds[i].url).toBeDefined();
             expect(allFeeds[i].url.length).not.toBe(0);
            }
         });

        /* loops through each feed in the allFeeds object and ensures
         * it has a name defined and that the name is not empty. */
         it('have name, and name is not empty', function() {
            for (var i = 0; i < allFeeds.length; i++){
             expect(allFeeds[i].name).toBeDefined();
             expect(allFeeds[i].name.length).not.toBe(0);
            }
         });
    });

    /* Menu test suite */
    describe('The Menu', function() {
          /* Ensures the menu element is hidden by default. */
          it('is hidden on initial page load', function() {
              expect($("body").hasClass('menu-hidden')).toBe(true);
          });

          /* Ensures the menu changes visibility when the menu icon is clicked. */
          /* Grabs state of menu, assigns to btn variable */
          var btn;
          beforeEach(function() {
              btn = $('.menu-icon-link');
          });
          /* Tests state of menu change upon click event  */
           it('reveals and hides upon click', function() {
              btn.trigger('click');
              expect($("body").hasClass('menu-hidden')).toBe(false);
              btn.trigger('click');
              expect($("body").hasClass('menu-hidden')).toBe(true);
           });
      });

    /* Initial Entries test suite */
    describe('Initial Entries', function() {
          /* Ensures when the loadFeed function is called and completes its work, there is at least
           * a single .entry element within the .feed container. */
           beforeEach(function(done) {
             loadFeed(0, done);
           });
          /* Checks whether or not feed entries have content, after feeds have been loaded */
          it('there is at least a single entry element in feed container', function() {
            var allEntries = $('.feed').find('.entry');
            expect(allEntries.length).not.toBe(0);
          });
      });

      /* New Feed Selection test suite */
      describe('New Feed Selection', function() {
          /* Ensures when a new feed is loaded by the loadFeed function that the content actually changes. */
          /* Grabs initial feed content and assigns to variable */
          var feedContent;
          beforeEach(function(done) {
              loadFeed(1, function() {
                feedContent = $(".feed").html();
                done();
              });
          });

          it('feed content differs between each individual feed', function(done) {
              loadFeed(2, function() {
                expect($(".feed").html()).not.toEqual(feedContent);
                done();
              });
          });
      });

}());
