# testLTVco

While implementing the logic, I have seen lot of repetitive code, so I have managed some by distributing into a seperate function and calling the function wherever needed.

1- Created a createQuery fn to make API request for click and keypress event.
2- Created checkRegex fn to validate email/phone inputs
3- Reused same input field for email/phone values and using modifyInput fn to switch b/w email and phone and for checking validations.
4- Created modifyErrorHtml fn to print error messages
5- Fixed all QA bugs:
    a- In the mobile view, the order of the features list is incorrect :> I have rearranged the div into correct order and divided the parent div into 2 child div and used float property to adjust placement
    b- In desktop, mobile, and tablet view, the call-to-action button hover, focus, and active states do not match the spec :> Added css classes for hover/active state (however in mobile /tabled view hover functionality doesn't work by default)
    c- In desktop, mobile, and tablet views, the person icon in the navigation bar is too large in comparison to the spec :> Fixed width and height for the element.
    d- The loading page isn't being shown in desktop, tablet, and mobile views :> Implemented loader when user click Go button
    e- In the mobile view, the position of the error message is incorrect :> Fixed the position of error message in HTML