A simple select element to allow choosing of issues.

    %select(value=@currentIssue)
      %option= "- Default Branch -"
      - each @issues, ->
        %option= @optionText()
