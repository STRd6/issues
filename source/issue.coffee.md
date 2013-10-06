A tempest model that wraps issues from github.

    Issue = (I={}) ->
      self = Model(I)

      self.extend

The option text is what appears in the dropdown menu.

        optionText: ->
          "#{I.title}"

        fullDescription: ->
          """
            #{self.optionText()}
            #{I.html_url}
            #{I.body}
          """

A helper method to get a standard branch name for an issue. Pull requests have
their own branches, but an issue branch is generated based on issue number.

        branchName: ->
          I.head?.ref or "issue-#{I.number}"

      return self

    module.exports = Issue
