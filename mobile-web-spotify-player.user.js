// ==UserScript==
// @name         Hide Multiple Spotify Elements
// @namespace    http://tampermonkey.net/
// @version      1.2
// @description  Mobile Spotify web player
// @author       You
// @match        *://open.spotify.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // fix overall mobile resposiveness
    function fixOverallMobileResponsiveness() {
      document.body.style.setProperty('min-width', '0', 'important');
    }

    // Hide header spotify icon
    function hideHeaderSpotifyIcon() {
      const homeBtn = document.querySelector('button[aria-label="Home"]');
      if (homeBtn) homeBtn.style.setProperty('display', 'none', 'important');

      const goBackParent = document.querySelector('button[aria-label="Go back"]')?.parentElement;
      if (goBackParent) goBackParent.style.setProperty('display', 'none', 'important');
    }

    // Hide header friends activity button
    function hideHeaderFriendsActivityButton() {
      const whatsNew = document.querySelector('button[aria-label="What\'s New"]');
      if (whatsNew) whatsNew.style.setProperty('display', 'none', 'important');

      const fab = document.querySelector('button[aria-label="Friend Activity"]');
      if (fab) fab.style.setProperty('display', 'none', 'important');
    }

    // Hide footerbar left controls
    function hideFooterbarLeftControls() {
      const q = document.querySelector('button[aria-label="Queue"]');
      const parent = q?.parentElement?.parentElement?.parentElement;
      if (parent) parent.style.setProperty('display', 'none', 'important');
    }

    // Hide left sidebar
    function hideLeftSidebar() {
      const left = document.getElementById('Desktop_LeftSidebar_Id');
      if (left) left.style.setProperty('display', 'none', 'important');
    }

    // Hide right sidebar
    function hideRightSidebar() {
      const right = document.getElementById('Desktop_PanelContainer_Id')?.parentElement;
      if (right) right.style.setProperty('display', 'none', 'important');
    }

    // Hide footer
    function hideFooter() {
      document.querySelectorAll('.main-view-container__mh-footer-container').forEach(el => {
        el.style.setProperty('display', 'none', 'important');
      });
    }

    // center and widen footerbar player controls
    function centerAndWidenFooterbarPlayerControls() {
      const prev = document.querySelector('button[aria-label="Previous"]');
      const target = prev?.parentElement?.parentElement?.parentElement?.parentElement;
      if (target) target.style.setProperty('width', '100%');
    }

    // fix footerbar mobile resposiveness
    function fixFooterbarMobileResponsiveness() {
      const nowPlaying = document.querySelector('button[aria-label="Now playing view"]');
      const a = nowPlaying?.parentElement?.parentElement?.parentElement?.parentElement?.parentElement;
      if (a) a.style.setProperty('justify-content', 'normal', 'important');

      const b = nowPlaying?.parentElement?.parentElement?.parentElement?.parentElement?.parentElement?.parentElement;
      if (b) b.style.setProperty('min-width', '0', 'important');
    }

    // Hide footerbar right controls
    function hideFooterbarRightControls() {
      const a = document.querySelector('button[aria-label="Add to Liked Songs"]')?.parentElement?.parentElement?.parentElement;
      if (a) a.style.setProperty('display', 'none', 'important');

      const b = document.querySelector('button[aria-label="Collapse"]')?.parentElement?.parentElement?.parentElement;
      if (b) b.style.setProperty('display', 'none', 'important');
    }

    // Hide media type pills
    function hideMediaTypePills() {
      const a = document.querySelector('button[aria-label="Audiobooks"]')?.parentElement?.parentElement?.parentElement?.parentElement?.parentElement;
      if (a) a.style.setProperty('display', 'none', 'important');
    }

    // list of tasks in the order they originally appeared
    const tasks = [

      fixOverallMobileResponsiveness,
      hideLeftSidebar,
      hideRightSidebar,
      hideHeaderSpotifyIcon,
      hideHeaderFriendsActivityButton,
      hideMediaTypePills,
      hideFooter,

      centerAndWidenFooterbarPlayerControls,
      fixFooterbarMobileResponsiveness,

      hideFooterbarRightControls,
      hideFooterbarLeftControls

    ];

    // track scheduled timeouts so we can cancel if needed
    let scheduled = [];

    function clearScheduled() {
      scheduled.forEach(id => clearTimeout(id));
      scheduled = [];
    }

    // run the task list one at a time, `delay` ms apart
    function runSequentially(list, delay = 2000) {
      clearScheduled();
      list.forEach((fn, i) => {
        const id = setTimeout(() => {
          try { fn(); } catch (e) { console.error('Task error:', e); }
        }, i * delay);
        scheduled.push(id);
      });
    }


    const observer = new MutationObserver(() => {
      runSequentially(tasks, 2000);
    });

    // initial run
    runSequentially(tasks, 2000);

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
})();
