@GitSquire = (I={}) ->
  Object.defaults I,
    accessToken: null

  self =
    # Calling auth will redirect to github for authentication
    auth: ->
      scope = "gist,repo,user:email"
      url = "https://github.com/login/oauth/authorize?client_id=bc46af967c926ba4ff87&scope=#{scope}"
  
      window.location = url
  
    # Call onload to check for the code returned from github authentication
    # and to get our access token from our authorization app.
    onload: ->
      # TODO: Namespace local storage key
  
      if code = window.location.href.match(/\?code=(.*)/)?[1]
        $.getJSON "https://hamljr-auth.herokuapp.com/authenticate/#{code}", (data) =>
          if token = data.token
            I.accessToken = token
            localStorage.authToken = token
  
      if localStorage.authToken
        I.accessToken = localStorage.authToken
  
    api: (path, options={}) ->
      if path.match /^http/
        url = path
      else
        url = "https://api.github.com/#{path}"
      
      options.headers ||= {}
      
      if I.accessToken
        options.headers["Authorization"] = "token #{I.accessToken}"
  
      options = Object.extend
        url: url
        type: "GET"
        dataType: 'json'
      , options

      if options.data and typeof options.data != "string"
        options.data = JSON.stringify(options.data)

      $.ajax options
  
    Repo: ({owner, repo, branch}) ->
      branch ?= "master"

      api = (path, options={}) ->
        base = "repos/#{owner}/#{repo}"
        
        if path.match /^http/
          url = path
        else
          url = "https://api.github.com/#{base}/#{path}"

        self.api url, options

      issues: ->
        api "issues"

      createIssue: (params) ->
        api "issues",
          type: "POST"
          data: params
