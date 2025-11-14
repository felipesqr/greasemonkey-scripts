// ==UserScript==
// @name         Hide Multiple Spotify Elements
// @namespace    http://tampermonkey.net/
// @version      1.2
// @description  Mobile Spotify web player
// @author       You
// @match        https://open.spotify.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function hideElements() {

      // fix overall mobile resposiveness
      document.body.style.setProperty('min-width', '0', 'important');


      //Hide left sidebar
      document.getElementById('Desktop_LeftSidebar_Id').style.setProperty('display', 'none', 'important');

      //Hide right sidebar
      document.getElementById('Desktop_PanelContainer_Id').parentElement.style.setProperty('display', 'none', 'important');

      // fix footerbar mobile resposiveness
      document.querySelector('button[aria-label="Now playing view"]').parentElement.parentElement.parentElement.parentElement.parentElement.style.setProperty('justify-content', 'normal', 'important');
      document.querySelector('button[aria-label="Now playing view"]').parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.style.setProperty('min-width', '0', 'important');

      //center and widen footerbar player controls
      document.querySelector('button[aria-label="Previous"]').parentElement.parentElement.parentElement.parentElement.style.setProperty('width', '100%');

      //Hide footerbar left controls
      document.querySelector('button[aria-label="Lyrics"]').parentElement.parentElement.style.setProperty('display', 'none', 'important');

      //Hide footerbar right controls
      document.querySelector('button[aria-label="Add to Liked Songs"]').parentElement.parentElement.parentElement.style.setProperty('display', 'none', 'important');
      document.querySelector('button[aria-label="Collapse"]').parentElement.parentElement.parentElement.style.setProperty('display', 'none', 'important');

      //Hide media type pills
      document.querySelector('button[aria-label="Audiobooks"]').parentElement.parentElement.parentElement.parentElement.parentElement.style.setProperty('display', 'none', 'important');



      //Hide header friends activity button
      document.querySelector('button[aria-label="Friend Activity"]').style.setProperty('display', 'none', 'important');
      document.querySelector('button[aria-label="What\'s New"]').style.setProperty('display', 'none', 'important');


      //Hide footer
      document.querySelectorAll('.main-view-container__mh-footer-container').forEach(el => {el.style.setProperty('display', 'none', 'important');});

      //Hide header spotify icon
      document.querySelector('button[aria-label="Home"]').style.setProperty('display', 'none', 'important');
      document.querySelector('button[aria-label="Go back"]').style.setProperty('display', 'none', 'important');
      document.querySelector('button[aria-label="Go forward"]').style.setProperty('display', 'none', 'important');




    }


    const observer = new MutationObserver(() => {
        hideElements();
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
})();
