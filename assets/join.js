// The club join page, at ergane.works/join/<handle>. GitHub Pages serves plain files, so
// 404.html runs this for every address it has no file for. It draws a club's card only for
// /join/<handle>, and leaves "Page not found" for everything else.
//
// It asks the server's join-card function for the club's name and photo, and nothing else.
// A private club with its link off, an archived or hidden club and a handle nobody has all
// get the same answer: "This link doesn't lead to a club."
//
// On an iPhone with Ergane, iOS opens the club in the app before this page loads, through
// Universal Links (.well-known/apple-app-site-association). This page is for everyone else.
(function () {
  // The studio beta's TestFlight public link.
  var BETA_LINK = 'https://testflight.apple.com/join/REPLACE';
  // Ergane's Apple ID in App Store Connect, a number. Blank, the page sends people to the
  // TestFlight beta. Filled, it sends them to the App Store instead. Fill it on release day,
  // not before: the App Store page works only once the app is live.
  var APP_STORE_ID = '';
  var match = /^\/join\/@?([A-Za-z0-9_]{3,30})\/?$/.exec(window.location.pathname);
  if (!match) return;
  var handle = match[1].toLowerCase();
  var server = window.ERGANE_SERVER;
  var main = document.querySelector('main');

  document.title = 'Join a club | Ergane';
  var robots = document.createElement('meta');
  robots.name = 'robots';
  robots.content = 'noindex';
  document.head.appendChild(robots);

  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text) node.textContent = text;
    return node;
  }

  function show(children) {
    main.className = 'page join';
    main.replaceChildren.apply(main, children);
  }

  function notFound() {
    show([
      el('h1', null, "This link doesn't lead to a club."),
      el('p', null, 'Check the link or the code with the club that gave it to you.'),
    ]);
  }

  function card(club) {
    var children = [];
    if (club.photo) {
      var photo = el('img', 'join-photo');
      photo.src = server.url + club.photo;
      photo.alt = '';
      children.push(photo);
    } else {
      children.push(el('div', 'join-photo join-photo-empty'));
    }
    children.push(el('h1', null, club.name));
    children.push(el('p', 'join-lead', club.private ? 'Ask to join ' + club.name + ' on Ergane' : 'Join us on Ergane'));

    // The first release is iPhone only, so Android gets a line, not a button.
    var stores = el('p', 'join-buttons');
    if (APP_STORE_ID) {
      var store = el('a', 'join-button join-button-main', 'Get Ergane on the App Store');
      store.href = 'https://apps.apple.com/app/id' + APP_STORE_ID;
      stores.append(store);
      children.push(stores);
      children.push(el('p', 'join-note', 'Install Ergane, then come back to this page and tap Open in Ergane.'));
      children.push(el('p', 'join-note', 'On Android? Ergane comes to Google Play later.'));
    } else {
      var beta = el('a', 'join-button join-button-main', 'Get the beta on TestFlight');
      beta.href = BETA_LINK;
      stores.append(beta);
      children.push(stores);
      children.push(el('p', 'join-note', 'Install TestFlight from the App Store first, then come back to this page.'));
    }

    children.push(el('p', 'join-note', 'Already have Ergane?'));
    var open = el('p', 'join-buttons');
    var openApp = el('a', 'join-button', 'Open in Ergane');
    openApp.href = 'ergane://join/' + handle;
    open.append(openApp);
    children.push(open);
    show(children);
  }

  show([el('p', 'join-note', 'Finding the club…')]);
  if (!server) return notFound();
  fetch(server.url + '/functions/v1/join-card', {
    method: 'POST',
    headers: { apikey: server.key, 'Content-Type': 'application/json' },
    body: JSON.stringify({ handle: handle }),
  })
    .then(function (reply) {
      return reply.ok ? reply.json() : { found: false };
    })
    .then(function (club) {
      if (club && club.found) card(club);
      else notFound();
    })
    .catch(notFound);
})();
