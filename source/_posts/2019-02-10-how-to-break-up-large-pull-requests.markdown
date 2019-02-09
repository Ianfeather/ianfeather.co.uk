---
layout: post
title: "How to break up large Pull Requests"
date: 2019-02-10 10:30
comments: true
categories: blog
---

We’ve all been there. You break off to review a teammate’s code and suddenly are face to face with 1000 lines of changes across 50 files. It’s energy-sapping. You immediately go and make a cup of tea… You both agree to never let this happen again...

Splitting your work into smaller parts and [writing easily reviewable pull requests](https://medium.com/@greenberg/writing-pull-requests-your-coworkers-might-enjoy-reading-9d0307e93da3) allows you to expose your work earlier and help foster a feeling of momentum. Large pull requests stay open for a long time and lead to merge conflicts, tricky rebases and confusion on the part of the reviewer.

Sometimes it’s difficult to see where you can break down your work into smaller parts. Especially as a feature can often span many parts of the stack. To make it easier you should plan where, and how, you can do this when taking on a task. This process can also open up opportunities to spread work between multiple developers and identify features which can be de-prioritised.

Here are some tools and techniques you can use to help:

1. Break up the work at the story level
2. Identify work within dependencies and work bottom up
3. Use git to break up your work prior to making pull requests
4. Use checklists if you have more than one simultaneous PR open
5. Release code behind feature flags

## Break up the work at the story level

Breaking down a task as early as possible makes it easier to divide, conquer, and release that task efficiently. One tool that can help with this is to have early code design discussions.

A design discussion can be a one minute chat with a code-buddy (ideally the person who will review your eventual pull request) where you outline the problem and your proposed solution, it could require input from product and designers, or could even turn into a more formal architecture review. Just like code review, design discussions are both *a safety mechanism and an opportunity for us to learn from each other*.

Breaking down tasks at the user story level takes practice. Thinking of it in terms of the number of components making up the solution can sometimes help to crystallize where the separation should be. This topic has been covered in extensive detail on a number of agile blogs - [Agile For All: Patterns for Splitting User Stories](http://agileforall.com/patterns-for-splitting-user-stories/).

## Identify work within 1st party dependencies and work bottom up

Adding a new feature often requires extending your own dependencies and abstractions to cover use cases that didn’t previously exist. These might include new methods on a utility class or changes to a shared UI component.

Ideally, your dependencies have well defined API contracts. If that’s the case then changes to these files will make for very reviewable pull requests, perhaps just including changes to two files: the source file and the unit test. Pull requests like these are a dream to receive.

## Use Git to break up your work prior to making pull requests

Working bottom up is a nice way to break up big chunks of code but sometimes you just don’t know the extent of the changes. You want to avoid successive pull requests to the same dependency as each one demands some cognitive energy from the reviewer and breaks them off from their own tasks.

When the extent of the task isn’t clear you are often better off keeping your changes in one branch until you have a better picture. It will then be more obvious what the logical units of code are and where you can split it. Git is your friend here. If you care about keeping your commits you can use Git’s interactive rebase to [reorder](http://blog.dennisrobinson.name/reorder-commits-with-git/) them and then [move them to another branch](http://eddmann.com/posts/move-last-git-commit-to-new-or-existing-branch/).

Alternatively, if you aren’t precious about your wip commits, use ‘git reset’ to remove them (whilst keeping your changes) and then split them into logical commits on different branches.

## Use checklists if you have more than one simultaneous PR open

If you end up breaking your work up at the last minute it’s probable that you’ll have more than one PR open simultaneously whilst waiting for your reviewer. This can create confusion for the reviewer so you should be explicit about any order dependency.

A good technique for this is to have a master PR with a checklist of links pointing to the other Pull Requests. The master PR should be explicitly labelled as not for merging until the others have been merged.

## Release code behind feature flags

Waiting until the feature is ready to go-live before merging any code into master leads to long running pull requests regardless of how closely you follow the above points. Using [feature flags](https://launchdarkly.com/featureflags.html) can relieve this pressure and keep code flowing into master.

The concept of feature flags often extends to kill-switches and being able to affect production code without needing to redeploy. If you want to use them simply to break up large chunks of code then this functionality isn’t necessary. For these purposes it can be as simple as an environment variable that is defined in code, or an if (false) with a structured comment.


