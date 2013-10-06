    Issue = require "./issue"

A collection of issues including a `currentIssue` to represent the actively
selected issue.

We may want to formalize this collection pattern later, but for now lets just
see how it goes.

    Issues = (I={}) ->
      Object.defaults I,
        issues: []

      self = Model(I)

Our `issues` method is a list of `Issue` models.

      self.attrModels "issues", Issue

We want to expose the currently selected issue as an observable as well.

      self.attrObservable "currentIssue"

      self.extend

The reset method accepts an array of raw issue data, converts it into an array
of issue objects, replaces the previous issues with the new ones and clears the
selected issue.

        reset: (issueData) ->
          self.currentIssue(undefined)
          self.issues issueData.map(Issue)

      return self

    module.exports = Issues
