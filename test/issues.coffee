Issues = require "../issues"

describe "issues", ->
  it "should be chill", ->
    assert Issues()

describe "main", ->
  it "should have stuff", ->
    {models:{Issue, Issues}} = require "../main"

    assert Issue
    assert Issues
