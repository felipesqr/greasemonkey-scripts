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


      // Hide media type pills
    function hideMediaTypePills() {
      const a = document.querySelector('button[aria-label="Audiobooks"]')?.parentElement?.parentElement?.parentElement?.parentElement?.parentElement;
      if (a) a.style.setProperty('display', 'none', 'important');
    }


    // Hide footerbar left controls
    function hideFooterbarRightControls() {
      const q = document.querySelector('button[aria-label="Queue"]');
      if (q) q.style.setProperty('display', 'none', 'important');

      const qp = q?.parentElement?.parentElement;
      if (qp) qp.style.setProperty('width', '0px', 'important');

      const parent = q?.parentElement?.parentElement?.parentElement;
      if (parent) {
        parent.style.setProperty('min-width', '0px', 'important');
        parent.style.setProperty('width', '0px', 'important');
      }


      const m = document.querySelector('button[aria-label="Mute"]');
      const mp = m?.parentElement;
      if (mp) mp.style.setProperty('display', 'none', 'important');

      const eqs = document.querySelector('button[aria-label="Enter Full screen"]');
      if (eqs) eqs.style.setProperty('display', 'none', 'important');

      const om = document.querySelector('button[aria-label="Open Miniplayer"]');
      if (om) om.style.setProperty('display', 'none', 'important');

      const ctd = document.querySelector('button[aria-label="Connect to a device"]');
      if (ctd) ctd.style.setProperty('display', 'none', 'important');

      // get all matching buttons and prefer the second one
      const npvButtons = document.querySelectorAll('button[aria-label="Now playing view"]');
      const npv = npvButtons && npvButtons.length > 1 ? npvButtons[1] : npvButtons[0] || null;
      if (npv) npv.style.setProperty('display', 'none', 'important');

    }


    // Hide left sidebar
    function hideLeftSidebar() {
      const left = document.getElementById('Desktop_LeftSidebar_Id');
      if (left) left.style.setProperty('display', 'none', 'important');
    }


    // Hide right sidebar
    function hideRightSidebar() {
      // const right = document.getElementById('Desktop_PanelContainer_Id')?.parentElement;
      // if (right) right.style.setProperty('display', 'none', 'important');

      const btn = document.querySelector('button[aria-label="Hide Now Playing view"]');
      if (btn) {
        try { btn.click(); } catch (e) { console.error('Could not click Hide Now Playing view button', e); }
      }
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
      const nowPlaying = document.querySelector('button[aria-label="Queue"]');
      const a = nowPlaying?.parentElement?.parentElement?.parentElement?.parentElement?.parentElement;
      if (a) {
        a.style.setProperty('justify-content', 'normal', 'important');
        a.style.setProperty('min-width', '0', 'important');
      }

    }


    // Hide footerbar Left controls
    function hideFooterbarLeftControls() {
      const c = document.querySelector('div[data-testid="now-playing-widget"]');
      const cp = c?.parentElement;
      if (cp) cp.style.setProperty('display', 'none', 'important');
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

    let delay = 100
    // track scheduled timeouts so we can cancel if needed
    let scheduled = [];

    function clearScheduled() {
      scheduled.forEach(id => clearTimeout(id));
      scheduled = [];
    }

    // run the task list one at a time, `delay` ms apart
    function runSequentially(list, delay = delay) {
      clearScheduled();
      list.forEach((fn, i) => {
        const id = setTimeout(() => {
          try { fn(); } catch (e) { console.error('Task error:', e); }
        }, i * delay);
        scheduled.push(id);
      });
    }


    const observer = new MutationObserver(() => {
      runSequentially(tasks, delay);
    });

    // initial run
    runSequentially(tasks, delay);

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
})();
