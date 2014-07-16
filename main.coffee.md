Our main entry point which exports all of our Issue models and templates.

    module.exports =
      models:
        Issue: require("./issue")
        Issues: require("./issues")
