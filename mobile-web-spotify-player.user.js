// ==UserScript==
// @name         Mobile Web Spotify player
// @namespace    http://tampermonkey.net/
// @version      1.2
// @description  Hides specific elements on Spotify and fix responiviness.. spotify uses dynamic class names (they change often and are not reliable) so this script has to rely on the little ids thar are left and text from buttons and traverse up until we ge to the elements we want to change.. changes in the UI will ofcourse break this script, but it shouldnt be to hard to fix
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
        const leftSidebar = document.getElementById('Desktop_LeftSidebar_Id');
        if (leftSidebar) {
            leftSidebar.style.display = 'none';
        }

        //Hide right sidebar
        const rightSidebar = document.getElementById('Desktop_PanelContainer_Id');
        const rightSidebarParent = rightSidebar.parentElement

        if (rightSidebar && rightSidebarParent) {
          rightSidebarParent.style.display = 'none';
        }

        //Fix player controls bar responiviness and alignment
        const nowPlayingButton = document.querySelector('button[aria-label="Now playing view"]');
        const nowPlayingButtonParent1 = nowPlayingButton.parentElement;
        const nowPlayingButtonParent2 = nowPlayingButtonParent1.parentElement;
        const nowPlayingButtonParent3 = nowPlayingButtonParent2.parentElement;
        const nowPlayingButtonParent4 = nowPlayingButtonParent3.parentElement;
        const nowPlayingButtonParent5 = nowPlayingButtonParent4.parentElement;
        const nowPlayingButtonParent6 = nowPlayingButtonParent5.parentElement;

        if (nowPlayingButtonParent5) {

            nowPlayingButtonParent5.style.setProperty('justify-content', 'normal', 'important');
            nowPlayingButtonParent6.style.setProperty('min-width', '0', 'important');
        }


        //Hide buttons right of the controls, doenst fit on mobile view (comment if you want them back)
        const lyricsButton = document.querySelector('button[aria-label="Lyrics"]');
        const lyricsButtonParent1 = lyricsButton.parentElement;
        const lyricsButtonParent2 = lyricsButtonParent1.parentElement;

        if (lyricsButtonParent2) {
            lyricsButtonParent2.style.display = 'none';
        }

        //Hide now playing, doenst fit on mobile view (comment if you want them back)
        const nowPlayingBarLeftStuff = document.querySelector('button[aria-label="Add to Liked Songs"]');
        const nowPlayingBarLeftStuffParent1 = nowPlayingBarLeftStuff.parentElement
        const nowPlayingBarLeftStuffParent2 = nowPlayingBarLeftStuffParent1.parentElement
        const nowPlayingBarLeftStuffParent3 = nowPlayingBarLeftStuffParent2.parentElement
        const nowPlayingBarLeftStuffParent4 = nowPlayingBarLeftStuffParent3.parentElement
        const nowPlayingBarLeftStuffParent5 = nowPlayingBarLeftStuffParent4.parentElement

        if(nowPlayingBarLeftStuffParent3){
          nowPlayingBarLeftStuffParent3.style.display = 'none';
          nowPlayingBarLeftStuffParent5
        }

        //cente3r and resize player controls
        const nowPlayingBarRightStuff = document.querySelector('button[aria-label="Previous"]');
        const nowPlayingBarRightStuffParent1 = nowPlayingBarRightStuff.parentElement
        const nowPlayingBarRightStuffParent2 = nowPlayingBarRightStuffParent1.parentElement
        const nowPlayingBarRightStuffParent3 = nowPlayingBarRightStuffParent2.parentElement
        const nowPlayingBarRightStuffParent4 = nowPlayingBarRightStuffParent3.parentElement
        if(nowPlayingBarRightStuffParent4){
          nowPlayingBarRightStuffParent4.style.setProperty('width', '100%');
        }

        //Hide footer
        document.querySelectorAll('.main-view-container__mh-footer-container').forEach(el => {
            el.style.setProperty('display', 'none', 'important');
        });
    }

    const observer = new MutationObserver(() => {
        hideElements();
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
})();
