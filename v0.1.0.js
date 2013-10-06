(function() {
  module.exports = {
    models: {
      Issue: require("./source/issue"),
      Issues: require("./source/issues")
    },
    templates: {
      issues: require("./templates/issues")
    }
  };

}).call(this);

//# sourceURL=main.coffee