// HomeController.js

class Controller {
  /**
   * function to call
   */
  static home() {
    /**
     * return twig data
     */
    return {
      foo: 'hey'
    }
  }
}

module.exports = {
  Controller
}

`
  "home": {
    "path": "/",
    "controller": "HomeController.home"
    "view": "HomeView"
  }
`;

/*

"controller.method".split(".");

->  [ 'controller', 'method' ]

 */