# Contributing to Peerdom backend

## Prerequisites

To be accepted your contribution must be provided under the [BSD 3-clause
licence](https://en.wikipedia.org/wiki/BSD_licenses#3-clause_license_(%22BSD_License_2.0%22,_%22Revised_BSD_License%22,_%22New_BSD_License%22,_or_%22Modified_BSD_License%22)).
To validate this prerequisites you must sign-off your commits using the `-s`
option when commiting:

```
$ git commit -s -m "docs: my commit message"
```

If desired, you can also automate the sign-off via the provided commit message
hook in the [scripts folder](scripts/git-hook-commit-msg). See the
documentation in this script to set-it up.

## Commit message guidelines

Having consistent commit messages helps other developers easily identifying what changes you made and scripts to process the commit history for other use cases.

[Conventional commits](https://conventionalcommits.org) have a good concept for this and it's foundation is used for many tools and frameworks, like [Angular](https://github.com/angular/angular/blob/master/CONTRIBUTING.md#-commit-message-guidelines) and AngularJS.

### Types

We recommend and process following types of conventional commits:

- **chore**: Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)
- **ci**: Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs)
- **docs**: Documentation only changes
- **feat**: A new feature or an extension to an existing feature
- **fix**: A bug fix or other minor fix visible to the user
- **a11y**: All accessibility specific improvements
- **perf**: A code change that improves performance
- **refactor**: A code change without meaning to the user (re-organising code, abstracting functionality in methods, changes in architecture of modules, ...)- **style**: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
- **test**: Adding missing tests or correcting existing tests

### Scope and subject

The scope can be different from project to project. We recommend using a more technical definition of the scope and the commit title e.g. `fix(comments): apply correct z-index`, and additionally add the ticket reference to the bug report in your merge request. This way, a tool that creates an automatic changelog, could only show the ticket scope and subject and then reference to the ticket with the in-detail description of the problem and the fix.

But most important: Define how you apply scopes in the specific project before you begin. 

### Subject
The subject contains a succinct description of the change:
* use the imperative, present tense: "change" not "changed" nor "changes"
* don't capitalize the first letter
* no dot (.) at the end
* describe the **what**

### Body
Just as in the subject, use the imperative, present tense: "change" not "changed" nor "changes". The body should include the motivation for the change and contrast this with previous behavior (**why**).

### Footer
The footer should contain any information about Breaking Changes.
Breaking Changes should start with the word BREAKING CHANGE: with a space or two newlines. The rest of the commit message is then used for this.

### Ticket reference

You may want to omit those in your commits and add all ticket references in your merge commit footer, because having a ticket reference in every commit spams the referenced ticket. 

You can also **squash** your commit to merge all your commits into one. Keep in mind that Gitlab sometimes takes wrong informations from the initial commit.
