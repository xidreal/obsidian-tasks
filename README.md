<h1 align="center">Obsidian Tasks</h1>

<p align="center">Task management for the <a href="https://obsidian.md/">Obsidian</a> knowledge base.</p>

<p align="center">
  ⚠️ Requires Obsidian 0.12.0 or higher ⚠️
</p>

<p align="center">
  <a href="#installation">Installation</a> •
  <a href="#usage">Usage</a> •
  <a href="#filtering-checklist-items">Filtering</a> •
  <a href="#due-dates">Due Dates</a> •
  <a href="#recurring-tasks-repetition">Recurrence</a> •
  <a href="#querying-and-listing-tasks">Querying</a>
</p>

<hr />

Track tasks across your entire vault. Query them and mark them as done wherever you want. Supports due dates, recurring tasks (repetition), done dates, sub-set of checklist items, and filtering.

*You can toggle the task status in any view or query and it will update the source file.*

## Screenshots

- *All screenshots assume the [global filter](#filtering-checklist-items) `#task` which is not set by default (see also [installation](#installation)).*
- *The theme is [Obsidian Atom](https://github.com/kognise/obsidian-atom).*

![ACME Tasks](./resources/screenshots/acme.png)
The `ACME` note has some tasks.

![Important Project Tasks](./resources/screenshots/important_project.png)
The `Important Project` note also has some tasks.

![Tasks Queries](./resources/screenshots/tasks_queries.png)
The `Tasks` note gathers all tasks from the vault and displays them using queries.

![Create or Edit Modal](./resources/screenshots/modal.png)
The `Tasks: Create or edit` command helps you when editing a task.

## Installation

Tasks is not yet available in the repository of Obsidian community plugins.
You have to download, install, and activate the plugin manually.
Follow the steps below to install Tasks.

1. Go to the latest [release](https://github.com/schemar/obsidian-tasks/releases).
2. Download:
    - `main.js`
    - `styles.css`
    - `manifest.json`
3. Copy the files into your vault under `<VaultFolder>/.obsidian/plugins/obsidian-tasks/`.
4. Enable the plugin in your Obsidian settings (find "Tasks" under "Community plugins").
5. Check the settings. It makes sense to set the global filter early on (if you want one).
6. Replace the "Toggle checklist status" hotkey with "Tasks: Toggle Done".
    - I recommend you remove the original toggle hotkey and set the "Tasks" toggle to `Ctrl + Enter` (or `Cmd + Enter` on a mac).

## Usage

Tasks tracks your checklist items from your vault.
The simplest way to create a new task is to create a new checklist item.
The markdown syntax for checklist items is a list item that starts with spaced brackets: `- [ ] take out the trash`.
Now Tasks tracks that you need to take out the trash!

**⚠️ Tasks only supports single-line checklist items.**
You cannot have checklist items that span across multiple lines.

A more convenient way to create a task is by using the `Tasks: Create or edit` command from the command palette.
You can also bind a hotkey to the command.
The command will parse what's on the current line in your editor and pre-populate a modal.
In the modal, you can change the task's description, its due date, and a recurrence rule to have a repeating task.
See below for more details on due dates and recurrence.
You cannot toggle a task (un)done in the modal.
For that, do one of the following.

There are two ways to mark a task done:

1. In preview mode, click the checkbox at the beginning of the task to toggle the status between "todo" and "done".
2. In edit mode, use the command `Tasks: Toggle Done`.
    - The command will only be available if the cursor is on a line with a checklist item.
    - You can map he command to a hotkey in order to quickly toggle statuses in the editor view (I recommend to replace the original "Toggle checklist status" with it).
    - If the checklist item is not a task (e.g. due to a global filter), the command will toggle it like a regular checklist item.

A "done" task will have the date it was done appended to the end of its line.
For example: `✅ 2021-04-09` means the task was done on the 9th of April, 2021.

### Filtering checklist items

ℹ You can set a global filter in the settings so that Tasks only matches specific checklist items.
For example, you could set it to `#tasks` to only track checklist items as task if they include the string `#tasks`.
It doesn't have to be a tag. It can be any string.
Leave it empty to reagard all checklist items as tasks.

Example with global filter `#tasks`:

```
- [ ] #tasks take out the trash
```

If you don't have a global filter set, all regular checklist items work:

```
- [ ] take out the trash
```

### Due dates

Tasks can have due dates.
In order to specify the due date of a task, you must append the "due date signifier 📅" followed by the date it is due to the end of the task.
The date must be in the format `YYYY-MM-DD`, meaning `Year-Month-Day` with leading zeros.
For example: `📅 2021-04-09` means the task is due on the 9th of April, 2021.

```
- [ ] take out the trash 📅 2021-04-09
```

Instead of adding the emoji and the date manually, you can use the `Tasks: Crete or edit` command when creating or editing a task.
When you use the command, you can also set a due date like "Monday", "tomorrow", or "next week" and Tasks will automatically save the date in the correct format.

**You can not put anything behind the due/done dates. Also not a global filter. Everything after the dates will be removed by Tasks.**

### Recurring tasks (repetition)

Tasks can be recurring.
In order to specify a recurrence rule of a task, you must append the "recurrence signifier 🔁" followed by the recurrence rule.
For example: `🔁 every weekday` means the task will repeat every week on Monday through Friday.
Every recurrence rule has to start with the word `every`.

When you toggle the status of a recurring task to anything but "todo" (i.e. "done"), the orginal task that you wanted to toggle will be marked as done and get the done date appended to it, like any other task.
In addition, *a new task will be put one line above the original task.*
The new task will have the due date of the next occurrence after the due date of the original task.

Take as an example the following task:

```
- [ ] take out the trash 🔁 every Sunday 📅 2021-04-25
```

If you mark the above task "done" on Saturday, the 24th of April, the file will now look like this:

```
-   [ ] take out the trash 🔁 every Sunday 📅 2021-05-02
-   [x] take out the trash 🔁 every Sunday 📅 2021-04-25 ✅ 2021-04-24
```

*For best compatibility, a recurring task should have a due date and the recurrence rule should appear before the due date of a task.*

In the editor there is no direct feedback to whether your recurrence rule is valid.
You can validate that tasks understands your rule by using the `Tasks: Crete or edit` command when creating or editing a task.

Examples of possible recurrence rules (mix and match as desired; these should be considered inspirational):

-   `🔁 every weekday` (meaning every Mon - Fri)
-   `🔁 every week on Sunday`
-   `🔁 every 2 weeks`
-   `🔁 every 3 weeks on Friday`
-   `🔁 every 2 months`
-   `🔁 every month on the 1st`
-   `🔁 every 6 months on the 1st Wednesday`
-   `🔁 every January on the 15th`
-   `🔁 every year`

### Querying and listing tasks

You can list tasks from your entire vault by querying them using a `tasks` code block.
Tasks are sorted by due date and then path.

**⚠️ The result list will list tasks unindented.**
See [#51](https://github.com/schemar/obsidian-tasks/issues/51) for a discussion around the topic.
Do not hesitate to contribute 😊

The simplest way to query tasks is this:

    ```tasks
    ```

In preview mode, this will list *all* tasks from your vault, regardless of their properties like status.
This is probably not what you want. Therefore, Tasks allows you to filter the tasks that you want to show.

The following filters exist:

- `done`
- `not done`
- `done (before|after|on) <date>`
- `no due date`
- `due (before|after|on) <date>`
- `path (includes|does not include) <path>`
- `description (includes|does not include) <string>`
- `exclude sub-items`
    - When this is set, the result list will only include tasks that are not indented in their file. It will only show tasks that are top level list items in their list.
- `limit to <number> tasks`
    - Only lists the first `<number>` tasks of the result.
    - Shorthand is `limit <number>`.

#### Dates
`<date>` filters can be given in natural language or in formal notation.
The following are some examples of valid `<date>` filters as inspiration:
- `2021-05-05`
- `today`
- `tomorrow`
- `next monday`
- `last friday`
- `in two weeks`

Note that if it is Wednesday and you write `tuesday`, Tasks assumes you mean "yesterday", as that is the closest Tuesday.
Use `next tuesday` instead if you mean "next tuesday".

#### Matching
All filters of a query have to match in order for a task to be listed.
This means you cannot show tasks that have "GitHub in the path and have no due date or are due after 2021-04-04".
Instead you would have two queries, one for each condition:

    ### Not due

    ```tasks
    no due date
    path includes GitHub
    ```

    ### Due after 2021-04-04

    ```tasks
    due after 2021-04-04
    path includes GitHub
    ```

#### Examples

All open tasks that are due today:

    ```tasks
    not done
    due today
    ```

All open tasks that are due within the next two weeks, but are not overdue (due today or later):

    ```tasks
    not done
    due after yesterday
    due before in two weeks
    ```

Show all tasks that aren't done, are due on the 9th of April 2021, and where the path includes `GitHub`:

    ```tasks
    not done
    due on 2021-04-09
    path includes GitHub
    ````

Show all open tasks that are due within two weeks:

    ```tasks
    not done
    due after 2021-04-30
    due before 2021-05-15
    ```

Show all tasks that were done before the 1st of December 2020:

    ```tasks
    done before 2020-12-01
    ```

Show one task that is due on the 5th of May and includes `#prio1` in its description:

    ```tasks
    not done
    due on 2021-05-05
    description includes #prio1
    limit to 1 tasks
    ````

### Tips

#### Daily Agenda

If you use the [calendar](https://github.com/liamcain/obsidian-calendar-plugin) plugin,
you can use the following in your daily note *template* for an agenda:

    ## Tasks
    ### Overdue
    ```tasks
    not done
    due before {{date:YYYY-MM-DD}}
    ```

    ### Due today
    ```tasks
    not done
    due on {{date:YYYY-MM-DD}}
    ```

    ### Due in the next two weeks
    ```tasks
    not done
    due after {{date:YYYY-MM-DD}}
    due before {{date+14d:YYYY-MM-DD}}
    ```

    ### No due date
    ```tasks
    not done
    no due date
    ```

    ### Done today
    ```tasks
    done on {{date:YYYY-MM-DD}}
    ```

#### Natural Language Due Date
(Thanks to @zolrath)

If you use the [templater](https://github.com/SilentVoid13/Templater) and [nldates](https://github.com/argenos/nldates-obsidian) plugins,
you can use the following for a pop-up to add a task's due date to the end of the line:

```js
<%*
let dueDateStr = await tp.system.prompt("Task Due Date:");
let parseResult;
let parseResultMarker;
if (dueDateStr) {
    let nlDatesPlugin = this.app.plugins.getPlugin('nldates-obsidian');
    parseResult = nlDatesPlugin.parseDate(dueDateStr);
    if (parseResult.date) {
        parseResultMarker = '📅 ' + parseResult.formattedString;
    }
}

if (parseResultMarker) {
    let cmEditorAct = this.app.workspace.activeLeaf.view.sourceMode.cmEditor;
    let curLine = cmEditorAct.getCursor().line;
    cmEditorAct.setSelection({ line: curLine, ch: 0 }, { line: curLine, ch: 9999 });
    tR = tp.file.selection() + ' ' + parseResultMarker;
}
%>
```

## Development

Clone the repository, run `yarn` to install the dependencies, and run `yarn dev` to compile the plugin and watch file changes.
