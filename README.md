# Html snapshot

This tool is for taking a snapshot of any given page's html.

Usage:
`htmlsnapshot --u <your url> --o output.html --s .selector`

Example:
`htmlsnapshot --u https://medium.com --o medium.html --s .js-metabar`

This will visit the page with a headless chrome browser, read the html, and make a selection. It will then output that selection to your specified output html file. 



