module.exports = {
    "extends": "airbnb",
    "parser": "babel-eslint",
    "rules": {
        "react/prefer-stateless-function": 0,
        "react/jsx-filename-extension": 0,
        "jsx-a11y/anchor-is-valid": [ "error", {
          "components": [ "Link" ],
          "specialLink": [ "to" ]
        }]
    },
    "env": {
      "browser": true,
    }
};
