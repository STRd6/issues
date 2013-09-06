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

squire = GitSquire()
squire.onload()

repo = squire.Repo
  owner: "STRd6"
  repo: "issues"

$root
  .append(HAMLjr.templates.main(
    repo: repo
  ))
