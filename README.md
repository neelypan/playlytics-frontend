# Playlytics 

## Description
Playlytics is a playlist manager built for Spotify. View all your playlists saved to your profile, and view their details including cover art, number of songs, and length. The details page also includes a song viewer, where you can see all the songs included in the playlist with their information (album cover, name, artists, length) in a aesthetic and uncluttered manner. Clicking on a song opens up the Spotify web player and starts playing that song, and playlists include a link to open the playlist in the Spotify website.

## Purpose
This project was primarily made to assist with choosing a playlist to listen to. The random feature chooses one of your saved playlists and opens its detail page, allowing you to view the playlist and also open it up in Spotify, or specifically play one of the songs included in it. This app also allows you to view the details of any of your saved playlists at the click of a button.

## Functions
- Login with Spotify
- View all your saved playlists
- Select a random playlist
- View playlist details
  - cover art
  - name
  - playlist creator
  - playlist length
  - \# of songs
  - open playlist in Spotify website
  - song viewer
    - album cover
    - song length
    - artists
    - name
    - Play song in web player (on click)

  ## Tech Stack
  Made with React (Vite + React) connected to a Springboot API in the [backend](https://github.com/neelypan/Playlytics-Backend). Also uses Spotify Web API for user information and authorization and React Router for frontend navigation.
