// require.js looks for the following global when initializing
var require = {
    baseUrl: ".",
    paths: {
        "bootstrap":            "app/bootstrap.min",
        "crossroads":           "app/crossroads.min",
        "hasher":               "app/hasher.min",
        "jquery":               "app/jquery.min",
        "knockout":             "app/knockout",
        "knockout-projections": "app/knockout-projections.min",
        "signals":              "app/signals.min",
        "text":                 "app/text"
    },
    shim: {
        "bootstrap": { deps: ["jquery"] }
          }
};
