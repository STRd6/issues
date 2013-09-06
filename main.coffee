# Get stuff from our env
{source, distribution} = ENV

# TODO: Move to env utils
currentNode = ->
  target = document.documentElement

  while (target.childNodes.length and target.lastChild.nodeType == 1)
    target = target.lastChild

  return target.parentNode

# The root is the node that contains the script file.
$root = $(currentNode())

# Apply our styles
if styleContent = distribution["style.css"]?.content
  $root.append $("<style>",
    html: styleContent
  )

squire = GitSquire()
squire.onload()

repo = squire.Repo
  owner: "STRd6"
  repo: "issues"
  
issues = Observable []

$root
  .append(HAMLjr.templates.main(
    load: ->
      repo.issues().then issues

    issues: issues
    title: Observable ""
    body: Observable ""
    createIssue: ->
      repo.createIssue
        title: @title()
        body: @body()

      @body("")
      @title("")
  ))
