(function() {
  module.exports = {
    models: {
      Issue: require("./source/issue"),
      Issues: require("./source/issue")
    },
    templates: {
      issues: require("./templates/issues")
    }
  };

}).call(this);
