(function(pkg) {
  // Expose a require for our package so scripts can access our modules
  window.require = Require.generateFor(pkg);
})({
  "source": {
    "README.md": {
      "path": "README.md",
      "mode": "100644",
      "content": "issues\n======\n\nGithub's got issues\n\nGoal\n----\n\nCurrently just provides a dropdown list for choosing an issue from.\n\nMay later expand to forms to create/show/comment on issues for a project.\n",
      "type": "blob"
    },
    "main.coffee.md": {
      "path": "main.coffee.md",
      "mode": "100644",
      "content": "Our main entry point which exports all of our Issue models and templates.\n\n    module.exports =\n      models:\n        Issue: require(\"./source/issue\")\n        Issues: require(\"./source/issues\")\n      templates:\n        issues: require(\"./templates/issues\")\n",
      "type": "blob"
    },
    "pixie.cson": {
      "path": "pixie.cson",
      "mode": "100644",
      "content": "version: \"0.2.0\"\nentryPoint: \"main\"\n",
      "type": "blob"
    },
    "source/issue.coffee.md": {
      "path": "source/issue.coffee.md",
      "mode": "100644",
      "content": "A tempest model that wraps issues from github.\n\n    Issue = (I={}) ->\n      self = Model(I)\n\n      self.extend\n\nThe option text is what appears in the dropdown menu.\n\n        optionText: ->\n          \"#{I.title}\"\n\n        fullDescription: ->\n          \"\"\"\n            #{self.optionText()}\n            #{I.html_url}\n            #{I.body}\n          \"\"\"\n\nA helper method to get a standard branch name for an issue. Pull requests have\ntheir own branches, but an issue branch is generated based on issue number.\n\n        branchName: ->\n          I.head?.ref or \"issue-#{I.number}\"\n\n      return self\n\n    module.exports = Issue\n",
      "type": "blob"
    },
    "source/issues.coffee.md": {
      "path": "source/issues.coffee.md",
      "mode": "100644",
      "content": "    Issue = require \"./issue\"\n\nA collection of issues including a `currentIssue` to represent the actively\nselected issue.\n\nWe may want to formalize this collection pattern later, but for now lets just\nsee how it goes.\n\n    Issues = (I={}) ->\n      Object.defaults I,\n        issues: []\n\n      self = Model(I)\n\nOur `issues` method is a list of `Issue` models.\n\n      self.attrModels \"issues\", Issue\n\nWe want to expose the currently selected issue as an observable as well.\n\n      self.attrObservable \"currentIssue\"\n\n      self.extend\n\nThe reset method accepts an array of raw issue data, converts it into an array\nof issue objects, replaces the previous issues with the new ones and clears the\nselected issue.\n\n        reset: (issueData) ->\n          self.currentIssue(undefined)\n          self.issues issueData.map(Issue)\n\n      return self\n\n    module.exports = Issues\n",
      "type": "blob"
    },
    "templates/issues.haml.md": {
      "path": "templates/issues.haml.md",
      "mode": "100644",
      "content": "A simple select element to allow choosing of issues.\n\n    %select\n      - on \"change\", @currentIssue\n      %option= \"- Default Branch -\"\n      - each @issues, ->\n        %option= @optionText()\n",
      "type": "blob"
    }
  },
  "distribution": {
    "main": {
      "path": "main",
      "content": "(function() {\n  module.exports = {\n    models: {\n      Issue: require(\"./source/issue\"),\n      Issues: require(\"./source/issues\")\n    },\n    templates: {\n      issues: require(\"./templates/issues\")\n    }\n  };\n\n}).call(this);\n\n//# sourceURL=main.coffee",
      "type": "blob"
    },
    "pixie": {
      "path": "pixie",
      "content": "module.exports = {\"version\":\"0.2.0\",\"entryPoint\":\"main\"};",
      "type": "blob"
    },
    "source/issue": {
      "path": "source/issue",
      "content": "(function() {\n  var Issue;\n\n  Issue = function(I) {\n    var self;\n    if (I == null) {\n      I = {};\n    }\n    self = Model(I);\n    self.extend({\n      optionText: function() {\n        return \"\" + I.title;\n      },\n      fullDescription: function() {\n        return \"\" + (self.optionText()) + \"\\n\" + I.html_url + \"\\n\" + I.body;\n      },\n      branchName: function() {\n        var _ref;\n        return ((_ref = I.head) != null ? _ref.ref : void 0) || (\"issue-\" + I.number);\n      }\n    });\n    return self;\n  };\n\n  module.exports = Issue;\n\n}).call(this);\n\n//# sourceURL=source/issue.coffee",
      "type": "blob"
    },
    "source/issues": {
      "path": "source/issues",
      "content": "(function() {\n  var Issue, Issues;\n\n  Issue = require(\"./issue\");\n\n  Issues = function(I) {\n    var self;\n    if (I == null) {\n      I = {};\n    }\n    Object.defaults(I, {\n      issues: []\n    });\n    self = Model(I);\n    self.attrModels(\"issues\", Issue);\n    self.attrObservable(\"currentIssue\");\n    self.extend({\n      reset: function(issueData) {\n        self.currentIssue(void 0);\n        return self.issues(issueData.map(Issue));\n      }\n    });\n    return self;\n  };\n\n  module.exports = Issues;\n\n}).call(this);\n\n//# sourceURL=source/issues.coffee",
      "type": "blob"
    },
    "templates/issues": {
      "path": "templates/issues",
      "content": "module.exports = Function(\"return \" + HAMLjr.compile(\"\\n\\n%select\\n  - on \\\"change\\\", @currentIssue\\n  %option= \\\"- Default Branch -\\\"\\n  - each @issues, ->\\n    %option= @optionText()\\n\", {compiler: CoffeeScript}))()",
      "type": "blob"
    }
  },
  "progenitor": {
    "url": "http://strd6.github.io/editor/"
  },
  "version": "0.2.0",
  "entryPoint": "main",
  "repository": {
    "id": 12632346,
    "name": "issues",
    "full_name": "STRd6/issues",
    "owner": {
      "login": "STRd6",
      "id": 18894,
      "avatar_url": "https://1.gravatar.com/avatar/33117162fff8a9cf50544a604f60c045?d=https%3A%2F%2Fidenticons.github.com%2F39df222bffe39629d904e4883eabc654.png&r=x",
      "gravatar_id": "33117162fff8a9cf50544a604f60c045",
      "url": "https://api.github.com/users/STRd6",
      "html_url": "https://github.com/STRd6",
      "followers_url": "https://api.github.com/users/STRd6/followers",
      "following_url": "https://api.github.com/users/STRd6/following{/other_user}",
      "gists_url": "https://api.github.com/users/STRd6/gists{/gist_id}",
      "starred_url": "https://api.github.com/users/STRd6/starred{/owner}{/repo}",
      "subscriptions_url": "https://api.github.com/users/STRd6/subscriptions",
      "organizations_url": "https://api.github.com/users/STRd6/orgs",
      "repos_url": "https://api.github.com/users/STRd6/repos",
      "events_url": "https://api.github.com/users/STRd6/events{/privacy}",
      "received_events_url": "https://api.github.com/users/STRd6/received_events",
      "type": "User",
      "site_admin": false
    },
    "private": false,
    "html_url": "https://github.com/STRd6/issues",
    "description": "Github's got issues",
    "fork": false,
    "url": "https://api.github.com/repos/STRd6/issues",
    "forks_url": "https://api.github.com/repos/STRd6/issues/forks",
    "keys_url": "https://api.github.com/repos/STRd6/issues/keys{/key_id}",
    "collaborators_url": "https://api.github.com/repos/STRd6/issues/collaborators{/collaborator}",
    "teams_url": "https://api.github.com/repos/STRd6/issues/teams",
    "hooks_url": "https://api.github.com/repos/STRd6/issues/hooks",
    "issue_events_url": "https://api.github.com/repos/STRd6/issues/issues/events{/number}",
    "events_url": "https://api.github.com/repos/STRd6/issues/events",
    "assignees_url": "https://api.github.com/repos/STRd6/issues/assignees{/user}",
    "branches_url": "https://api.github.com/repos/STRd6/issues/branches{/branch}",
    "tags_url": "https://api.github.com/repos/STRd6/issues/tags",
    "blobs_url": "https://api.github.com/repos/STRd6/issues/git/blobs{/sha}",
    "git_tags_url": "https://api.github.com/repos/STRd6/issues/git/tags{/sha}",
    "git_refs_url": "https://api.github.com/repos/STRd6/issues/git/refs{/sha}",
    "trees_url": "https://api.github.com/repos/STRd6/issues/git/trees{/sha}",
    "statuses_url": "https://api.github.com/repos/STRd6/issues/statuses/{sha}",
    "languages_url": "https://api.github.com/repos/STRd6/issues/languages",
    "stargazers_url": "https://api.github.com/repos/STRd6/issues/stargazers",
    "contributors_url": "https://api.github.com/repos/STRd6/issues/contributors",
    "subscribers_url": "https://api.github.com/repos/STRd6/issues/subscribers",
    "subscription_url": "https://api.github.com/repos/STRd6/issues/subscription",
    "commits_url": "https://api.github.com/repos/STRd6/issues/commits{/sha}",
    "git_commits_url": "https://api.github.com/repos/STRd6/issues/git/commits{/sha}",
    "comments_url": "https://api.github.com/repos/STRd6/issues/comments{/number}",
    "issue_comment_url": "https://api.github.com/repos/STRd6/issues/issues/comments/{number}",
    "contents_url": "https://api.github.com/repos/STRd6/issues/contents/{+path}",
    "compare_url": "https://api.github.com/repos/STRd6/issues/compare/{base}...{head}",
    "merges_url": "https://api.github.com/repos/STRd6/issues/merges",
    "archive_url": "https://api.github.com/repos/STRd6/issues/{archive_format}{/ref}",
    "downloads_url": "https://api.github.com/repos/STRd6/issues/downloads",
    "issues_url": "https://api.github.com/repos/STRd6/issues/issues{/number}",
    "pulls_url": "https://api.github.com/repos/STRd6/issues/pulls{/number}",
    "milestones_url": "https://api.github.com/repos/STRd6/issues/milestones{/number}",
    "notifications_url": "https://api.github.com/repos/STRd6/issues/notifications{?since,all,participating}",
    "labels_url": "https://api.github.com/repos/STRd6/issues/labels{/name}",
    "releases_url": "https://api.github.com/repos/STRd6/issues/releases{/id}",
    "created_at": "2013-09-06T00:35:16Z",
    "updated_at": "2013-11-03T19:09:38Z",
    "pushed_at": "2013-11-03T19:09:37Z",
    "git_url": "git://github.com/STRd6/issues.git",
    "ssh_url": "git@github.com:STRd6/issues.git",
    "clone_url": "https://github.com/STRd6/issues.git",
    "svn_url": "https://github.com/STRd6/issues",
    "homepage": null,
    "size": 1896,
    "stargazers_count": 0,
    "watchers_count": 0,
    "language": "JavaScript",
    "has_issues": true,
    "has_downloads": true,
    "has_wiki": true,
    "forks_count": 0,
    "mirror_url": null,
    "open_issues_count": 0,
    "forks": 0,
    "open_issues": 0,
    "watchers": 0,
    "default_branch": "master",
    "master_branch": "master",
    "permissions": {
      "admin": true,
      "push": true,
      "pull": true
    },
    "network_count": 0,
    "subscribers_count": 1,
    "branch": "v0.2.0",
    "defaultBranch": "master"
  },
  "dependencies": {}
});