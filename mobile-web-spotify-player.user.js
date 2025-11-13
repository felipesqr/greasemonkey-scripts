// ==UserScript==
// @name         Hide Multiple Spotify Elements
// @namespace    http://tampermonkey.net/
// @version      1.2
// @description  Hides specific elements on Spotify
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


        const lyricsButton = document.querySelector('button[aria-label="Lyrics"]');
        const lyricsButtonParent1 = lyricsButton.parentElement;
        const lyricsButtonParent2 = lyricsButtonParent1.parentElement;

        if (lyricsButtonParent2) {
            lyricsButtonParent2.style.display = 'none';
        }


        const nowPlayingBarLeftStuff = document.querySelector('button[aria-label="Add to Liked Songs"]');
        const nowPlayingBarLeftStuffParent1 = nowPlayingBarLeftStuff.parentElement
        const nowPlayingBarLeftStuffParent2 = nowPlayingBarLeftStuffParent1.parentElement
        const nowPlayingBarLeftStuffParent3 = nowPlayingBarLeftStuffParent2.parentElement
        const nowPlayingBarLeftStuffParent4 = nowPlayingBarLeftStuffParent3.parentElement
        const nowPlayingBarLeftStuffParent5 = nowPlayingBarLeftStuffParent4.parentElement


        //resize and center controls
        if(nowPlayingBarLeftStuffParent3){
          nowPlayingBarLeftStuffParent3.style.display = 'none';
          nowPlayingBarLeftStuffParent5
        }

        const nowPlayingBarRightStuff = document.querySelector('button[aria-label="Previous"]');
        const nowPlayingBarRightStuffParent1 = nowPlayingBarRightStuff.parentElement
        const nowPlayingBarRightStuffParent2 = nowPlayingBarRightStuffParent1.parentElement
        const nowPlayingBarRightStuffParent3 = nowPlayingBarRightStuffParent2.parentElement
        const nowPlayingBarRightStuffParent4 = nowPlayingBarRightStuffParent3.parentElement
        if(nowPlayingBarRightStuffParent4){
          nowPlayingBarRightStuffParent4.style.setProperty('width', '100%');
        }


        const spotifyLogo = document.querySelector('svg[aria-label="Spotify"]');
        const spotifyLogoParent1 = spotifyLogo.parentElement
        const spotifyLogoParent2 = spotifyLogoParent1.parentElement

        if(spotifyLogoParent2){
          spotifyLogoParent2.style.setProperty('display', 'none', 'important');;
        }

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
