// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";

window.matchMedia =
  window.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: jest.fn(),
      removeListener: jest.fn(),
    };
  };
window.IntegrationBridgeInstance = {
  hideOverlay: jest.fn(),
  showOverlay: jest.fn(),
  scrollTop: jest.fn(),
  getLanguage: jest.fn(),
  getApplication: jest.fn(),
  getMedia: jest.fn(),
};
window.requestAnimationFrame =
  window.requestAnimationFrame ||
  function (callback) {
    setTimeout(callback, 0);
  };

window._env_ = {
  REACT_APP_BASE_DIRECTORY: "/web/ocp/simrl/npt",
  REACT_APP_API_BASE_URL: "http://localhost:8080",
  REACT_APP_CDN_BASE_URL: "https://aro-dev.apps.aro03.bdso.tech/",
};
