Issue
=====

    Composition = require "composition"

A tempest model that wraps issues from github.

    module.exports = (I={}) ->
      self = Composition(I)

      self.extend

This is what appears in the dropdown menu.

        toString: ->
          I.title

        fullDescription: ->
          """
            #{self.toString()}
            #{I.html_url}
            #{I.body}
          """

A helper method to get a standard branch name for an issue. Pull requests have
their own branches, but an issue branch is generated based on issue number.

        branchName: ->
          I.head?.ref or "issue-#{I.number}"

      return self
