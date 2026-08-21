// Vercel Web Analytics
// This script will be replaced by a bundled version during deployment
// For development, this will track analytics in development mode
(function() {
  window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };
})();

// Load the Vercel Analytics script
(function() {
  var script = document.createElement('script');
  script.defer = true;
  script.src = '/_vercel/insights/script.js';
  document.head.appendChild(script);
})();
