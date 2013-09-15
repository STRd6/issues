Our main entry point which exports all of our Issue models and templates.

    module.exports =
      models:
        Issue: require("./source/issue")
        Issues: require("./source/issues")
      templates:
        issues: require("./templates/issues")
