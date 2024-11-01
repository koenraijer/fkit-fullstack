# Roadmap
- [ ] Password reset mail
- [ ] Add Apple login
- [X] Add password login
- [ ] Add delete account function
- [X] Update avatar upload to reflect same workflow as settings
- [ ] Perfect onboarding:
  - [X] Add an add password screen to signup
  - [X] Register when it's the first time a user logs in and redirect them to signup/username. 
  - [X] Prevent users from accessing /signup and redirect them to /signin
- [ ] Perfect redirections:
    - [ ] Make sure users are redirected to the proper signup step when going to a different signup step while not being done with it. 
    - [ ] Simplify AuthCheck / onboadCheck, only 1 needed?
    - [ ] Solve bug where users go to e.g. /settings and then go to /login with "please sign in" and "you are logged in" inside the login card.

## Guide
https://gist.github.com/coehne/caf0b3934455d842dfbfe1f4c1544348 