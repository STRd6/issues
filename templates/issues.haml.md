A simple select element to allow choosing of issues.

    %select
      - on "change", @currentIssue
      %option= "- Default Branch -"
      - each @issues, ->
        %option= @optionText()
